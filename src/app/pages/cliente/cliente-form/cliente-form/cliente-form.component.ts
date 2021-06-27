import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

    sexoSelect = [
        'Masculino',
        'Feminino',
        'Outros',
    ];

    form: FormGroup = new FormGroup({
        codigoCliente: new FormControl(null, [Validators.required]),
        nome: new FormControl(null, [Validators.required]),
        cpf: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(14)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        sexo: new FormControl(null, [Validators.required]),
    });

    get codigoCliente() { return this.form.get('codigoCliente'); }
    get nome() { return this.form.get('nome'); }
    get cpf() { return this.form.get('cpf'); }
    get email() { return this.form.get('email'); }
    get sexo() { return this.form.get('sexo'); }

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private alertController: AlertController
    ) { }

    ngOnInit() {
    }

    castSexo(sexo) {
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

    ionViewWillEnter() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.appService.cliente({ id }, 'get').subscribe(async (response: any) => {
                if (response.status && response.data) {
                    const data = response.data;
                    this.form.get('codigoCliente').setValue(data.codigoCliente);
                    this.form.get('nome').setValue(data.nome);
                    this.form.get('cpf').setValue(data.CPF);
                    this.form.get('email').setValue(data.email);
                    this.form.get('sexo').setValue(this.castSexo(data.sexo));
                    this.cpfMask();
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
        values.sexo = values.sexo.charAt(0).toLowerCase();
        this.appService.cliente(values, typeHttp).subscribe(async (response: any) => {
            if (response.status) {
                const alert = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: '',
                    message: 'Cliente salvo com sucesso',
                    buttons: [
                        {
                            text: 'Entendido',
                            cssClass: 'primary',
                            handler: async (e) => {
                                this.router.navigate(['cliente-listar']);
                            }
                        }
                    ]
                });
                await alert.present();
            }
        });
    }

    cpfMask() {
        let cpf = this.form.get('cpf').value + '';
        if (cpf) {
            cpf = cpf.replace(/\D/g, '');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            this.form.get('cpf').setValue(cpf);
        }
    }
}
