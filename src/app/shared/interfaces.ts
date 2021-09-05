export interface Skill {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
}

export interface FbCreateResponse {
  name: string;
}

export interface EmployeeSkill {
  id?: string;
  skillId: string;
  employeeId: string;
}

