import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoadingService } from './../../../../services/loading.service';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

    form: FormGroup = new FormGroup({
        codigoCliente: new FormControl(null, [Validators.required]),
        nome: new FormControl(null, [Validators.required]),
        cpf: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        sexo: new FormControl(null, [Validators.required]),
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        public loadingService: LoadingService
    ) { }

    ngOnInit() {}

}
