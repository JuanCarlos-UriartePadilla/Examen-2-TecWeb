import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Asegúrate de que el servicio sea proporcionado globalmente
})
export class HabitacionesService {
  private habitaciones = [
    { id: 1, tipo: 'Individual', descripcion: 'Ideal para una sola persona.', precio: 100 },
    { id: 2, tipo: 'Doble', descripcion: 'Para dos personas con camas individuales.', precio: 150 },
    { id: 3, tipo: 'Suite', descripcion: 'Una suite de lujo con sala y baño privado.', precio: 250 },
    { id: 4, tipo: 'Familiar', descripcion: 'Habitación espaciosa para familias de hasta 4 personas.', precio: 200 }
  ];

  constructor() {}

  getHabitaciones() {
    return this.habitaciones;
  }
}
