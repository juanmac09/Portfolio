import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private mode: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get $getMode() : Observable<number> {
    return this.mode.asObservable();
  }

  
  set setMode(value : number) {
    this.mode.next(value);
  }
}
