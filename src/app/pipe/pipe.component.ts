import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipe',
    templateUrl: 'pipe.component.html'
})

export class PipeComponent implements OnInit, OnDestroy {
    currentDateTime?: Date;
    interval: any;

    constructor() {
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }

    ngOnInit() {
        this.refresh();
        this.interval = setInterval(() => {
            this.refresh();
        }, 1000);
    }

    refresh() {
        this.currentDateTime = new Date();
    }
}