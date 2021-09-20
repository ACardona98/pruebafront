import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  usuarios!:Usuario[];
  ordenDesc:boolean = false;

  constructor(private service:ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.Listar(this.ordenDesc);
  }
  Editar(usuario:Usuario){
    localStorage.setItem("idUsuario", usuario.idUsuario.toString());
    this.router.navigate(["editar"]);
  }
  Eliminar(usuario:Usuario){
    if(confirm("¿Desea eliminar el usuario con cédula "+usuario.cedula+"?")){
      this.service.deleteUsuario(usuario.idUsuario).subscribe(data => {
        alert(data.respuesta);
        window.location.reload();
      });
    }
  }
  Listar(ordenDesc:boolean){
    this.service.getUsuarios(ordenDesc ? 1 : 0).subscribe(data => {
      this.usuarios = data;
    });
  }
}