import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../Services/Translate/translate.service';
import { DataService } from '../Services/Data/data.service';


interface AboutData {
  summary: string;
  time: string;
  projects: string;
  home: string;
  contact: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  data: AboutData = {
    summary: '',
    time: '',
    projects: '',
    home: '',
    contact: ''
  };

  constructor(private translateService: TranslateService, private dataService:DataService) {}

  ngOnInit(): void {
    this.getLanguage();
  }

  /**
   * Updates the component's data based on the selected language.
   *
   * @param {number} language - The selected language index. 0 for Spanish, 1 for English.
   * @returns {void}
   */
  getData(language: number): void {
    this.data = this.dataService.getData(language).about;
  }

  /**
   * Subscribes to the TranslateService's $getLanguage observable to update the component's language property.
   *
   * @returns {void}
   */
  getLanguage(): void {
    this.translateService.$getLanguage.subscribe((language) => {
      this.getData(language);
    });
  }
}
