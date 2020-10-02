import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

import { Registro }  from '../../../models/registro';

import { RegistroService } from '../../../services/registro.service';

@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css']
})
export class ListaRegistrosComponent implements OnInit {

RegistroLista: Registro[];

  constructor(
    public toastr: ToastrService,
    public registroServicio: RegistroService) { }

  ngOnInit(){
    return this.registroServicio.getRegistros()
    .snapshotChanges()
    .subscribe(item => {
      this.RegistroLista = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.RegistroLista.push(x as Registro);
      });
    });
  }


onEdit(registro: Registro){
  this.registroServicio.RegSeleccionados = Object.assign({}, registro);
}

onDelete($key: string){
  if (confirm('¿Esta seguro de eliminar el registro?')){
    this.registroServicio.EliminarRegistro($key);
    this.toastr.warning('Registro eliminado');
  }
}


}
