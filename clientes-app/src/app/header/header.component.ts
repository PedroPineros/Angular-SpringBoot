import {Component, OnInit} from '@angular/core';
import {AuthService} from "../usuarios/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = "Angular&Spring";

  constructor(public authService: AuthService, private router : Router ) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    Swal.fire('LogOut', `Hola ${this.authService.usuario.username} cerrro sesion con exito`, 'success');
    this.authService.logout();
        this.router.navigate(['/login']);
  }

}
