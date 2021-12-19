import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../shared/interfaces';
import { EmployeesService } from '../shared/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss']
})
export class EmployeeItemComponent implements OnInit {
  @Input() employee: Employee;
  @Input() skillCount: number;
  @Output() deleteButtonClick = new EventEmitter<Employee>();

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  deleteEmployee(employee: Employee): void {
    this.employeesService.deleteEmployee(employee).subscribe();
    this.deleteButtonClick.emit(employee);
  }

  onEmployeeClick(): void {
    this.router.navigate(['employees', this.employee.id],
      {relativeTo: this.activatedRoute.parent});
  }

}
