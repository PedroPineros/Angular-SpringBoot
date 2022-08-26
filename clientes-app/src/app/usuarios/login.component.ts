import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import Swal from "sweetalert2";
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo:string = "Por favor Sign In!";
  usuario:Usuario;

  constructor(
    private authService: AuthService,
    private router : Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login():void{

    console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login','Username o password estan vacias!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);
      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${response.username}, inicio con extio sesión`, 'success')
    })
  }
}
