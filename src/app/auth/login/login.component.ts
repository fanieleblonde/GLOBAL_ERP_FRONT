import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NavigationExtras, Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  signinForm: FormGroup;
  currentUser = {};
  errorCode: any = '';
  errorMessage = '';
  isSubmitted = false;
  login = false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get fc(){
    return this.signinForm.controls;
  }

  loginUser() {
    this.isSubmitted = true;
    if (this.signinForm.valid){
      this.login = true
      this.authService.signIn(this.signinForm.value).subscribe({
        next:(res: any) =>
        {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('access_token', res.token);
          console.log(res);

          let currentUserId = res["user"]["id"];
          let currenUserFirstname = res["user"]["firstname"];
          let currentUserLastname = res["user"]["lastname"];
          this.errorCode = 201;
          this.errorMessage =
            'Succesfull auhentificate, welcome ' + currenUserFirstname + ' ' + currentUserLastname;

          this.refresh();


        },
        complete: () => {
          this.login = false
        },
        error: (err: any) =>
        {
          console.log(err)
          this.login = false
          this.errorCode = err['error']['code'];
          this.errorMessage = err['error']['message'];

        }

      });
    }

  }

  refresh(): void {
    //window.location.reload();
    //window.location.href = '/dashboard'
    window.location.href = '/school'
  }

}
