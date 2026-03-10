import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  standalone: true,
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent {
  @Input() label?: string;
}
