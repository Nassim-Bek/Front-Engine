import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'dictionnaire', component: AppComponent, data: { config: 'dictionnaire' } },
  { path: 'clients', component: AppComponent, data: { config: 'clients' } },
  { path: '', redirectTo: '/dictionnaire', pathMatch: 'full' } // route par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}