import { Component } from '@angular/core';
import {CondominioService} from '../../../service/condominio.service';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {CondominioModel} from '../../../models/condominios/condominio.model';

@Component({
  selector: 'app-condominio-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DialogModule, InputTextModule, FormsModule],
  templateUrl: './condominio-list.component.html',
  styleUrl: './condominio-list.component.scss'
})
export class CondominioListComponent {
  condominios: CondominioModel[] = [];
  displayModal: boolean = false;

  // Formulario para nuevo condominio
  newCondominio = {
    nombre: '',
    direccion: ''
  };

  constructor(private condominioService: CondominioService) {
    this.loadCondominios();
  }

  loadCondominios() {
    this.condominioService.getCondominios().subscribe((result: any) => {
      this.condominios = result.data.condominios;
    });
  }

  openNewCondominioModal() {
    this.displayModal = true;
  }

  saveCondominio() {
    this.condominioService
      .registrarCondominio(this.newCondominio.nombre, this.newCondominio.direccion)
      .subscribe((result: any) => {
        this.condominios = [...this.condominios, result.data.registrarCondominio];  // Crear un nuevo array con el nuevo condominio
        this.displayModal = false;
        this.newCondominio = { nombre: '', direccion: '' };  // Resetear el formulario
      });
  }
}
