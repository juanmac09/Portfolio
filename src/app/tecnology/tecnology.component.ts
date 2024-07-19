import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tecnology',
  standalone: true,
  imports: [],
  templateUrl: './tecnology.component.html',
  styleUrl: './tecnology.component.css'
})
export class TecnologyComponent {
  @Input() technologyName: string = '';
  @Input() technologyLevel: string = '';
  @Input() technologyLogo: string = '';
}
