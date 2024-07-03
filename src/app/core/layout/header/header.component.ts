import {Component, effect, inject, signal} from '@angular/core';
import {TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly $translate = inject(TranslateService)

  menuItems = [
    {
      label: 'home',
      routerLink: '/home'
    }
  ]

  selectedOption = signal<'fr' | 'en'>('fr')

  dropdownOptions = [
    'en',
    'fr'
  ]

  selectEffect = effect(() => {
    const selected = this.selectedOption()
      this.$translate.use(selected)
    })

}
