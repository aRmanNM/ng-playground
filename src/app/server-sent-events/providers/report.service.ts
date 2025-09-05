import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportItem } from '../interfaces/report-item';

@Injectable()
export class ReportService {
  private _eventSource: EventSource | null = null;

  private readonly _report = new Subject<ReportItem | string>();
  readonly report$ = this._report.asObservable();

  constructor() {}

  getReport() {
    this._eventSource = new EventSource('/api/report');

    this._eventSource.onerror = (error) => {
      this.close();
      this._report.next('closed');
    };

    this._eventSource.onmessage = (event) => {
      this._report.next(JSON.parse(event.data));
    };
  }

  close(): void {
    if (this._eventSource == null) {
      return;
    }
    this._eventSource.close();
    this._eventSource = null;
  }
}
