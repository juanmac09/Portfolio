import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private language: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  
  get $getLanguage() : Observable<number> {
    return this.language.asObservable();
  }

  
  set setLanguage(value : number) {
    this.language.next(value);
  }
  
  
}
