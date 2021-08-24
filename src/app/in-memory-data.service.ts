import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee, Skill } from './shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const skills = [
      { id: 11, name: 'service_hub' },
      { id: 12, name: 'moik' },
      { id: 13, name: 'ekp' },
      { id: 14, name: 'doc_editor' },
      { id: 15, name: 'pingator' },
      { id: 16, name: 'cas' },
      { id: 17, name: 'quest_backend' },
      { id: 18, name: 'pypo' },
      { id: 19, name: 'crm_chief' },
      { id: 20, name: 'credo' }
    ];

    const employees = [
      { id: 101, name: 'Nick' },
      { id: 102, name: 'Artem' },
      { id: 103, name: 'Oleg' },
      { id: 104, name: 'Ivan' },
      { id: 105, name: 'Max' },
      { id: 106, name: 'Roman' },
      { id: 107, name: 'Ivan' },
      { id: 108, name: 'Denis' },
      { id: 109, name: 'Pavel' },
      { id: 110, name: 'Nikita' }
    ];

    const skillsEmployees = [
      { id: 1000, skill_id: 11, employee_id: 11 },
      { id: 1001, skill_id: 12, employee_id: 11 },
      { id: 1002, skill_id: 113, employee_id: 12 },
      { id: 1003, skill_id: 114, employee_id: 13 },
    ];
    return {skills, employees, skillsEmployees};
  }

  // Overrides the genId method to ensure that a skill always has an id.
  // If the skills array is empty,
  // the method below returns the initial number (11).
  // if the skills array is not empty, the method below returns the highest
  // skill id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(skill => skill.id)) + 1 : 11;
  }
}
