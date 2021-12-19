import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeSkill, Skill } from '../shared/interfaces';
import { SkillsService } from '../shared/services/skills.service';
import { forkJoin } from 'rxjs';
import { EmployeeSkillsService } from '../shared/services/employee-skills.service';
import { EmployeesService } from '../shared/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  employeeSkills: EmployeeSkill[];
  employeesHasSkills = {};
  employeesDictionary = {};

  bestEmployees = [];

  employeesHasSkill: Employee[] = [];
  employeesHasNoSkill: Employee[] = [];
  employeeIdsHasSkill = [];

  constructor(
    private skillsService: SkillsService,
    private employeesService: EmployeesService,
    private employeeSkillsService: EmployeeSkillsService,
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.employeesService.getEmployees(),
      this.employeeSkillsService.getEmployeeSkills()])
      .subscribe(([employees, employeeSkills]) => {
        this.employeeSkills = employeeSkills;
        this.employees = employees;
        if (this.employeeSkills) {
          for (const es of this.employeeSkills) {
            if (this.employeesHasSkills.hasOwnProperty(es.employeeId)) {
              this.employeesHasSkills[es.employeeId] += 1;
            } else {
              this.employeesHasSkills[es.employeeId] = 1;
            }
          }
          this.bestEmployees = Object.entries(this.employeesHasSkills).sort((a, b) => {
            const aCount = a[1];
            const bCount = b[1];
            if (aCount < bCount) {
              return 1;
            } else if (aCount > bCount) {
              return -1;
            } else {
              return 0;
            }
          });
          for (const e of employees) {
            this.employeesDictionary[e.id] = e;
          }
          this.bestEmployees = this.bestEmployees.slice(0, 4);
        }
      });
  }
}
