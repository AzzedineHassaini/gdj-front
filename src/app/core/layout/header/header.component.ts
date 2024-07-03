import {Component, effect, inject, signal} from '@angular/core';
import {TranslateService } from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../shared/services/auth.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly $auth = inject(AuthService)
  private readonly $translate = inject(TranslateService)

  isConnected = toSignal(this.$auth.isConnected$)

  menuItems : MenuItem[] = []

  constructor() {

    this.$translate.onLangChange.subscribe(() => {
      this.menuItems = [{
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      }]
    })
  }

  selectedOption = signal<'fr' | 'en'>('fr')

  dropdownOptions = [
    'en',
    'fr'
  ]

  handleLogout(): void {
    this.$auth.logout()
  }

  selectEffect = effect(() => {
    const selected = this.selectedOption()
    this.$translate.use(selected)
  })

}
