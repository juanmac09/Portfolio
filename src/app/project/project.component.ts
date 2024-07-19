import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input() title: string = 'Título del Proyecto';
  @Input() description: string = 'Descripción breve del proyecto.';
  @Input() codeLink: string = '#';
  @Input() textButton: string = 'Ver codigo';
}
