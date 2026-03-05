import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-footer',
  standalone: true,
  template: `<footer class="app-footer"><ng-content></ng-content></footer>`
})
export class DynamicFooterComponent {}
