import { Component, Input, OnInit, ViewChild, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicComponentMap } from '../config/dynamic-component-map';

@Component({
  selector: 'app-dynamic-renderer',
  standalone: true,
  templateUrl: './dynamic-renderer.component.html',
  styleUrls: ['./dynamic-renderer.component.scss']
})
export class DynamicRendererComponent implements OnInit, OnChanges {
  @Input() uiConfig: any;

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngOnInit(): void {
    // attempt initial render if config already present
    this.tryRender();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['uiConfig'] && !changes['uiConfig'].isFirstChange()) {
      this.tryRender();
    }
  }

  private tryRender(): void {
    console.log('[DynamicRenderer] tryRender uiConfig present?', !!this.uiConfig);
    if (!this.uiConfig) return;
    this.container.clear();
    // ordered insertion: navbar, add button, filters (form), table, footer
    if (this.uiConfig.navbar) this.loadComponent('navbar', this.uiConfig.navbar);
    if (this.uiConfig.addButton) this.loadComponent('button', this.uiConfig.addButton);
    if (this.uiConfig.filters) this.loadComponent('form', { fields: this.uiConfig.filters });
    if (this.uiConfig.table) this.loadComponent('table', { title: this.uiConfig.table.title, headers: this.uiConfig.table.headers, rows: this.uiConfig.table.rows, actions: this.uiConfig.actions, pageSize: this.uiConfig.table.pageSize });
    if (this.uiConfig.footer) this.loadComponent('footer', this.uiConfig.footer);
  }

  private loadComponent(type: string, config: any): void {
    const componentClass = DynamicComponentMap[type];
    if (!componentClass) return;

    // create the component instance directly (works with standalone and non-standalone)
    const componentRef = this.container.createComponent(componentClass as any);
    // map config to the expected inputs for known component types
    try {
      const inst: any = componentRef.instance;
      if (type === 'navbar') {
        inst.menuConfig = config?.menu ?? config;
      } else if (type === 'button') {
        inst.label = config?.label ?? config?.text ?? 'Ajouter';
      } else if (type === 'form') {
        inst.config = config;
      } else if (type === 'table') {
        inst.title = config?.title ?? '';
        inst.headers = (config?.headers || []).map((h: any) => h.label ?? h.key ?? h);
        inst.rows = config?.rows || [];
        if (config?.pageSize) inst.pageSize = config.pageSize;
      } else {
        // generic fallback
        inst.config = config;
      }
    } catch (e) {
      // ignore if setting inputs fails
    }
  }
}