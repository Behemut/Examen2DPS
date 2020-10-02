import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

import { Registro }  from '../../../models/registro';
import { Ticket } from '../../../models/ticket';

import { RegistroService } from '../../../services/registro.service';

@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css']
})
export class ListaRegistrosComponent implements OnInit {

RegistroLista: Registro[];
TicketLista: Registro[];

  constructor(
    public toastr: ToastrService,
    public registroServicio: RegistroService) { }

  ngOnInit(){
    return this.registroServicio.getRegistros().snapshotChanges().subscribe(item => {
      this.RegistroLista = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.RegistroLista.push(x as Registro);
      });

        console.log(this.RegistroLista[0].nombre);

    });

  }

  /*for (let numero of miarray){
  console.log(numero);
}*/

  MostrarHistorial(){
    return this.registroServicio.getTickets().snapshotChanges().subscribe(item => {
      this.TicketLista = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.TicketLista.push(x as Registro);
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
