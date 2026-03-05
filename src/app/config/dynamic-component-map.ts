import { DynamicButtonComponent } from '../components/dynamic-button/dynamic-button.component';
import { DynamicTableComponent } from '../components/dynamic-table/dynamic-table.component';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { DynamicDropdownComponent } from '../components/dynamic-dropdown/dynamic-dropdown.component';
import { DynamicInputComponent } from '../components/dynamic-input/dynamic-input.component';
import { DynamicDatepickerComponent } from '../components/dynamic-datepicker/dynamic-datepicker.component';
import { DynamicSidebarComponent } from '../components/dynamic-sidebar/dynamic-sidebar.component';
import { DynamicNavbarComponent } from '../components/dynamic-navbar/dynamic-navbar.component';
import { DynamicFooterComponent } from '../components/dynamic-footer/dynamic-footer.component';

export const DynamicComponentMap: any = {
  button: DynamicButtonComponent,
  table: DynamicTableComponent,
  form: DynamicFormComponent,
  dropdown: DynamicDropdownComponent,
  input: DynamicInputComponent,
  datepicker: DynamicDatepickerComponent,
  sidebar: DynamicSidebarComponent,
  navbar: DynamicNavbarComponent,
  footer: DynamicFooterComponent
};