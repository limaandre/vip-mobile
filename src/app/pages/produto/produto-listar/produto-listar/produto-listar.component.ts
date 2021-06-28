import { Component, OnInit } from '@angular/core';
import { LoadingService } from './../../../../services/loading.service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto.interface';
import { ModalController } from '@ionic/angular';
import { ListaDetalhesComponent } from './../../../../components/lista-detalhes/lista-detalhes.component';

@Component({
    selector: 'app-produto-listar',
    templateUrl: './produto-listar.component.html',
    styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent implements OnInit {

    produtos: Array<Produto> = [];
    filtroSearchBar = null;

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
        this.produtos = this.produtos.map(produto => {
            produto.show = true;
            const dados = JSON.stringify(produto).toLowerCase();
            if (e && !dados.includes(e.detail.value)) {
                produto.show = false;
            }

            if (e?.detail?.value) {
                this.filtroSearchBar = e;
            }
            return produto;
        });
    }

    search() {
        this.appService.produto(null, 'get').subscribe(async (response: any) => {
            if (response.status) {
                response.data = this.addShow(response.data);
                this.produtos = response.data;
                if (this.filtroSearchBar) {
                    this.onChange(this.filtroSearchBar);
                }
            }
        });
    }

    addShow(produtos) {
        return produtos.map(produto => {
            produto.show = true;
            return produto;
        });
    }

    async openData(dataList: Produto) {
        const campos = [
            { cod: 'codigoProduto', desc: 'Código', icon: 'barcode-outline' },
            { cod: 'nome', desc: 'Nome', icon: 'cube-outline' },
            { cod: 'valor', desc: 'Valor', icon: 'cash-outline' },
            { cod: 'tamanho', desc: 'Tamanho', icon: 'code-outline' },
            { cod: 'fabricacao', desc: 'Fabricação', icon: 'construct-outline' },
        ];
        const editRoute = 'produto-form/';
        const tipo = 'produto';
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
        this.router.navigate(['produto-form']);
    }

}
