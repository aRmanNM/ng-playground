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
    path: 'sse',
    loadChildren: () =>
      import('./server-sent-events/sse.module').then((m) => m.SSEModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
