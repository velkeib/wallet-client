import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpclient: HttpClient) { }

  getExpenses(groupId: String): Observable<any> {
    return this.httpclient.get("http://localhost:8080" + groupId);
  }

  getUsers(groupId: string): Observable<any> {
    return this.httpclient.get("http://localhost:8080/users/" + groupId);
  }

  setExpenses(post: string, groupId: String): Observable<any> {
    return this.httpclient.post("http://localhost:8080" + groupId, post);
  }

  getLastExpenses(groupId: string, page: number): Observable<any>{
    return this.httpclient.get("http://localhost:8080/expenses/" + groupId + "?page=" + page);
  }
}
