import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClient
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  // Importa DomSanitizer

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule,HttpClientModule],  // Asegúrate de agregar esto
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})

export class HabitacionesComponent implements OnInit {
    habitaciones = ['Individual', 'Doble', 'Suite', 'Familiar'];
    carouselImages = ['88963513.jpg', 'Estrategia .png', 'Libro del mes.png']; // Definir las imágenes para el carrusel
  videoUrl: SafeUrl = 'https://www.youtube.com/watch?v=goYNyS1q_V0&list=PLdPfKC8Z7GGwpRc_9WK3EKAYLp-VSmS3B&index=5';  // Variable para almacenar la URL sanitizada del video

    /*habitaciones = [
    { id: 1, tipo: 'Individual', descripcion: 'Ideal para una sola persona.', precio: 100, imagenes: ['assets/individual1.jpg', 'assets/individual2.jpg'] },
    { id: 2, tipo: 'Doble', descripcion: 'Para dos personas con camas individuales.', precio: 150, imagenes: ['assets/dob1.jpg', 'assets/dob2.jpg'] },
    { id: 3, tipo: 'Suite', descripcion: 'Suite de lujo con todas las comodidades.', precio: 250, imagenes: ['assets/suite1.jpg', 'assets/suite2.jpg'] },
    { id: 4, tipo: 'Familiar', descripcion: 'Habitación amplia para toda la familia.', precio: 200, imagenes: ['assets/fam1.jpg', 'assets/familiar2.jpg'] }
  ];¨*/
    // Array de imágenes para el carrusel
  /*carouselImages = [
    'assets/hotel-fondo.jpg',  // Imagen de fondo del hotel
    'assets/individual.jpg',   // Imagen de habitación individual
    'assets/doble.jpg',        // Imagen de habitación doble
    'assets/suite.jpg'         // Imagen de habitación suite
  ];*/

  ngOnInit(): void {
    // Sanitizar la URL del video de YouTube
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/goYNyS1q_V0?list=PLdPfKC8Z7GGwpRc_9WK3EKAYLp-VSmS3B&index=5');
  }

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  verDetalleHabitacion(id: number): void {
    this.router.navigate([`/habitaciones/${id}`]);
     //this.router.navigate(['/detalle-habitacion', id]); // +1 porque las habitaciones tienen ids del 1 al 4
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
