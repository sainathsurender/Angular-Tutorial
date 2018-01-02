import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Step1ListDTO } from './step1-listdto';

@Injectable()
export class CDMSService {
  constructor(
    private http: Http
  ) { }

  get(path): Observable<any> {
    return this.http.get(path)
      .map((response: Response) => {
        if(response.json().ResponseStatus == '1')
        {
          return <any>response.json();
        }
      })
  }
} 