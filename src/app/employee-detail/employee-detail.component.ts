import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../bus_factor.interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../shared/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
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

}
