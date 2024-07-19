import { Component } from '@angular/core';
import { TecnologyComponent } from '../tecnology/tecnology.component';
import { TranslateService } from '../Services/Translate/translate.service';
import { DataService } from '../Services/Data/data.service';
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
  imports: [TecnologyComponent],
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
}
