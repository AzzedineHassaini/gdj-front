import { Component } from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss'
})
export class CoreComponent {

  constructor(
    private readonly _message: MessageService
  ) {
    _message.messageObserver.subscribe(console.log)
  }

}
