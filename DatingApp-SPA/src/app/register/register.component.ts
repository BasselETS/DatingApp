import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/AlertifyService.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

user:User;
  constructor(private authService:AuthService, private alertify:AlertifyServiceService, private fb: FormBuilder, private router: Router) { }
registerForm: FormGroup;
bsConfig: Partial<BsDatepickerConfig>;

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
      this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {validators: this.passwordMatchValidator});
  }

  register()
  {
    if(this.registerForm.valid)
    {
      this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(() => {
      this.alertify.success('registration successfull');
    }, error => {
      this.alertify.error(error);
    }, ()=>{
      this.authService.login(this.user).subscribe(()=>{
        this.router.navigate(['/members']);
      })
    });
  } else {
    this.alertify.error('Form is not yet valid');
  }
  }

  passwordMatchValidator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
