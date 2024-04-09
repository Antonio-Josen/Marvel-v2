import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';

import { Response } from '../interface/interface';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class MarvelService {
  private baseUrl = 'https://gateway.marvel.com/v1/public/comics';
  private apiKey = 'a4632827280b792c0c41dd8cbf0b1134';
  private limit = 20;
  private privateKey = '7d6d1cb0f1facbd1b881c257a5cc9ce1123b367e';
  private page = 1;
  private comicId='';




  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getMarvelList(): Observable<Response> {
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + this.privateKey + this.apiKey);

    
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('ts', timestamp)
      .set('orderBy', '-onsaleDate')
      .set('dateRange', '2023-01-01,2024-04-05')
      .set('noVariants', 'true')
      .set('formatType', 'comic')
      .set('hash', hash);
    return this.http.get<Response>(this.baseUrl, { params });
  }

  getNewsMarvelList(): Observable<Response> {
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + this.privateKey + this.apiKey);
    const limit = + this.limit + 20;
    this.page++;
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('ts', timestamp)
      .set('orderBy', '-onsaleDate')
      .set('dateRange', '2023-01-01,2024-04-05')
      .set('noVariants', 'true')
      .set('formatType', 'comic')
      .set('offset', (this.page) * 20)
      .set('limit', limit)
      .set('hash', hash);
    console.log(this.http.get<Response>(this.baseUrl, { params }));
    return this.http.get<Response>(this.baseUrl, { params });

  }


  getOneMarvelList(): Observable<Response> {
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + this.privateKey + this.apiKey);
    const comicId = this.route.snapshot.paramMap.get('comicId');
    if (comicId != null) {
      const params = new HttpParams()
        .set('comicId', comicId?.toString())
        .set('apikey', this.apiKey)
        .set('ts', timestamp)
        .set('orderBy', '-onsaleDate')
        .set('dateRange', '2023-01-01,2024-04-05')
        .set('noVariants', 'true')
        .set('formatType', 'comic')
        .set('hash', hash);
      console.log(this.http.get<Response>(this.baseUrl +'/'+comicId,{ params }));
      return this.http.get<Response>(this.baseUrl, { params });

    }
    else{
      return throwError(() =>error);
    }
  }
}