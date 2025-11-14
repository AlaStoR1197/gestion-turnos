import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema de Turnos';
  nuevoTurno = {
    nombre: '',
    tramite: '',
    prioridad: ''
  };
  turnos: any[] = [];
  turnoActual: any = null;

  constructor(private http: HttpClient) {
    this.obtenerTurnos();
  }

  agregarTurno() {
    this.http.post('http://localhost:3000/turnos', this.nuevoTurno)
      .subscribe({
        next: (response: any) => {
          this.nuevoTurno = { nombre: '', tramite: '', prioridad: '' };
          this.obtenerTurnos(); // Actualizar la lista
          console.log('Turno agregado:', response);
        },
        error: (error) => {
          console.error('Error al agregar turno:', error);
        }
      });
  }

  atenderSiguiente() {
    this.http.get('http://localhost:3000/turnos/siguiente')
      .subscribe({
        next: (response: any) => {
          this.turnoActual = response;
          // Obtener la lista actualizada de turnos del backend
          this.obtenerTurnos();
          console.log('Turno actual:', response);
        },
        error: (error) => {
          console.error('Error al atender turno:', error);
        }
      });
  }

  // Método para obtener todos los turnos del backend
  obtenerTurnos() {
    this.http.get('http://localhost:3000/turnos')
      .subscribe({
        next: (response: any) => {
          this.turnos = response;
        },
        error: (error) => {
          console.error('Error al obtener turnos:', error);
        }
      });
  }
}