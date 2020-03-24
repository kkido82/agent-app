import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;

  constructor() {}

  setupSocketConnection(token: string): void {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('join', token);

    // this.socket.emit('my message', 'Hello there from the ClientApp.');
    this.socket.on('ready', () => alert('agent is ready!'));


    // this.socket.on('scroll', (top: number) => {
    //   console.log(top);
    // });
  }
}
