import { Component, OnInit } from '@angular/core';
import { LoadingService } from './../../../../services/loading.service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-produto-listar',
    templateUrl: './produto-listar.component.html',
    styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent implements OnInit {


    constructor(
        private router: Router,
        private appService: AppService,
        public loadingService: LoadingService
    ) { }

    ngOnInit() {

    }

}
