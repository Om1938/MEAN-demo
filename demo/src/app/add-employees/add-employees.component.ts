import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../interfaces/dept';
import { Emp } from '../interfaces/emp';
import { DemoService } from '../services/demo.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  errMsg: string;
  departments: Department[];

  viewForm = false
  viewError: boolean = false;

  emp_form: FormGroup
  constructor(private demoService: DemoService, private fb: FormBuilder,private router : Router) {
    this.emp_form = this.fb.group({
      emp_name: ['', Validators.required],
      salary: ['', Validators.required],
      Dept: ['', Validators.required],
      Gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
    })
  }


  get f() {
    return this.emp_form.controls;
  }

  ngOnInit(): void {
    this.demoService.getDepartments().subscribe(res => {
      this.departments = res;
      this.viewForm = true;
      this.viewError = false;
    }, err => {
      this.viewError = true;
      this.errMsg = "Some Error Occured, Please try again later."
    })
  }

  AddEmployee() {

    if (this.emp_form.valid) {
      let empObj: Emp = {
        emp_name: this.f.emp_name.value,
        salary: this.f.salary.value,
        Dept: this.f.Dept.value,
        Gender: this.f.Gender.value,
        mobile: this.f.mobile.value
      }
      // console.log(empObj);

      this.demoService.addEmployee(empObj).subscribe(res=>{
        if(res){
          alert("Employee Added Successfully")
          this.router.navigate([''])

        }
      },err=>{
        alert("Some Error Occured")
      })

    } else {
      this.viewError = true
    }


  }

}
