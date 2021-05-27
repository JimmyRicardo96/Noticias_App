/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage=0;

  categoriaActual='';
  categoriaPages=0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ){
    query= apiUrl + query;
    return this.http.get<T>(query, {headers});
  }


  getTopHeadlines(){
    this.headlinesPage++;
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?language=es&apiKey=6f0f887f91284e11afec08a191db81f5`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?language=es&page=${this.headlinesPage}`);
  }

  getTopHeadLinesCategorias(categoria: string){

    if(this.categoriaActual===categoria){
this.categoriaPages++;
    }else{
      this.categoriaPages=1;
      this.categoriaActual=categoria;
    }
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?category=technology&language=es&apiKey=6f0f887f91284e11afec08a191db81f5`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?language=es&category=${ categoria }&page=${this.categoriaPages}`);
  }
}
