import { Component } from '@angular/core';
import { TranslateService } from '../../Services/Translate/translate.service';
import { DataService } from '../../Services/Data/data.service';


interface Footer {
  title: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year:Number = new Date().getFullYear();
  data: Footer = {
    title: ''
  };

  constructor(
    private translateService: TranslateService,
    private dataService: DataService
  ) {}

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
    this.data = this.dataService.getData(language).footer;
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
