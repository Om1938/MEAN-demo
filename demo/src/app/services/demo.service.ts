import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department } from '../interfaces/dept';
import { Emp } from '../interfaces/emp';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Emp[]>(this.url + 'emp/');
  }
  getDepartments() {
    return this.http.get<Department[]>(this.url + 'dept');
  }
  addEmployee(empObj: Emp) {
    return this.http.post(this.url + 'emp', empObj);
  }
  deleteEmployee(id) {
    return this.http.delete(this.url + 'emp/id/' + id);
  }
  getEmployee(id) {
    return this.http.get(this.url + 'emp/id/' + id);

  }
}
