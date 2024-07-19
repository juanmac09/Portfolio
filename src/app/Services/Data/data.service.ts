import { Injectable } from '@angular/core';
import dataSpanish from '../../data/spanish/data.json';
import dataEnglish from '../../data/english/data.json';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  getData(language: number){
    const data = language === 0 ? dataSpanish : dataEnglish;
    return data
  }
}
