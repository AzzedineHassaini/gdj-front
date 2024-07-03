import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuItems = [
    {
      label: "{{'header.home' | translate}}",
      routerLink: '/home'
    }
  ]

  selectedOption = signal<'fr' | 'en'>('fr')

  dropdownOptions = [
    'en',
    'fr'
  ]

}
