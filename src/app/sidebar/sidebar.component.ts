import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-crm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
