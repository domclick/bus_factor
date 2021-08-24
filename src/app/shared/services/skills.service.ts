import { Injectable } from '@angular/core';
import { FbCreateResponse, Skill } from '../interfaces';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // private skillsUrl = `${environment.fbDbUrl}/skills.json`;
  private skillsUrl = 'api/skills';  // URL to web api
  private entityName = 'skills';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Log a SkillsService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SkillService: ${message}`);
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

  /** GET skills from the server */
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${environment.fbDbUrl}/${this.entityName}.json`)
      .pipe(
        tap(_ => this.log('fetched skills')),
        map((response: {[key: string]: any}) => {
          return Object.
          keys(response)
            .map(key => ({
              ...response[key],
              id: key,
            }));
        }),
        catchError(this.handleError<Skill[]>('getSkills', []))
      );
  }

  getSkill(id: string): Observable<Skill> {
    const url = `${environment.fbDbUrl}/${this.entityName}/${id}.json`;
    return this.http.get<Skill>(url).pipe(
      tap(_ => this.log(`fetched skill id=${id}`)),
      map((skill: Skill) => {
        return {
          ...skill,
          id
        };
      }),
      catchError(this.handleError<Skill>(`getSkill id=${id}`))
    );
  }

  /** PUT: update the skill on the server */
  updateSkill(skill: Skill): Observable<any> {
    return this.http.patch(`${environment.fbDbUrl}/skills/${skill.id}.json`, skill, this.httpOptions).pipe(
      tap(_ => this.log(`updated skill id=${skill.id}`)),
      catchError(this.handleError<any>('updateSkill'))
    );
  }

  /** POST: add a new skill to the server */
  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${environment.fbDbUrl}/skills.json`, skill, this.httpOptions).pipe(
      tap((newSkill: Skill) => this.log(`added skill w/ id=${newSkill.id}`)),
      map((response: FbCreateResponse) => {
        return {
          ...skill,
          id: response.name,
        };
      }),
      catchError(this.handleError<Skill>('addSkill'))
    );
  }

  /** DELETE: delete the skill from the server */
  deleteSkill(skill: Skill | string): Observable<Skill> {
    const id = typeof skill === 'string' ? skill : skill.id;
    const url = `${environment.fbDbUrl}/${this.entityName}/${id}.json`;

    return this.http.delete<Skill>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted skill id=${id}`)),
      catchError(this.handleError<Skill>('deleteSkill'))
    );
  }

  /* GET skills whose name contains search term */
  searchSkills(term: string): Observable<Skill[]> {
    if (!term.trim()) {
      // if not search term, return empty skill array.
      return of([]);
    }
    return this.http.get<Skill[]>(`${this.skillsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found skills matching "${term}"`) :
        this.log(`no skills matching "${term}"`)),
      catchError(this.handleError<Skill[]>('searchSkills', []))
    );
  }
}
