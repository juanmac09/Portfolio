import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DarkModeService } from '../../Services/DarkMode/dark-mode.service';

@Component({
  selector: 'app-tecnology',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tecnology.component.html',
  styleUrls: ['./tecnology.component.css'],
})
export class TecnologyComponent {
  @Input() technologyName: string = '';
  @Input() technologyLevel: string = '';
  @Input() technologyLogo: string = '';
  darkMode:number = 0;


  constructor(private modeService: DarkModeService) {}

  ngOnInit(): void {
    this.getDarkMode();
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
