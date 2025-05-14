/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-detalle-habitacion',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './detalle-habitacion.component.html',
  styleUrls: ['./detalle-habitacion.component.css']
})

export class DetalleHabitacionComponent implements OnInit {
  habitacion: any;
  imagenes: string[] = [];
  descripcion: string = '';
  precio: number = 0;

  habitaciones = [
    { id: 1, tipo: 'Individual', descripcion: 'Ideal para una sola persona.', precio: 100, imagenes: ['assets/individual1.jpg', 'assets/individual2.jpg'] },
    { id: 2, tipo: 'Doble', descripcion: 'Para dos personas con camas individuales.', precio: 150, imagenes: ['assets/dob1.jpg', 'assets/dob2.jpg'] },
    { id: 3, tipo: 'Suite', descripcion: 'Suite de lujo con todas las comodidades.', precio: 250, imagenes: ['assets/suite1.jpg', 'assets/suite2.jpg'] },
    { id: 4, tipo: 'Familiar', descripcion: 'Habitación amplia para toda la familia.', precio: 200, imagenes: ['assets/fam1.jpg', 'assets/familiar2.jpg'] }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.habitacion = this.habitaciones.find(h => h.id === id);
    if (this.habitacion) {
      this.descripcion = this.habitacion.descripcion;
      this.precio = this.habitacion.precio;
      this.imagenes = this.habitacion.imagenes;
    }
  }

  irAReservar() {
    this.router.navigate(['/reserva']);
  }

  irAHabitaciones() {
    this.router.navigate(['/habitaciones']);
  }
}*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule correctamente

@Component({
  selector: 'app-detalle-habitacion',
  standalone: true,
  imports: [CommonModule],  // Importamos CommonModule correctamente
  templateUrl: './detalle-habitacion.component.html',
  styleUrls: ['./detalle-habitacion.component.css']
})
export class DetalleHabitacionComponent implements OnInit {
  habitacion: any;
  imagenes: string[] = [];
  descripcion: string = '';
  precio: number = 0;

  habitaciones = [
    { id: 1, tipo: 'Individual', descripcion: 'Una habitación pequeña para una persona.', precio: 100, imagenes: ['assets/images/individual1.jpg', 'assets/images/individual2.jpg'] },
    { id: 2, tipo: 'Doble', descripcion: 'Habitación para dos personas, con dos camas individuales.', precio: 150, imagenes: ['assets/images/doble1.jpg', 'assets/images/doble2.jpg'] },
    { id: 3, tipo: 'Suite', descripcion: 'Una suite de lujo con sala y baño privado.', precio: 250, imagenes: ['assets/images/suite1.jpg', 'assets/images/suite2.jpg'] },
    { id: 4, tipo: 'Familiar', descripcion: 'Habitación espaciosa para familias de hasta 4 personas.', precio: 200, imagenes: ['assets/images/familiar1.jpg', 'assets/images/familiar2.jpg'] },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.habitacion = this.habitaciones.find(h => h.id === id);
    if (this.habitacion) {
      this.descripcion = this.habitacion.descripcion;
      this.precio = this.habitacion.precio;
      this.imagenes = this.habitacion.imagenes;
    }
  }

  irAReservar() {
    this.router.navigate(['/reserva']);
  }

  irAHabitaciones() {
    this.router.navigate(['/habitaciones']);
  }
}
