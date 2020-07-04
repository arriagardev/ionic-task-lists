import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = false;

  constructor(public deseos: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista(lista: Lista) {
    this.deseos.borrarLista(lista);
  }

  async editarNombre(lista: Lista) {

    const alert = await this.alertCtrl.create({
      header: 'Modificar Nombre',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Modificar',
          handler: (data) => {
            console.log(data);
            if (!data.titulo.length) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseos.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();

  }

}
