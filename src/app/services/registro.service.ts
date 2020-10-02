import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Registro } from '../models/registro';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  //Exportar los datos desde Firebase
  ListaClientes: AngularFireList<any>;
  ListaTickets: AngularFireList<any>;

  //Una variable temporal para guardar los datos seleccionados
  RegSeleccionados: Registro = new Registro();

  constructor(
    private firebase: AngularFireDatabase,
    private firestore: AngularFirestore

    ) { }


  //Select de la base de datos
  getRegistros(){
    //Nombre con la que se guardara en Firebase Database
    return this.ListaClientes = this.firebase.list('clientes');

    return this.ListaTickets = this.firebase.list('tickets');
  }

insertarRegistro(registro: Registro){
  this.ListaClientes.push({
nombre: registro.nombre,
dui: registro.dui,
vehiculo: registro.vehiculo,
costo_reparacion: registro.costo_reparacion
  });

//ListaTicket.push()  Arrastraremos del Form todos los campos pero internamente los separaremos uno para tickets sera el historial y otro para registrar al cliente
}


updateRegistro(registro: Registro){
  this.ListaClientes.update(registro.$key, {
    nombre: registro.nombre,
    dui: registro.dui,
    vehiculo: registro.vehiculo,
    costo_reparacion: registro.costo_reparacion
      });
}

EliminarRegistro($key: string){
  this.ListaClientes.remove($key);
}



}
