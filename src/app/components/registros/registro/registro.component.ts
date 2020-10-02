import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { Registro }  from '../../../models/registro';

import { RegistroService } from '../../../services/registro.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    public toastr: ToastrService,
    public registroServicio: RegistroService
    ){ }


  ngOnInit() {
    this.registroServicio.getRegistros();
    this.resetForm();
  }

  onSubmit(registroForm: NgForm){
    if(registroForm.value.$key == null)
    this.registroServicio.insertarRegistro(registroForm.value);
    else
      this.registroServicio.updateRegistro(registroForm.value);

    this.toastr.success('Operación realizada', 'Registro añadido');
    this.resetForm(registroForm);

  }


  resetForm(registroForm?: NgForm){
if (registroForm != null)
  registroForm.reset();
this.registroServicio.RegSeleccionados = new Registro();
  }


}
