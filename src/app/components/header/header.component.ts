import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() textoHeader: string;
    @Input() redirect: string;

    constructor(
    ) {}

    ngOnInit() {}
}
