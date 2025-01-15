import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ReportService } from './providers/report.service';
import { ReportItem } from './interfaces/report-item';

@Component({
  selector: 'app-sse',
  templateUrl: 'sse.component.html',
  styles: [
    `
      table {
        margin: 10px;
        border: 1px solid black;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ],
})
export class SSEComponent implements OnInit, OnDestroy {
  report: any[] = [];
  isWorking: boolean = false;

  constructor(
    private reportService: ReportService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.stop();
  }

  ngOnInit() {
    this.reportService.report$.subscribe((res: ReportItem | string) => {
      if (res == 'closed') {
        console.log(res);
        this.stop();
        this.changeDetection.detectChanges();
      } else {
        this.report.push(res);
        this.changeDetection.detectChanges();
      }
    }); // TODO: handle errors
  }

  getReports() {
    this.report = [];
    this.reportService.getReport();
    this.isWorking = true;
    this.changeDetection.detectChanges();
  }

  stop() {
    this.reportService.close();
    this.isWorking = false;
    this.changeDetection.detectChanges();
  }
}
