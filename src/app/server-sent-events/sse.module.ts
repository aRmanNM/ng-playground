import { NgModule } from '@angular/core';

import { SSEComponent } from './sse.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReportService } from './providers/report.service';

export const routes: Routes = [{ path: '', component: SSEComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, CommonModule],
  exports: [],
  declarations: [SSEComponent],
  providers: [ReportService],
})
export class SSEModule {}
