import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router,) { }

  registrationUser = new User();
  
  registrationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  error = '';
  loading = false;



  ngOnInit(): void {

    this.registrationForm =  new FormGroup({
      email:  new FormControl(this.registrationUser.userName, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(this.registrationUser.password, [
        Validators.required,
        Validators.minLength(5)
      ]),
      firstName: new FormControl(this.registrationUser.firstName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl(this.registrationUser.lastName, [
        Validators.required,
        Validators.minLength(2)
      ]),
    });

  }

  get email() { return this.registrationForm.get('email'); }

  get password() { return this.registrationForm.get('password'); }
  
  get firstName() { return this.registrationForm.get('firstName'); }

  get lastName() { return this.registrationForm.get('lastName'); }


  get f() { return this.registrationForm.controls; }

  onSubmit() {

    this.loading = true;
    this.authenticationService.register(this.f.email.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
