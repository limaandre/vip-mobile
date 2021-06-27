import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from './../../../../services/loading.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cliente-listar',
    templateUrl: './cliente-listar.component.html',
    styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements OnInit {


    constructor(
        private router: Router,
        private appService: AppService,
        public loadingService: LoadingService
    ) { }

    ngOnInit() {

    }

}
