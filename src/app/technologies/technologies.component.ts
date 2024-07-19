import { Component } from '@angular/core';
import { TecnologyComponent } from '../tecnology/tecnology.component';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [TecnologyComponent],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.css'
})
export class TechnologiesComponent {

}
