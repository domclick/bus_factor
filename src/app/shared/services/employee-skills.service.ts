import { Injectable } from '@angular/core';
import { FbCreateResponse, EmployeeSkill, Employee } from '../interfaces';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSkillsService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private entityName = 'employee_skills';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Log a EmployeesService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET employees from the server */
  getEmployeeSkills(): Observable<EmployeeSkill[]> {
    return this.http.get<EmployeeSkill[]>(`${environment.fbDbUrl}/${this.entityName}.json`)
      .pipe(
        // tap((newEmployeeSkill: EmployeeSkill) => this.log(`getEmployeeSkills w/ id=${newEmployeeSkill.id}`)),
        map((response: {[key: string]: any}) => {
          const x =  Object.
          keys(response)
            .map(key => ({
              ...response[key],
              id: key,
            }));
          return x;
        }),
        catchError(this.handleError<EmployeeSkill[]>('getEmployeeSkills error', []))
      );
  }


  addEmployeeSkill(employeeSkill: EmployeeSkill): Observable<EmployeeSkill> {
    return this.http.post<EmployeeSkill>(`${environment.fbDbUrl}/${this.entityName}.json`, employeeSkill, this.httpOptions).pipe(
      tap((newEmployeeSkill: EmployeeSkill) => this.log(`addEmployeeSkill w/ id=${newEmployeeSkill.id}`)),
      map((response: any) => {
        return {
          // ...employeeSkill,
          id: response.name,
          skillId: employeeSkill.skillId,
          employeeId: employeeSkill.employeeId,
        };
      }),
      catchError(this.handleError<EmployeeSkill>('addEmployeeSkill'))
    );
  }

  /** DELETE: delete the employee from the server */
  deleteEmployeeSkill(employeeSkill: EmployeeSkill | string): Observable<EmployeeSkill> {
    const id = typeof employeeSkill === 'string' ? employeeSkill : employeeSkill.id;
    const url = `${environment.fbDbUrl}/${this.entityName}/${id}.json`;
    return this.http.delete<EmployeeSkill>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employeeSkill id=${id}`)),
      catchError(this.handleError<EmployeeSkill>('deleteEmployeeSkill'))
    );
  }
}
