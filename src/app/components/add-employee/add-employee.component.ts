import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Employee} from "../../models/employee.model";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  employee: Employee;
  addForm!: FormGroup;// '!' kullanarak addForm'un kesinlikle tanımlanacağını belirtiyoruz.

  preferred_username="";
  successMessage: string = '';

 constructor(private formBuilder: FormBuilder,
             private employeeService: EmployeeService,
             private router: Router,
             private oauthService: OAuthService
 ) {
   this.employee=this.employeeService.createNewEmployee();


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
    this.employee.preferred_username=this.getUsername();
   // console.log(this.employee);

    this.employeeService.createEmployee(this.employee)
      .subscribe(data =>{
        this.goToList().then(r => {
          this.successMessage = 'Employee created successfully!';
          console.log(this.successMessage);
            console.log(this.employee);
          this.goToEmployeeList();
        },
          error => console.log(error));
      });
  }
  goToEmployeeList(){
   this.router.navigate(['add-employee']);
  }
  onSubmit(){

    this.saveEmployee();
    this.router.navigate(['add-employee']);

  }


  goToList() {
   return this.router.navigate(['/employee/add']);
  }

  getUsername(){
    const userClaims: any = this.oauthService.getIdentityClaims();
    this.preferred_username = userClaims.preferred_username || '';
    return this.preferred_username;
  }


}
