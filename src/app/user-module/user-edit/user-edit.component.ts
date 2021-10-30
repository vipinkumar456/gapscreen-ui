
import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { UserForm } from "src/app/forms/user.form";
import { HttpService } from "src/app/services/http.service";
import { PATH } from "../../app.constants";
@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  roles: Array<any> = [];
  userForm: FormGroup;
  availableRoles: Array<any> = [];
  username: string = "";
  disabled: boolean = false;
  currentRoute: string = "";
  

  constructor(
    private httpService: HttpService,
    private _userForm: UserForm,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {
    this.userForm = this.fb.group(_userForm.getForm());
  }

  ngOnInit(): void {
  

    this.primengConfig.ripple = true;
    this.getAllRoles();
    this.route.url.subscribe((res) => {
      
      this.route.params.subscribe((params) => {
        if (params.username) {
          console.log('user:'+params.username);
          this.username = params.username;
          this.userForm.controls["userName"].setValue(this.username);
          this.disabled = true;
          this.getUserRoles();
        }
      });
    });
  }
  getAllRoles() {
    this.httpService.getData(PATH.AVAILABLE_ROLES).subscribe((res:any) => {
      let roles=[]
      res.map((o,index)=>{
        roles.push({name:o})
      })
      this.availableRoles=roles
    });
  }
  getUserRoles() {
    this.httpService
      .getData(PATH.USER_ROLES + this.username)
      .subscribe((res) => {
        let roles=[]
        res.roles.map((o,index)=>{
          roles.push({name:o})
        })
        this.userForm.controls["roles"].setValue(roles);
      });
  }
  saveUser() {
    let dt = this.userForm.getRawValue();
    let roles=[];
    dt.roles.map(o=>{
      roles.push(o.name)
    })
    dt.roles=roles;
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return true;
    }
    // if (this.currentRoute == "add") {
      console.log('1');
      this.httpService.postData(dt, PATH.USER).subscribe(
        (res) => {
          this.userForm.patchValue(res);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Edited Successfully",
          });

          this.router.navigate(["adminPanel", "edit", res.userName]);
          this.getUserRoles();
        },
        (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
          });
          this.getUserRoles();
        }
      );
    // }  
  }
  getLoginUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.userForm.patchValue(res);
      // sessionStorage.setItem('ssoRoles', JSON.stringify(res['roles']))
    });
  }
}
