import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-sidebar',
  standalone: true,
  template: `<aside><ng-content></ng-content></aside>`,
  styleUrls: ['./dynamic-sidebar.component.scss']
})
export class DynamicSidebarComponent {
  @Input() items: any[] = [];
}
