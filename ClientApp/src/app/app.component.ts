import { SocketioService } from './services/socketio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'AgentApp';

  /**
   *
   */
  constructor() {}

  ngOnInit(): void {}
}
