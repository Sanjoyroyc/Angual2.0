import { Injectable } from 'angular2/core';
import {Http, Response} from 'angular2/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HeroService {
   private baseUrl:string;
       
    constructor(private http:Http){   
        var vm=this; 
        vm.baseUrl =  'http://localhost/Preferences.Api';      
    }
   
   getPreferencesFromapi():Observable<any>{
       let url = this.baseUrl + "/odata/PreferenceOption";
       return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);   
   } 
   
   private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.value || { };
  }
  
    private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
   
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
