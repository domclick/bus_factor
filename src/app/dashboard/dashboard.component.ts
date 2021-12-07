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

  bestEmploees = [];

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
        this.employees = employees.slice(1, 5);
        return
        this.employeeSkills = employeeSkills;
        this.employees = employees;
        console.log('employeeSkills', employeeSkills);
        if (this.employeeSkills) {
          for (const es of this.employeeSkills) {
            console.log('es', es);
            if (this.employeesHasSkills.hasOwnProperty(es.employeeId)) {
              this.employeesHasSkills[es.employeeId] += 1;
            } else {
              this.employeesHasSkills[es.employeeId] = 1;
            }
          }
          const employeeHasSkillsList = [];
          for (const [k, v] of Object.entries(this.employeesHasSkills)) {
            console.log('k', k, 'v', v);
            employeeHasSkillsList.push({k: v});
          }

          console.log('employeesHasSkills', employeeHasSkillsList, 'Object.entries(this.employeesHasSkills)',
            Object.entries(employeeHasSkillsList));
          this.bestEmploees = Object.entries(employeeHasSkillsList).sort((a, b) => {
            console.log('a', a, 'b', b);
            if (a > b) {
              return 1;
            } else if (a < b) {
              return -1;
            } else {
              return 0;
            }
          });

          console.log('bestEmploees', this.bestEmploees);
          for (const e of employees) {
            this.employeesDictionary[e.id] = e;
          }
        }
      });
  }
}
