import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Is not valid',
  minLength: 'Field is too short',
  notMatch: 'Password and Confirm do not match'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  constructor() {

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);

  }

}