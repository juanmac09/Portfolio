import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '../Services/Translate/translate.service';
import { DataService } from '../Services/Data/data.service';
import { DarkModeService } from '../Services/DarkMode/dark-mode.service';
import { NgClass } from '@angular/common';

interface Menu {
  about: string;
  technologies: string;
  experience: string;
  projects: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  menuOpen = false;
  language: number = 0;
  darkMode: number = 0;
  urlFile: string = '';
  showScrollToTop = false;
  data: Menu = {
    about: '',
    technologies: '',
    experience: '',
    projects: '',
  };

  constructor(
    private translateService: TranslateService,
    private dataService: DataService,
    private modeService: DarkModeService,
    private renderer: Renderer2 // Inject Renderer2
  ) {}

  ngOnInit(): void {
    this.getLanguage();
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.menuOpen) return;
      const target = event.target as HTMLElement;
      const menuContainer = document.querySelector('.menu-container');
      const menuToggle = document.querySelector('.menu-toggle');

      if (menuContainer && !menuContainer.contains(target) && !menuToggle?.contains(target)) {
        this.menuOpen = false;
      }
    });
  }

  setLanguage() {
    this.language = this.language == 0 ? 1 : 0;
    this.translateService.setLanguage = this.language;
  }

  getLanguage() {
    this.translateService.$getLanguage.subscribe((language) => {
      this.data = this.dataService.getData(language).menu;
      this.setUrl(language);
    });
  }

  setUrl(language: number) {
    this.urlFile =
      language === 0
        ? 'Hoja_de_vida_Juan_David_Romero_Sanchez.pdf'
        : 'Hoja_de_vida_Juan_David_Romero_Sanchez.english.pdf';
  }

  setDarkMode() {
    this.darkMode = this.darkMode == 0 ? 1 : 0;
    this.modeService.setMode = this.darkMode;
    this.modeService.updateBodyClass(this.returnMode());
  }

  returnMode(): boolean {
    return this.darkMode === 1;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
