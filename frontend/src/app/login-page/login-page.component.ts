import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../title/title.component";
import { NgIf } from '@angular/common';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextInputComponent } from "../text-input/text-input.component";
import { DefaultButtonComponent } from "../default-button/default-button.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, NgIf, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.loginForm.controls;
  }


  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this.userService.login({
      email: this.fc['email'].value,
      password: this.fc['password'].value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
