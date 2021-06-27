import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoadingService } from './../../../../services/loading.service';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

    form: FormGroup = new FormGroup({
        codigoProduto: new FormControl(null, [Validators.required]),
        nome: new FormControl(null, [Validators.required]),
        fabricacao: new FormControl(null, [Validators.required]),
        tamanho: new FormControl(null, [Validators.required]),
        valor: new FormControl(null, [Validators.required]),
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        public loadingService: LoadingService
    ) { }

    ngOnInit() {}
}
