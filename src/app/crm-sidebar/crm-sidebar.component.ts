import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-crm-sidebar',
  templateUrl: './crm-sidebar.component.html',
  styleUrls: ['./crm-sidebar.component.scss']
})
export class CrmSidebarComponent implements OnInit {

  readonly navigations = [
    {
      name: 'dashboard',
      path: ['dashboard'],
    },
    {
      name: 'bus_factors',
      path: ['bus_factors'],
    },
    // {
    //   name: 'profile',
    //   path: ['profile'],
    // },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
