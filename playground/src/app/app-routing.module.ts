import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ngrxstore',
    loadChildren: () =>
      import('./ngrx-store/ngrx.module').then((m) => m.NgrxModule),
  },
  {
    path: 'observable-data-service',
    loadChildren: () =>
      import('./observable-data-service/ods.module').then((m) => m.ODSModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
