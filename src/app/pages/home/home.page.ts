import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    homeMenu;
    constructor() { }

    ngOnInit() {
        this.generateMenu();
    }

    generateMenu() {
        this.homeMenu = [
            { icon: 'assets/img/icons-menu/notes.svg', indexLang: 'HOME.menu.notes', page: 'notes' },
            { icon: 'assets/img/icons-menu/medications.svg', indexLang: 'HOME.menu.medications', page: 'medications' },
            { icon: 'assets/img/icons-menu/disease.svg', indexLang: 'HOME.menu.diseases', page: 'diseases' },
            { icon: 'assets/img/icons-menu/doctor.svg', indexLang: 'HOME.menu.professionals', page: 'professionals' },
            { icon: 'assets/img/icons-menu/exams.svg', indexLang: 'HOME.menu.exams', page: 'exams' },
            { icon: 'assets/img/icons-menu/consults.svg', indexLang: 'HOME.menu.consults', page: 'consults' },
        ];
    }

}
