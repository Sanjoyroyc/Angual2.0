import {Component,OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';
import { HeroService } from './hero.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'add new hero',
  templateUrl: 'app/addhero.component.html',
  providers:  [
    HTTP_PROVIDERS,
    HeroService,   
  ] 
})


export class AddHeroComponent implements OnInit {
    public patronPreference:Observable<any>; 
    public error:Boolean = false;    
    constructor(private _heroService: HeroService){
      var vm = this;  
     
    }
    
    ngOnInit() {
     this._heroService.getPreferencesFromapi()
            .subscribe(
                data=>{this.patronPreference = data                   
                },
                err=>{this.error = true}
            )
            
        }

    
   }

