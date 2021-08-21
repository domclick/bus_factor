import { Component, OnInit } from '@angular/core';
import { Skill } from '../bus_factor.interface';
import { SkillsService } from '../shared/services/skills.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.skillsService.getSkills()
      .subscribe(skills => this.skills = skills.slice(1, 5));
  }
}
