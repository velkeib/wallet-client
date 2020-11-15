import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';
import { Group } from '../model/Group';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: User;
  groups: Group[];
  groupName: String;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private groupService: GroupService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {

    this.groupService.getGroups().pipe(first()).subscribe(
      data => {
        this.groups = data;
        console.log(this.groups);
      });

  }

  logout() {
    this.authenticationService.logout();
  }

  createGroup(){
    this.groupService.createGroup(this.groupName).pipe(first()).subscribe(
      data => {
        this.groups = data;
        console.log(this.groups);
      });;
  }

}
