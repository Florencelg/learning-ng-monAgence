import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitSigninForm() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    // Si on veut faire une confirmation de password:
    // if (password === passwordConfirm) {}
    this.authenticationService
      .signInUser(email, password)
      .then((data) => {
        this.router.navigate(['/admin', 'dashboard']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
