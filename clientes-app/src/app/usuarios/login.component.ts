import {Component, OnInit} from '@angular/core';
import {Usuario} from './usuario';
import Swal from "sweetalert2";
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Sign In!";
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login', `Bienvenido ${this.authService.usuario.username}`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {

    console.log(this.usuario)
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password estan vacias!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.router.navigate(['/clientes']);
        Swal.fire('Login', `Hola ${usuario.username}, inicio con exito sesión`, 'success')
      }, error => {
        if (error.status == 400) {
          Swal.fire('Error login', 'Usuario o clave incorrecta!', 'error');
        }
      }
    )
  }
}
