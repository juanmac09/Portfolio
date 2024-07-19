import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../Services/Translate/translate.service';
import { DataService } from '../Services/Data/data.service';
import { NgClass } from '@angular/common';

interface Job {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Experience {
  title: string;
  jobs: Job[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgClass],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  language: number = 0;
  experience: Experience = {
    title: '',
    jobs: [],
  };

  constructor(
    private translateService: TranslateService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getLanguage();
  }

  /**
   * Retrieves the experience data for the specified language.
   *
   * @param {number} language - The language code to retrieve the experience data for.
   */
  getData(language: number): void {
    this.experience = this.dataService.getData(language).Experience;
  }

  /**
   * Retrieves the current language code from the TranslateService and updates the component's language property.
   * After the language is retrieved, it calls the `getData` method with the retrieved language code to update the experience data.
   *
   * @param {number} [language] - The language code to update the component's language property. If not provided, it retrieves the current language from the TranslateService.
   * @returns {void} - No return value.
   */
  getLanguage(): void {
    this.translateService.$getLanguage.subscribe((language) => {
      this.language = language;
      this.getData(language);
    });
  }
}
