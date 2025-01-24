import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomNotificationService {
  private roomCreatedSubject = new Subject<void>(); // Usamos un Subject vacío

  // Observable para suscribirse
  roomCreated$ = this.roomCreatedSubject.asObservable();

  // Método para notificar a los suscriptores
  notifyRoomCreated() {
    this.roomCreatedSubject.next();
  }
}
