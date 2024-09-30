import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../Services/Translate/translate.service';
import { DataService } from '../../Services/Data/data.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from '../../Services/DarkMode/dark-mode.service';

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
  darkMode: number = 0;

  constructor(
    private translateService: TranslateService,
    private dataService: DataService,
    private modeService: DarkModeService
  ) { }

  ngOnInit(): void {
    this.getDarkMode();
    this.getLanguage();
  }

  /**
 * Retrieves the experience data for the specified language.
 *
 * @param {number} language - The language code to retrieve the experience data for.
 */
  getData(language: number): void {
    const data = this.dataService.getData(language).Experience;

    // Llamar a la función para ordenar los trabajos.
    this.experience = {
      ...data,
      jobs: this.sortData(data.jobs)
    };
  }

  /**
   * Ordena los trabajos por la fecha de finalización, de la más reciente a la más antigua.
   *
   * @param {Job[]} jobs - El arreglo de trabajos a ordenar.
   * @returns {Job[]} - El arreglo de trabajos ordenados.
   */
  sortData(jobs: Job[]): Job[] {
    return jobs.sort((a: Job, b: Job) => {
      const dateA = new Date(a.duration.split(' - ')[1] === 'Actualmente' ? new Date() : a.duration.split(' - ')[1]);
      const dateB = new Date(b.duration.split(' - ')[1] === 'Actualmente' ? new Date() : b.duration.split(' - ')[1]);

      // Ordenar de la más reciente a la más antigua.
      return dateB.getTime() - dateA.getTime();
    });
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
