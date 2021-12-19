import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-navigation-item',
  templateUrl: 'navigation-item.component.html',
  styleUrls: ['navigation-item.component.scss'],
})

export class NavigationItemComponent implements OnInit {
  @Input() item!: any;

  constructor() { }

  ngOnInit(): void { }
}
