import { Component } from '@angular/core';
import { TecnologyComponent } from '../tecnology/tecnology.component';
import { TranslateService } from '../../Services/Translate/translate.service';
import { DataService } from '../../Services/Data/data.service';
import { DarkModeService } from '../../Services/DarkMode/dark-mode.service';
import { NgClass } from '@angular/common';
interface Technology {
  name: string;
  level: string;
  image: string;
}

interface Technologies {
  title: string;
  technologies: Technology[];
}


@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [TecnologyComponent,NgClass],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.css'
})
export class TechnologiesComponent {
  data: Technologies = {
    title: '',
    technologies: [
      {
        name: '',
        level: '',
        image: ''
      }
    ]
  };
  darkMode: number = 0;
  
  constructor(private translateService: TranslateService, private dataService:DataService,private modeService: DarkModeService) {}

  ngOnInit(): void {
    this.getLanguage();
    this.getDarkMode();
  }

  /**
   * Updates the component's data based on the selected language.
   *
   * @param {number} language - The selected language index. 0 for Spanish, 1 for English.
   * @returns {void}
   */
  getData(language: number): void {
    this.data = this.dataService.getData(language).technologies;
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

  /**
   * This method is responsible for retrieving the current dark mode theme setting and updating the application's dark mode theme accordingly.
   * It subscribes to the `$getMode` observable of the `DarkModeService` to listen for changes in the dark mode theme.
   * When a dark mode theme change occurs, it updates the `darkMode` property with the new theme setting.
   *
   * @returns {void} - This method does not return any value.
   */
  getDarkMode(): void {
    this.modeService.$getMode.subscribe((mode) => {
      this.darkMode = mode;
    });
  }

  /**
   * This method is responsible for determining the current dark mode theme setting of the application.
   * It checks the value of the `darkMode` property and returns `true` if the dark mode theme is enabled (`darkMode` is 1), and `false` otherwise.
   *
   * @returns {boolean} - Returns `true` if the dark mode theme is enabled, and `false` otherwise.
   */
  returnMode(): boolean {
    return this.darkMode === 1;
  }
}
