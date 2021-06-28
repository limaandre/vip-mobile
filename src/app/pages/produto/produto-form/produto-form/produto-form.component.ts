import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

    fabricacaoSelect = [
        'Nacional',
        'Importado'
    ];

    form: FormGroup = new FormGroup({
        codigoProduto: new FormControl(null, [Validators.required]),
        nome: new FormControl(null, [Validators.required]),
        fabricacao: new FormControl(null, [Validators.required]),
        tamanho: new FormControl(null, [Validators.required]),
        valor: new FormControl(null, [Validators.required]),
    });

    get codigoProduto() { return this.form.get('codigoProduto'); }
    get nome() { return this.form.get('nome'); }
    get fabricacao() { return this.form.get('fabricacao'); }
    get tamanho() { return this.form.get('tamanho'); }
    get valor() { return this.form.get('valor'); }

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private alertController: AlertController
    ) { }

    ngOnInit() {
    }

    castFabricacao(valor) {
        valor = valor.toLowerCase();
        switch (valor) {
            case 'n':
                return 'Nacional';
            case 'i':
                return 'Importado';
            default:
                return '';
        }
    }

    ionViewWillEnter() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.appService.produto({ id }, 'get').subscribe(async (response: any) => {
                if (response.status && response.data) {
                    const data = response.data;
                    this.form.get('codigoProduto').setValue(data.codigoProduto);
                    this.form.get('nome').setValue(data.nome);
                    this.form.get('fabricacao').setValue(this.castFabricacao(data.fabricacao));
                    this.form.get('tamanho').setValue(data.tamanho);
                    this.form.get('valor').setValue(data.valor);
                }
            });
        }
    }


    async submit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }

        const values = this.form.value;
        let typeHttp = 'post';
        if (id) {
            typeHttp = 'put';
        }
        values.id = id;
        values.valor = values.valor.replace('.', '').replace(',', '.');
        values.valor = parseFloat(values.valor);
        values.fabricacao = values.fabricacao.charAt(0).toLowerCase();
        this.appService.produto(values, typeHttp).subscribe(async (response: any) => {
            if (response.status) {
                const alert = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: '',
                    message: 'Produto salvo com sucesso',
                    buttons: [
                        {
                            text: 'Entendido',
                            cssClass: 'primary',
                            handler: async (e) => {
                                this.router.navigate(['produto-listar']);
                            }
                        }
                    ]
                });
                await alert.present();
            }
        });
    }
}
