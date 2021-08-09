import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../common/services/base.service';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  getUsers():Observable<any>{
    return this.get('users');
  }

  insertUser(user: User): Observable<any>{
    return this.post(`users`, user);
  }

  removeUser(id: number): Observable<any>{
    return this.delete(`users`, id);
  }

  updateUser(user: User): Observable<any>{
    return this.post(`users`, user);
  }
}
