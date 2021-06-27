import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    goPage(page) {
        this.router.navigate([page]);
    }

}
