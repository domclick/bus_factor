import { Component, OnInit, Input } from '@angular/core';
import { Employee, EmployeeSkill, Skill } from '../shared/interfaces';
import { SkillsService } from '../shared/services/skills.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../shared/services/employee.service';
import { EmployeeSkillsService } from '../shared/services/employee-skills.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {
  @Input() skill: Skill;
  employees: Employee[];
  employeeSkills: EmployeeSkill[];
  employeesHasSkill: Employee[] = [];
  employeesHasNoSkill: Employee[] = [];
  employeeIdsHasSkill = [];

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillsService,
    private employeesService: EmployeesService,
    private employeeSkillsService: EmployeeSkillsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.skillService.getSkill(this.route.snapshot.paramMap.get('id')),
      this.employeesService.getEmployees(),
      this.employeeSkillsService.getEmployeeSkills()])
      .subscribe(([skill, empoyees, employeeSkills]) => {
        this.skill = skill;
        this.employees = empoyees;
        this.employeeSkills = employeeSkills;
        this.calculateEmployeesWithSkills();
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.skillService.updateSkill(this.skill)
      .subscribe(() => this.goBack());
  }

  changeEmployeeSkill(employeeId): void {
    for (const es of this.employeeSkills) {
      if (es.employeeId === employeeId && es.skillId === this.skill.id) {
        this.employeeSkillsService.deleteEmployeeSkill(es.id).subscribe( () => {
            this.employeeSkills = this.employeeSkills.filter(eSkills => eSkills.employeeId !== employeeId);
            this.employeeIdsHasSkill = this.employeeIdsHasSkill.filter(e => e !== employeeId);
          }
        );
        return;
      }
    }
    this.employeeSkillsService.addEmployeeSkill({
      skillId: this.skill.id,
      employeeId
    }).subscribe(newEmployeeSkill => {
      this.employeeSkills.push(newEmployeeSkill);
      this.employeeIdsHasSkill.push(newEmployeeSkill.employeeId);
    });
  }

  calculateEmployeesWithSkills(): void {
    if (this.employeeSkills) {
      for (const es of this.employeeSkills) {
        if (es.skillId === this.skill.id) {
          this.employeeIdsHasSkill.push(es.employeeId);
        }
      }
    }

    for (const e of this.employees) {
      if (this.employeeIdsHasSkill.includes(e.id)) {
        this.employeesHasSkill.push(e);
      } else {
        this.employeesHasNoSkill.push(e);
      }
    }
  }

}
