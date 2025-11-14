import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
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

  constructor(private http: HttpClient) {}

  agregarTurno() {
    this.http.post('http://localhost:3000/turnos', this.nuevoTurno)
      .subscribe({
        next: (response: any) => {
          this.turnos.push(response);
          this.nuevoTurno = { nombre: '', tramite: '', prioridad: '' };
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
          // Actualizar la lista de turnos
          this.turnos = this.turnos.filter(t => t.id !== response.id);
          console.log('Turno actual:', response);
        },
        error: (error) => {
          console.error('Error al atender turno:', error);
        }
      });
  }
}