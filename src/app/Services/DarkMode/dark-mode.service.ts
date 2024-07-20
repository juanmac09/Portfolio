import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private mode: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get $getMode(): Observable<number> {
    return this.mode.asObservable();
  }

  set setMode(value: number) {
    this.mode.next(value);
  }

  /**
   * Updates the CSS class of the document body based on the dark mode status.
   *
   * @param isDarkMode - A boolean indicating whether dark mode is enabled or not.
   *
   * @returns {void} This function does not return any value.
   *
   * @remarks
   * This function toggles the 'dark-mode' CSS class on the document body based on the provided `isDarkMode` parameter.
   * If `isDarkMode` is `true`, the 'dark-mode' class is added to the body.
   * If `isDarkMode` is `false`, the 'dark-mode' class is removed from the body.
   */
  public updateBodyClass(isDarkMode: boolean) {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }
}
