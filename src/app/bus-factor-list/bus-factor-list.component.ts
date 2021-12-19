import { SkillsService } from '../shared/services/skills.service';
import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeSkill, Skill } from '../shared/interfaces';
import { EmployeesService } from '../shared/services/employee.service';
import { EmployeeSkillsService } from '../shared/services/employee-skills.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bus-factor-list',
  templateUrl: './bus-factor-list.component.html',
  styleUrls: ['./bus-factor-list.component.scss']
})
export class BusFactorListComponent implements OnInit {
  skills: Skill[];
  employees: Employee[];
  employeeSkills: EmployeeSkill[];
  employeesHasSkills = {};
  skillTeachedByEmployee = {};

  constructor(
    private skillsService: SkillsService,
    private employeesService: EmployeesService,
    private employeeSkillsService: EmployeeSkillsService,
  ) { }

  ngOnInit() {
    forkJoin([
      this.skillsService.getSkills(),
      this.employeesService.getEmployees(),
      this.employeeSkillsService.getEmployeeSkills()])
      .subscribe(([skills, empoyees, employeeSkills]) => {
        this.skills = skills;
        this.employees = empoyees;
        this.employeeSkills = employeeSkills;
        this.calculateSkillsData();
      });
  }

  calculateSkillsData(): void {
    this.employeesHasSkills = {};
    this.skillTeachedByEmployee = {};

    if (this.employeeSkills) {
      for (const es of this.employeeSkills) {
        if (this.employeesHasSkills.hasOwnProperty(es.employeeId)) {
          this.employeesHasSkills[es.employeeId] += 1;
        } else {
          this.employeesHasSkills[es.employeeId] = 1;
        }

        if (this.skillTeachedByEmployee.hasOwnProperty(es.skillId)) {
          this.skillTeachedByEmployee[es.skillId] += 1;
        } else {
          this.skillTeachedByEmployee[es.skillId] = 1;
        }
      }
    }
  }

  getSkills(): void {
    this.skillsService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  addSkill(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.skillsService.addSkill({ name } as Skill)
      .subscribe(skill => {
        this.skills.push(skill);
      });
  }

  deleteSkill(skill: Skill): void {
    const skillId = typeof skill === 'string' ? skill : skill.id;

    this.skills = this.skills.filter(h => h !== skill);
    this.skillsService.deleteSkill(skill).subscribe();

    for (const es of this.employeeSkills) {
      if (es.skillId === skillId) {
        this.employeeSkillsService.deleteEmployeeSkill(es.id).subscribe();
      }
    }
    this.skills = this.skills.filter(s => s !== skill);
    this.skillsService.deleteSkill(skill).subscribe();
    this.employeeSkills = this.employeeSkills.filter(es => es.skillId !== skillId);
    this.calculateSkillsData();
  }

  getEmployees(): void {
    this.employeesService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getEmployeeSkills(): void {
    this.employeeSkillsService.getEmployeeSkills()
      .subscribe(employeeSkills => this.employeeSkills = employeeSkills);
  }

  addEmployee(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.employeesService.addEmployee({ name } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  handleDeleteEmployee(employee: Employee): void {
    const employeeId = typeof employee === 'string' ? employee : employee.id;
    for (const es of this.employeeSkills) {
      if (es.employeeId === employeeId) {
        this.employeeSkillsService.deleteEmployeeSkill(es.id).subscribe();
      }
    }
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeSkills = this.employeeSkills.filter(es => es.employeeId !== employeeId);
    this.calculateSkillsData();
  }

  handleDeleteSkill(skill: Skill): void {
    const skillId = typeof skill === 'string' ? skill : skill.id;
    for (const es of this.employeeSkills) {
      if (es.skillId === skillId) {
        this.employeeSkillsService.deleteEmployeeSkill(es.id).subscribe();
      }
    }
    this.skills = this.skills.filter(h => h !== skill);
    this.employeeSkills = this.employeeSkills.filter(es => es.skillId !== skillId);
    this.calculateSkillsData();
  }
}
