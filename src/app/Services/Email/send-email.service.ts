import { Injectable } from '@angular/core';
import { HttpHandlerService } from '../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  constructor(private httpRequest: HttpHandlerService) {}

  /**
   * Sends an email notification to the appropriate recipients.
   * @param visitDate The date of the visit.
   * @param hour The hour of the visit.
   * @param location The location of the visit. If not provided, defaults to an empty string.
   * @returns An Observable of the response data as a string.
   */
  public sendEmailNotification(
    visitDate: string,
    hour: string,
    location: string = ''
  ): Observable<string> {
    const data = {
      visitDate: visitDate,
      hour: hour,
      location: location,
    };
    return this.httpRequest.postData('/notification/send-notification', data, 'text');
  }
}
