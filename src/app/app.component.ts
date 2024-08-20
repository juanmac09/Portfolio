import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DarkModeService } from './Services/DarkMode/dark-mode.service';
import { NgClass } from '@angular/common';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { FooterComponent } from './components/footer/footer.component';
import { SendEmailService } from './Services/Email/send-email.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    AboutMeComponent,
    TechnologiesComponent,
    ExperienceComponent,
    ProjectsComponent,
    FooterComponent,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  darkMode: number = 0;
  constructor(
    private modeService: DarkModeService,
    private emailService: SendEmailService
  ) {}

  ngOnInit(): void {
    this.getDarkMode();
    this.sendNotificationEmail(this.returnDate(), this.returnHour());
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

  /**
   * This method is responsible for retrieving the current date in the format "YYYY-MM-DD".
   * It uses the built-in `Date` object to get the current date and time, and then formats it into the specified format.
   *
   * @returns {string} - Returns the current date in the format "YYYY-MM-DD".
   */
  returnDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * This method is responsible for retrieving the current time in the format "HH:mm".
   * It uses the built-in `Date` object to get the current date and time, and then extracts the hours and minutes.
   * The hours and minutes are then formatted into a string in the format "HH:mm" with leading zeros for single-digit values.
   *
   * @returns {string} - Returns the current time in the format "HH:mm".
   */
  returnHour(): string {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    return `${hour}:${minute}`;
  }

  /**
   * This method is responsible for sending a notification email to a specified recipient.
   * The email contains the current date and time when the notification is sent.
   *
   * @param date - The current date in the format "YYYY-MM-DD".
   * @param hour - The current time in the format "HH:mm".
   *
   * @returns {void} - This method does not return any value.
   *
   * @remarks
   * The method subscribes to the `sendEmailNotification` method of the `SendEmailService` to send the email.
   * The `date` and `hour` parameters are used to construct the email content.
   *
   * @example
   * ```typescript
   * sendNotificationEmail('2022-01-01', '12:30');
   * ```
   */
  sendNotificationEmail(date: string, hour: string) {
    this.emailService
      .sendEmailNotification(date, hour)
      .subscribe((response) => {});
  }
}
