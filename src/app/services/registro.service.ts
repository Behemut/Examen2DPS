import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  //Exportar los datos desde Firebase
  ListaRegistro: AngularFireList<any>;

  //Una variable temporal para guardar los datos seleccionados
  RegSeleccionados: Registro = new Registro();



  constructor(private firebase: AngularFireDatabase) { }

  //Select de la base de datos
  getRegistros(){
    return this.ListaRegistro = this.firebase.list('registros');
  }

insertarRegistro(registro: Registro){
  this.ListaRegistro.push({
nombre: registro.nombre,
dui: registro.dui,
vehiculo: registro.vehiculo,
costo_reparacion: registro.costo_reparacion
  });
}
updateRegistro(registro: Registro){
  this.ListaRegistro.update(registro.$key, {
    nombre: registro.nombre,
    dui: registro.dui,
    vehiculo: registro.vehiculo,
    costo_reparacion: registro.costo_reparacion
      });
}

EliminarRegistro($key: string){
  this.ListaRegistro.remove($key);
}



}
