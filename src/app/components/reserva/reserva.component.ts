/*import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Asegúrate de agregar esto
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  nombre: string = '';
  fechaIngreso: string = '';
  fechaSalida: string = '';
  habitacion: string = '';
  servicios: string[] = [];  // Array para almacenar los servicios seleccionados
  mensaje: string = '';
  precioFinal: number = 0;  // Para mostrar el precio final
  numDias: number = 0;  // Para almacenar el número de días

  // Definimos las habitaciones con su disponibilidad
  habitacionesDisponibles: { [key: string]: number } = {
    'Individual': 8,
    'Doble': 10,
    'Suite': 6,
    'Familiar': 3
  };

  habitaciones: string[] = ['Individual', 'Doble', 'Suite', 'Familiar'];

  // Precios base de las habitaciones
  preciosHabitaciones: { [key: string]: number } = {
    'Individual': 100,
    'Doble': 150,
    'Suite': 250,
    'Familiar': 200
  };

  // Precios adicionales de los servicios
  preciosServicios: { [key: string]: number } = {
    'Spa': 50,
    'Desayuno': 30,
    'Transporte': 40
  };

  // Lógica para calcular el precio final
  calcularPrecio() {
    let precioHabitacion = this.preciosHabitaciones[this.habitacion] || 0;

    // Calculamos el precio total de los servicios seleccionados
    let precioServicios = this.servicios.reduce((total, servicio) => {
      return total + (this.preciosServicios[servicio] || 0);
    }, 0);

    // Calculamos el número de días entre las fechas de ingreso y salida
    const fechaIngreso = new Date(this.fechaIngreso);
    const fechaSalida = new Date(this.fechaSalida);
    const diffTime = Math.abs(fechaSalida.getTime() - fechaIngreso.getTime());
    this.numDias = Math.ceil(diffTime / (1000 * 3600 * 24)); // Convertir milisegundos a días

    // Calculamos el precio final multiplicando por los días
    this.precioFinal = (precioHabitacion * this.numDias) + precioServicios;
  }

  // Lógica de reserva
  submit() {
    if (this.nombre && this.fechaIngreso && this.fechaSalida && this.habitacion) {
      // Comprobar si hay habitaciones disponibles
      if (this.habitacionesDisponibles[this.habitacion] > 0) {
        // Restar una habitación disponible
        this.habitacionesDisponibles[this.habitacion]--;

        // Guardamos la reserva en localStorage
        const reserva = {
          nombre: this.nombre,
          fechaIngreso: this.fechaIngreso,
          fechaSalida: this.fechaSalida,
          habitacion: this.habitacion,
          servicios: this.servicios,
          precioFinal: this.precioFinal,
          numDias: this.numDias
        };

        let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        this.mensaje = `Reserva realizada con éxito. Precio final: $${this.precioFinal}`;
        console.log(reserva);
      } else {
        this.mensaje = 'Lo siento, no hay habitaciones disponibles para el tipo seleccionado.';
      }
    } else {
      this.mensaje = 'Por favor, complete todos los campos';
    }
  }

  constructor(private router: Router) {}

  irAHabitaciones() {
    this.router.navigate(['/habitaciones']);
  }
}*/



import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Asegúrate de agregar esto
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  nombre: string = '';
  fechaIngreso: string = '';
  fechaSalida: string = '';
  // Precios base de habitación (por día) según tipo
  roomPrice: number = 100; // precio base por defecto
  services = { spa: false, breakfast: false, transport: false };
  confirmationMessage: string = '';
  minDate: string = new Date().toISOString().split('T')[0]; // Fecha actual


  esAdmin = true;  // activa esta lógica según sea necesario

tiposHabitacion = ['Individual', 'Doble', 'Suite', 'Familiar'];

totalHabitaciones = {
  'Individual': 8,
  'Doble': 10,
  'Suite': 6,
  'Familiar': 3
};

habitacionesOcupadas: { [key: string]: number } = {};

ngOnInit() {
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  for (const reserva of reservas) {
    const tipo = reserva.habitacion;
    if (tipo) {
      this.habitacionesOcupadas[tipo] = (this.habitacionesOcupadas[tipo] || 0) + 1;
    }
  }
}


  reservar() {
  // Verifica si los campos nombre y las fechas de entrada/salida son válidos
  if (!this.nombre || !this.fechaIngreso || !this.fechaSalida) {
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos correctamente.'
    });
    return; // Si falta algún campo, no guarda la reserva
  }

  // Verifica si las fechas son correctas (si la fecha de salida es posterior a la de ingreso)
  const fechaIngreso = new Date(this.fechaIngreso);
  const fechaSalida = new Date(this.fechaSalida);

  if (fechaSalida <= fechaIngreso) {
    Swal.fire({
      icon: 'error',
      title: 'Fecha de salida inválida',
      text: 'La fecha de salida debe ser posterior a la fecha de ingreso.'
    });
    return; // No guarda si la fecha de salida es anterior o igual a la de ingreso
  }

  // Calcula la diferencia de días entre las fechas
  const diffMs = fechaSalida.getTime() - fechaIngreso.getTime();
  const numeroDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // Convierte milisegundos a días

  let total = this.roomPrice * numeroDias;

  // Sumar los precios de los servicios seleccionados
  if (this.services.spa) total += 50;
  if (this.services.breakfast) total += 20;
  if (this.services.transport) total += 30;

  // Crea el objeto de reserva
  const reserva = {
    nombre: this.nombre,
    fechaIngreso: this.fechaIngreso,
    fechaSalida: this.fechaSalida,
    habitacion: 'Habitación estándar',
    numDias: numeroDias,
    precioFinal: total,
    servicios: {
      spa: this.services.spa,
      breakfast: this.services.breakfast,
      transport: this.services.transport
    }
  };

  // Guardar como arreglo en localStorage
  let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  // Muestra el mensaje de confirmación
  Swal.fire({
    icon: 'success',
    title: 'Reserva realizada con éxito',
    text: `Tu reserva ha sido registrada correctamente. Total a pagar: $${total}.`
  });
  console.log(reserva);
  // Mensaje adicional en la interfaz
  this.confirmationMessage = `Reserva confirmada. Total a pagar: $${total}.`;
}

  /*reservar() {
    // Calcular número de días entre fechas
    const diffMs = (new Date(this.fechaSalida).getTime() - new Date(this.fechaIngreso).getTime());
    const numeroDias = Math.ceil(diffMs / (1000*60*60*24));

    // Calcular precio base * días
    let total = this.roomPrice * numeroDias;

    // Sumar precios de servicios seleccionados
    if (this.services.spa) total += 50;
    if (this.services.breakfast) total += 20;
    if (this.services.transport) total += 30;

    // Mostrar mensaje de confirmación al usuario
    this.confirmationMessage = `Reserva confirmada. Total a pagar: $${total}.`;

    // Guardar reserva en localStorage
    const reserva = {
      nombre: this.nombre,
      fechaIngreso: this.fechaIngreso,
      fechaSalida: this.fechaSalida,
      precioHabitacion: this.roomPrice,
      servicios: {
        spa: this.services.spa,
        desayuno: this.services.breakfast,
        transporte: this.services.transport
      },
      dias: numeroDias,
      precioTotal: total
    };
    localStorage.setItem('reserva', JSON.stringify(reserva));
    console.log(reserva);

  }*/

  constructor(private router: Router) {}

  irAHabitaciones() {
    this.router.navigate(['/habitaciones']);
  }
}