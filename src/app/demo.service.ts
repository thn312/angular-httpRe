import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './common/services/base.service';
import { environment } from './../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DemoService extends BaseService {
  public getProcesses(): Observable<any> {
    return this.get('process');
  }

  public getProcessById(id: string): Observable<any> {

    return this.get('process/findone', { id }); //this.get(`process/${id}`);
  }

  public createProcess(object: any): Observable<string> {
    return this.post('process', object);
  }

  public updateProcess(id: string, data: any) {
    return this.put(`process/${id}`, data);
  }
}
