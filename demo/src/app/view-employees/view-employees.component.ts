import { Component, OnInit } from '@angular/core';
import { Emp } from '../interfaces/emp';
import { DemoService } from '../services/demo.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  employees: Emp[] = []
  constructor(private demoService: DemoService) { }

  ngOnInit(): void {
    this.demoService.getEmployees().subscribe(res => {
      this.employees = res;
    })
  }

  deleteEmp(employee: Emp) {
    this.demoService.deleteEmployee(employee._id).subscribe(res => {
      console.log(res);
      if (res) {
        let index = this.employees.findIndex((emp) => emp._id == employee._id);
        this.employees.splice(index, 1);
        alert("Employee Deleted Successfully.")
      }
    })
  }

}
