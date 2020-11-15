import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpclient: HttpClient) { }

  getGroups(): Observable<any>{
    return this.httpclient.get("http://localhost:8080/getgroups");
  }

  createGroup(groupName): Observable<any>{
    return this.httpclient.post<any>("http://localhost:8080/creategroup", { groupName });
  }

  addGroupMember(groupId, email): Observable<any>{
    return this.httpclient.post<any>("http://localhost:8080/addgroupmember/" + groupId, { email });
  }

}
