import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-newmember-form',
  templateUrl: './newmember-form.component.html',
  styleUrls: ['./newmember-form.component.css']
})
export class NewmemberFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private router: Router) { }

  newMember: FormGroup;

  ngOnInit(): void {
    this.newMember = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit(){
    this.groupService.addGroupMember(this.router.url.split("/")[this.router.url.split("/").length - 1], this.newMember.controls.email.value)
    .pipe(first()).subscribe(
      data => {
        console.log(data);
      }
    )
  }


}
