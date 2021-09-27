import { Component, OnInit, Input } from '@angular/core';
import { Employee, EmployeeSkill, Skill } from '../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../shared/services/employee.service';
import { SkillsService } from '../shared/services/skills.service';
import { EmployeeSkillsService } from '../shared/services/employee-skills.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  skills: Skill[];
  employeeSkills: EmployeeSkill[];
  employeeHasSkills: Employee[] = [];
  employeeHasNoSkills: Employee[] = [];
  employeeHasSkillIds = [];

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private skillService: SkillsService,
    private employeeSkillsService: EmployeeSkillsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.employeesService.getEmployee((this.route.snapshot.paramMap.get('id'))),
      this.skillService.getSkills(),
      this.employeeSkillsService.getEmployeeSkills()])
    .subscribe(([employee, skills, employeeSkills]) => {
      this.employee = employee;
      this.skills = skills;
      this.employeeSkills = employeeSkills;
      this.calculateEmployeesWithSkills();
    });
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeesService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.employeesService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }


  changeEmployeeSkill(skillId): void {
    for (const es of this.employeeSkills) {
      if (es.skillId === skillId && es.employeeId === this.employee.id) {
        this.employeeSkillsService.deleteEmployeeSkill(es.id).subscribe( () => {
            this.employeeSkills = this.employeeSkills.filter(eSkills => eSkills.skillId !== skillId);
            this.employeeHasSkillIds = this.employeeHasSkillIds.filter(s => s !== skillId);
          }
        );
        return;
      }
    }
    this.employeeSkillsService.addEmployeeSkill({
      employeeId: this.employee.id,
      skillId
    }).subscribe(newEmployeeSkill => {
      this.employeeSkills.push(newEmployeeSkill);
      this.employeeHasSkillIds.push(newEmployeeSkill.skillId);
    });
  }

  calculateEmployeesWithSkills(): void {
    if (this.employeeSkills) {
      for (const es of this.employeeSkills) {
        if (es.employeeId === this.employee.id) {
          this.employeeHasSkillIds.push(es.skillId);
        }
      }
    }

    for (const s of this.skills) {
      if (this.employeeHasSkillIds.includes(s.id)) {
        this.employeeHasSkills.push(s);
      } else {
        this.employeeHasNoSkills.push(s);
      }
    }
  }

}
