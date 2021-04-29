import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emp } from '../interfaces/emp';
import { DemoService } from '../services/demo.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Emp
  constructor(private demoService: DemoService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let empId = this.route.snapshot.params.id;

    this.demoService.getEmployee(empId).subscribe(
      (res: Emp) => {
        this.employee = res;
      })
  }
}
