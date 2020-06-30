import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {

    this.cargarStorage();

    // const lista1 = new Lista('Despensa');
    // const lista2 = new Lista('Fruta y Verdura');
    // this.listas.push(lista1, lista2);
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem('listas', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('listas')) {
      this.listas = JSON.parse(localStorage.getItem('listas'));
    }
  }

}
