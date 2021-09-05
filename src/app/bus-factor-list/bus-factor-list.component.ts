import { SkillsService } from '../shared/services/skills.service';
import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeSkill, Skill } from '../shared/interfaces';
import { EmployeesService } from '../shared/services/employee.service';
import { EmployeeSkillsService } from '../shared/services/employee-skills.service';

@Component({
  selector: 'app-bus-factor-list',
  templateUrl: './bus-factor-list.component.html',
  styleUrls: ['./bus-factor-list.component.scss']
})
export class BusFactorListComponent implements OnInit {
  skills: Skill[];
  employees: Employee[];
  employeeSkills: EmployeeSkill[];

  constructor(
    private skillsService: SkillsService,
    private employeesService: EmployeesService,
    private employeeSkillsService: EmployeeSkillsService,
  ) { }

  ngOnInit() {
    this.getSkills();
    this.getEmployees();
    this.getEmployeeSkills();
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
    this.skills = this.skills.filter(h => h !== skill);
    this.skillsService.deleteSkill(skill).subscribe();
  }

  getEmployees(): void {
    this.employeesService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getEmployeeSkills(): void {
    this.employeeSkillsService.getEmployeeSkills()
      .subscribe(employeeSkills => this.employeeSkills = employeeSkills);
    console.log('getEmployeeSkills func', this.employeeSkills);
  }

  addEmployee(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.employeesService.addEmployee({ name } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  deleteEmployee(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeesService.deleteEmployee(employee).subscribe();
  }
}