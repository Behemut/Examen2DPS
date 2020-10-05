import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Input } from '@angular/core';
import { Registro }  from '../../../models/registro';
import { RegistroService } from '../../../services/registro.service';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css']
})
export class ListaRegistrosComponent implements OnInit {

  @Input() item_busqueda :any;
  @Input() item_ticket :any;
  public show_ticket:boolean=false;
  public show_clientes:boolean=false;
//Estos son Arrays
RegistroLista: Registro[];
TicketLista: Registro[];

  constructor(
    public toastr: ToastrService,
    public registroServicio: RegistroService) { }


    //Llenado general de las Listas Arrays para tickets y clientes
  ngOnInit(){
   return this.registroServicio.getRegistros().snapshotChanges().subscribe(item => {
      this.RegistroLista = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.RegistroLista.push(x as Registro);
      } );
      //Filtrado del array principal y se hara un push para el final
  this.MostrarHistorial();
    });
  }

  /*for (let numero of miarray){
  console.log(numero);      this.RegistroLista.filter((v,i,a)=>a.findIndex(t=>(t.nombre === v.nombre && t.dui===v.dui))===i)
}*/
BuscarClientes(busqueda: string) {
  if(busqueda==null || busqueda==='')  //Si esta vacio mostrara los campos en general pero sin repetir
     return this.RegistroLista.filter((v,i,a)=>a.findIndex(t=>(t.vehiculo === v.vehiculo && t.dui===v.dui))===i);
  else  //Si se ha escrito en el campo mostrara el usuario que busca
     return this.RegistroLista.filter((item) => item.nombre===busqueda).filter((v,i,a)=>a.findIndex(t=>(t.vehiculo === v.vehiculo && t.dui===v.dui))===i);
}

BuscarTicket(busqueda: string) {
  if(busqueda==null || busqueda==='')  //Si esta vacio mostrara los campos en general pero sin repetir
    return this.TicketLista;
  else  //Si se ha escrito en el campo mostrara el usuario que busca
  return this.TicketLista.filter((item) => item.dui===busqueda);
}

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

//Toggle para mostrar formulario o ocultar formulario
toggle_tickets(){
  this.show_ticket=!this.show_ticket;
}

toggle_clientes(){
  this.show_clientes=!this.show_clientes;
}


onEdit(registro: Registro){
  this.registroServicio.RegSeleccionados = Object.assign({},registro);
}

onDelete($key: string){
  if (confirm('¿Esta seguro de eliminar el registro?')){
    this.registroServicio.EliminarRegistro($key);
    this.toastr.warning('Registro eliminado');
  }
}


//GENERACION DE TXT

fakeValidateUserData($key: string) {
for(var x=0; x< this.TicketLista.length; x++){
    if(this.TicketLista[x].$key== $key)
      return of (this.TicketLista[x]);
    }

}

private setting = {
  element: {
    dynamicDownload: null as HTMLElement
  }
}

dynamicDownloadTxt($key: string) {
  this.fakeValidateUserData($key).subscribe((res) => {
    //FORMATO DE IMPRESION
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Ticket-Venta' + $key,
      text: "FACTURA DE TALLER \n" +
      "Nombre de cliente: " +res.nombre + "\n" +
      "Vehiculo: " +res.vehiculo + "\n" +
      "Monto Total: " + '$' +res.costo_reparacion + "\n"

    });
  });

}

private dyanmicDownloadByHtmlTag(arg: {fileName: string,text: string}) {
  if (!this.setting.element.dynamicDownload) {
    this.setting.element.dynamicDownload = document.createElement('a');
  }
  const element = this.setting.element.dynamicDownload;
  const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
  element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
  element.setAttribute('download', arg.fileName);

  var event = new MouseEvent("click");
  element.dispatchEvent(event);
}



}
