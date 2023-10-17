// wrapped-socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WrappedSocket {
  constructor(private socket: Socket) {}

  // Define methods for interacting with the WebSocket
  connect(): void {
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void): void {
    this.socket.fromEvent(event).subscribe(callback);
  }
}
