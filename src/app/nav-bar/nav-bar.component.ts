import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../Services/Translate/translate.service';
import { DataService } from '../Services/Data/data.service';

interface Menu {
  about: string;
  technologies: string;
  experience: string;
  projects: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  language: number = 0;
  urlFile: string = '';
  data: Menu = {
    about: '',
    technologies: '',
    experience: '',
    projects: '',
  };
  constructor(
    private translateService: TranslateService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getLanguage();
  }

  /**
   * This function is responsible for toggling the language between English and Spanish.
   * It updates the `language` property and calls the `setLanguage` method of the `TranslateService`
   * to change the language of the application.
   *
   * @returns {void}
   */
  setLanguage() {
    this.language = this.language == 0 ? 1 : 0;
    this.translateService.setLanguage = this.language;
  }

  /**
   * This method is responsible for retrieving the current language and updating the application's language settings accordingly.
   * It subscribes to the `$getLanguage` observable of the `TranslateService` to listen for changes in the language.
   * When a language change occurs, it calls the `getData` method of the `DataService` with the new language as a parameter.
   * The returned `menu` object is then used to update the application's language settings.
   *
   * @returns {void}
   */
  getLanguage() {
    this.translateService.$getLanguage.subscribe((language) => {
      this.data = this.dataService.getData(language).menu;
      this.setUrl(language);
    });
  }

  /**
   * This method is responsible for setting the URL of the resume file based on the selected language.
   * It updates the `urlFile` property with the appropriate file path based on the language parameter.
   *
   * @param {number} language - A number representing the selected language. 0 represents Spanish, and 1 represents English.
   * @returns {void} - This method does not return any value.
   */
  setUrl(language: number) {
    this.urlFile =
      language === 0
        ? 'Hoja_de_vida_Juan_David_Romero_Sanchez.pdf'
        : 'Hoja_de_vida_Juan_David_Romero_Sanchez.english.pdf';
  }
}
