import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordsMatchValidator } from '../shared/validators/password-match-validator';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { TextInputComponent } from "../text-input/text-input.component";
import { TitleComponent } from '../title/title.component';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [TextInputComponent, ReactiveFormsModule, TitleComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(3)]]
    }, {
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];

  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    }

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })

  }

}
