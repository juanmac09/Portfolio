import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { TranslateService } from '../Services/Translate/translate.service';
import { DataService } from '../Services/Data/data.service';

export interface Project {
  title: string;
  description: string;
  projectUrl: string;
}

export interface Projects {
  title: string;
  projects: Project[];
  textButton: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  data: Projects = {
    title: '',
    projects: [],
    textButton: '',
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
    this.data = this.dataService.getData(language).Projects;
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
