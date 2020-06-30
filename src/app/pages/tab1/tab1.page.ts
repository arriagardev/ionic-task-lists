import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[];
  constructor(private deseos: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {
    this.listas = deseos.listas;
  }

  async agregarLista() {

    // this.router.navigateByUrl('/tabs/tab1/agregar');

    const alert = await this.alertCtrl.create({
        header: 'Nueva lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text: 'Crear',
            handler: (data) => {
              console.log(data);
              if (!data.titulo.length) {
                return;
              }
              this.deseos.crearLista(data.titulo);
            }
          }
        ]
      });

    await alert.present();

  }

}
