import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetalleHabitacionComponent } from './components/detalle-habitacion/detalle-habitacion.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'habitaciones/:id', component: DetalleHabitacionComponent }, // Ruta para detalles de la habitación

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
