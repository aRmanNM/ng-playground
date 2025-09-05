import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SSRComponent } from './ssr/ssr.component';

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
  {
    path: 'ssr',
    component: SSRComponent,
  },
  {
    path: 'pipe',
    loadChildren: () =>
      import('./pipe/pipe.module').then((m) => m.PipeModule),
  },
  {
    path: 'validator',
    loadChildren: () =>
      import('./async-validator/valdiator.module').then((m) => m.ValidatorModule),
  },
  {
    path: 'sse',
    loadChildren: () =>
      import('./server-sent-events/sse.module').then((m) => m.SSEModule),
  },
  {
    path: 'protected',
    loadChildren: () =>
      import('./route-guard/protected.module').then((m) => m.ProtectedModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
