import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule para ngFor
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],  // Importar CommonModule para ngFor
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  reservas: any[] = [];
  mensaje: string = '';
  errorMessage: string = '';


  tiposHabitacion = ['Individual', 'Doble', 'Suite', 'Familiar'];

totalHabitaciones: { [key: string]: number } = {
  'Individual': 8,
  'Doble': 10,
  'Suite': 6,
  'Familiar': 3
};

habitacionesOcupadas: { [key: string]: number } = {
      'Individual': 0,
    'Doble': 0,
    'Suite': 0,
    'Familiar': 0
  };

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.cargarReservas();
  }
  cargarReservas() {
    const data = localStorage.getItem('reservas');
    if (data) {
      this.reservas = JSON.parse(data);
      this.calcularOcupacion();
    }
    this.reservas = data ? JSON.parse(data) : [];
    this.actualizarHabitacionesOcupadas();
  }

  calcularOcupacion() {
    // Reiniciar conteo
    this.habitacionesOcupadas = {
      'Individual': 0,
      'Doble': 0,
      'Suite': 0,
      'Familiar': 0
    };

    for (const reserva of this.reservas) {
      const tipo = reserva.habitacion;
      if (tipo && this.habitacionesOcupadas.hasOwnProperty(tipo)) {
        this.habitacionesOcupadas[tipo]++;
      }
    }
  }
  
  /*cargarReservas() {
    const data = localStorage.getItem('reservas');
    if (data) {
      this.reservas = JSON.parse(data);
    }
    this.habitacionesOcupadas = {}; // Reiniciar conteo
    for (const reserva of this.reservas) {
      const tipo = reserva.habitacion;
      if (tipo) {
        this.habitacionesOcupadas[tipo] = (this.habitacionesOcupadas[tipo] || 0) + 1;
      }
    }

  }*/

  eliminarReserva(index: number) {
    this.reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
    this.mensaje = 'Reserva eliminada correctamente ✅';
    this.cargarReservas();
    setTimeout(() => this.mensaje = '', 3000); // Limpiar mensaje en 3s
  }

  getServiciosActivos(servicios: any): string[] {
  if (!servicios || typeof servicios !== 'object') return [];
  else { console.log("Esta Vacio");       
    this.errorMessage = 'Sin Reservas :(';}
  return Object.entries(servicios)
    .filter(([_, activo]) => activo)
    .map(([nombre, _]) => nombre.charAt(0).toUpperCase() + nombre.slice(1));
  }
 
  logout() {
    this.router.navigate(['/login']);
  }
  irAReservar() {
    this.router.navigate(['/reserva']);
  }
  actualizarHabitacionesOcupadas() {
  // Reiniciar el conteo
  this.habitacionesOcupadas = {
    Individual: 0,
    Doble: 0,
    Suite: 0,
    Familiar: 0
  };

  for (let reserva of this.reservas) {
    const tipo = reserva.habitacion;  // debe ser uno de los 4: Individual, Doble, Suite, Familiar
    if (this.habitacionesOcupadas.hasOwnProperty(tipo)) {
      this.habitacionesOcupadas[tipo]++;
    }
  }
}

  /*reservas: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('reservas');
    if (data) {
      this.reservas = JSON.parse(data);
    }
  }

  constructor(private router: Router) {}

  eliminarReserva(index: number) {
    this.reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }*/

  /*reservas: any[] = []; // Para almacenar las reservas
  habitacionesDisponibles: { [key: string]: number } = {
    'Individual': 8,
    'Doble': 10,
    'Suite': 6,
    'Familiar': 3
  };
  
  // Cargar las reservas y las habitaciones desde localStorage
  ngOnInit() {
    this.cargarReservas();
    this.cargarHabitacionesDisponibles();
  }

  // Método para cargar las reservas
  cargarReservas() {
    const reservas = localStorage.getItem('reservas');
    if (reservas) {
      this.reservas = JSON.parse(reservas);
    }
  }

  // Método para cargar las habitaciones disponibles
  cargarHabitacionesDisponibles() {
    const habitaciones = localStorage.getItem('habitacionesDisponibles');
    if (habitaciones) {
      this.habitacionesDisponibles = JSON.parse(habitaciones);
    }
  }

  // Método para ocupar una habitación
  ocuparHabitacion(tipo: string) {
    if (this.habitacionesDisponibles[tipo] > 0) {
      this.habitacionesDisponibles[tipo]--;
      localStorage.setItem('habitacionesDisponibles', JSON.stringify(this.habitacionesDisponibles));
    }
  }

  // Método para liberar una habitación
  liberarHabitacion(tipo: string) {
    if (this.habitacionesDisponibles[tipo] < 10) { // Máximo 10 habitaciones
      this.habitacionesDisponibles[tipo]++;
      localStorage.setItem('habitacionesDisponibles', JSON.stringify(this.habitacionesDisponibles));
    }
  }

  // Función para eliminar una reserva
  eliminarReserva(index: number) {
    this.reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }

  // Función para editar una reserva (agregar lógica de edición aquí)
  editarReserva(index: number) {
    const reserva = this.reservas[index];
    console.log('Editar reserva', reserva);
    // Aquí puedes agregar la lógica para editar la reserva
  }*()*/

  }