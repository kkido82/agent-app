import { IKeyPress } from './../../models/keyPress';
import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit, AfterViewInit {
  token: string;

  constructor(private route: ActivatedRoute,
              private socketio: SocketioService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('id');

    if (this.token) {
      this.socketio.setupSocketConnection(this.token);
    }
  }

  ngAfterViewInit() {
    this.socketio.socket.on('scroll', (top: number) => {
      window.scrollTo({top});
    });

    this.socketio.socket.on('keypress', (payload: IKeyPress) => {
      const element = document.getElementById(payload.id) as HTMLInputElement;
      element.value += payload.key;
    });
  }

  @HostListener('document:keypress', ['$event'])
  keypress(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const payload: IKeyPress = {
      id: target.id,
      key: e.key
    };

    this.socketio.socket.emit('keypress', payload);
  }


  @HostListener('document:scroll', ['$event'])
  scroll(e: any) {
    const top = e.srcElement.scrollingElement.scrollTop;

    setTimeout(() => {
      this.socketio.socket.emit('scroll', top);
    }, 200);
  }
}
