import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '../shared/interfaces';
import { SkillsService } from '../shared/services/skills.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent implements OnInit {
  @Input() skill: Skill;
  @Input() skillCount: number;
  @Output() deleteButtonClick = new EventEmitter<Skill>();

  constructor(
    private skillsService: SkillsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  deleteSkill(skill: Skill): void {
    this.skillsService.deleteSkill(skill).subscribe();
    this.deleteButtonClick.emit(skill);
  }

  onSkillClick(): void {
    this.router.navigate(['skills', this.skill.id],
      {relativeTo: this.activatedRoute.parent});
  }

}
