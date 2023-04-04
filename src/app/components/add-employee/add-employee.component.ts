import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Employee} from "../../models/employee.model";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  employee: Employee =new Employee();
  addForm!: FormGroup;// '!' kullanarak addForm'un kesinlikle tanımlanacağını belirtiyoruz.
 constructor(private formBuilder: FormBuilder,
             private employeeService: EmployeeService,
             private router: Router) {
 }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      departmentName: ['', Validators.required]

    });
  }
  saveEmployee(){
    this.employee.name = this.addForm.get('name')?.value;
    this.employee.departmentName = this.addForm.get('departmentName')?.value;
    this.employeeService.createEmployee(this.employee)
      .subscribe(data =>{
        this.goToList().then(r => {
          console.log(this.employee);
        },
          error => console.log(error));
      });
  }
  goToEmployeeList(){
   this.router.navigate(['add-employee']);
  }
onSubmit(){
   console.log(this.employee);
   this.saveEmployee();
}


  goToList() {
   return this.router.navigate(['/employee/add']);
  }
}
