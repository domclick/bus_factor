import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../bus_factor.interface';
import { SkillsService } from '../shared/services/skills.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {
  @Input() skill: Skill;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSkill();
  }

  getSkill(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.skillService.getSkill(id)
      .subscribe(skill => this.skill = skill);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.skillService.updateSkill(this.skill)
      .subscribe(() => this.goBack());
  }

}
