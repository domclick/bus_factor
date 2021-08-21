import { Injectable } from '@angular/core';
import { Skill } from '../../bus_factor.interface';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private skillsUrl = 'api/skills';  // URL to web api

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
    return this.http.get<Skill[]>(this.skillsUrl)
      .pipe(
        tap(_ => this.log('fetched skills')),
        catchError(this.handleError<Skill[]>('getSkills', []))
      );
  }

  getSkill(id: number): Observable<Skill> {
    const url = `${this.skillsUrl}/${id}`;
    return this.http.get<Skill>(url).pipe(
      tap(_ => this.log(`fetched skill id=${id}`)),
      catchError(this.handleError<Skill>(`getSkill id=${id}`))
    );
  }

  /** PUT: update the skill on the server */
  updateSkill(skill: Skill): Observable<any> {
    return this.http.put(this.skillsUrl, skill, this.httpOptions).pipe(
      tap(_ => this.log(`updated skill id=${skill.id}`)),
      catchError(this.handleError<any>('updateSkill'))
    );
  }

  /** POST: add a new skill to the server */
  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.skillsUrl, skill, this.httpOptions).pipe(
      tap((newSkill: Skill) => this.log(`added skill w/ id=${newSkill.id}`)),
      catchError(this.handleError<Skill>('addSkill'))
    );
  }

  /** DELETE: delete the skill from the server */
  deleteSkill(skill: Skill | number): Observable<Skill> {
    const id = typeof skill === 'number' ? skill : skill.id;
    const url = `${this.skillsUrl}/${id}`;

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
        this.log(`found skilles matching "${term}"`) :
        this.log(`no skilles matching "${term}"`)),
      catchError(this.handleError<Skill[]>('searchSkills', []))
    );
  }
}
