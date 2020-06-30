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

  crearLista(titulo: string): number {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
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
