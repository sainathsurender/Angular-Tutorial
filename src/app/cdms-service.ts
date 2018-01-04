import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CDMSService {

  test;
  constructor(
    private http: Http
  ) { }

  get(path): Observable<any> {
    return this.http.get(path)
      .map((response: Response) => {
        return <any>response.json();
      })
  }

  post(path,Request): Observable<any>{
    console.log(Request);
    // let header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8','Accept' : 'application/json' });
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: header });

    return this.http.post(path,JSON.stringify(Request),options)
      .map(data => alert('1'));
  }
} 