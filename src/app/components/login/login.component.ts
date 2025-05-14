import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Asegúrate de agregar esto
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  //Cuentas de Usuario
  admins = [
    { username: 'qwe', password: '123', name: 'Admin One' },
    { username: 'lupi', password: '123', name: 'Admin Two' },
    { username: 'jose', password: '123', name: 'Admin Three' }
  ];
  constructor(private router: Router) {}  // Inyectamos Router

  login() {
    const admin = this.admins.find(
      admin => admin.username === this.username && admin.password === this.password
    );

    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
      this.router.navigate(['/habitaciones']);  // Redirigir a la página de habitaciones
    } 
  
    else if (this.username === 'admin' && this.password === '1') {
      localStorage.setItem('isAdmin', 'true');  // Guardar en localStorage para verificar después
      this.router.navigate(['/admin']);  // Redirigir al panel de admin
    } else {
      this.errorMessage = 'Credenciales Incorrectas';
    }
  }
}