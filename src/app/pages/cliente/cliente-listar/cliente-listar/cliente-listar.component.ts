import { ListaDetalhesComponent } from './../../../../components/lista-detalhes/lista-detalhes.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from './../../../../services/loading.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-cliente-listar',
    templateUrl: './cliente-listar.component.html',
    styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements OnInit {

    clientes: Array<Cliente> = [];

    constructor(
        private router: Router,
        private modalController: ModalController,
        private appService: AppService,
        private loadingService: LoadingService
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.search();
    }

    onClear(e) {
        this.filterData(null);
    }

    onChange(e) {
        this.filterData(e);
    }

    filterData(e) {
        this.clientes = this.clientes.map(cliente => {
            cliente.show = true;
            const dados = JSON.stringify(cliente);
            if (e && !dados.includes(e.detail.value)) {
                cliente.show = false;
            }
            return cliente;
        });
    }

    search() {
        this.appService.cliente(null, 'get').subscribe(async (response: any) => {
            if (response.status) {
                response.data = this.addShow(response.data);
                this.clientes = response.data;
            }
        });
    }

    addShow(clientes) {
        return clientes.map(cliente => {
            cliente.show = true;
            return cliente;
        });
    }

    async openData(dataList) {
        const campos = [
            { cod: 'codigoCliente', desc: 'Código', icon: 'barcode-outline' },
            { cod: 'nome', desc: 'Nome', icon: 'person-outline' },
            { cod: 'CPF', desc: 'CPF', icon: 'wallet-outline' },
            { cod: 'email', desc: 'E-mail', icon: 'mail-outline' },
            { cod: 'sexo', desc: 'Sexo', icon: 'transgender-outline' },
        ];
        const editRoute = 'cliente-form/';
        const tipo = 'cliente';
        const modal = await this.modalController.create({
            component: ListaDetalhesComponent,
            componentProps: { dataList, campos, editRoute, tipo }
        });
        await modal.present();
        modal.onDidDismiss()
            .then((data) => {
                this.search();
            });
    }

    newData() {
        this.router.navigate(['cliente-form']);
    }

}
