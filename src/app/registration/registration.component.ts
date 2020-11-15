import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router,) { }

  registrationForm: FormGroup;
  error = '';
  loading = false;

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

  }

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
