import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
    selector: 'app-lista-detalhes',
    templateUrl: './lista-detalhes.component.html',
    styleUrls: ['./lista-detalhes.component.scss'],
})
export class ListaDetalhesComponent implements OnInit {

    @Input() dataList: any;
    @Input() tipo: any;
    @Input() editRoute: any;
    @Input() campos: any;
    @Input() textoHeader: any;

    constructor(
        private router: Router,
        private alertController: AlertController,
        private modalController: ModalController,
        private appService: AppService
    ) { }

    ngOnInit() {}

    dismissModal() {
        this.modalController.dismiss();
    }

    editData() {
        console.log(this.dataList);
        this.dismissModal();
        this.router.navigate([this.editRoute + this.dataList.id]);
    }

    validaSexo(sexo) {
        sexo = sexo.toLowerCase();
        switch (sexo) {
            case 'm':
                return 'Masculino';
            case 'f':
                return 'Feminino';
            case 'o':
                return 'Outros';
            default:
                return '';
        }
    }

    async removeData() {
        const alert = await this.alertController.create({
            header: 'Atenção',
            message: `Você deseja remover esse ${this.tipo}?`,
            buttons: [
                {
                    text: 'Cancelar',
                    handler: async (e) => { }
                },
                {
                    text: 'Confirmar',
                    handler: async (e) => {
                        this.executaRemocao();
                    }
                },
            ]
        });
        await alert.present();
    }

    async executaRemocao() {
        this.appService[this.tipo](this.dataList, 'delete').subscribe(async (response: any) => {
            if (response.status) {
                const alert = await this.alertController.create({
                    header: '',
                    message: `${this.tipo} removido com sucesso`,
                    buttons: [
                        {
                            text: 'Entendido',
                            cssClass: 'primary',
                            handler: async (e) => {
                                this.dismissModal();
                            }
                        }
                    ]
                });
                await alert.present();
            }
        });

    }
}
