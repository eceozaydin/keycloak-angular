import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Employee} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/employee';

  private addEmployee='http://localhost:8080/employee/add';

  constructor(
    private http: HttpClient
  ) { }

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`).pipe(
      tap(data => console.log('getEmployeesList: ', data)),
      catchError(this.handleError)
    );
  }

  createNewEmployee(): Employee {
    return new Employee();
  }
  createEmployee(employee: Employee): Observable<Object> {
    return this.http.post(`${this.addEmployee}`, employee);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }




}
