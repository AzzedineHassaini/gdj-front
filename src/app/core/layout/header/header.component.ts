import {Component, computed, effect, inject, signal} from '@angular/core';
import {TranslateService } from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../shared/services/auth.service";
import {MenuItem} from "primeng/api";
import {UserRole} from "../../../features/auth/models/auth.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly $auth = inject(AuthService)
  private readonly $translate = inject(TranslateService)

  isConnected = toSignal(this.$auth.isConnected$)
  role = toSignal(this.$auth.role$)

  menuItems: MenuItem[] = []

  constructor() {

    this.$translate.onLangChange.subscribe(() => {
      this.menuItems = [{
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      },
      {
        label: this.$translate.instant('header.profil'),
        routerLink: '/profil'
      }]
    })

    


    // this.$translate.onLangChange.subscribe(() => {
    //   const isConnected = this.isConnected();
    //   // const role = isConnected ? this.role() : undefined;
    //   this.menuItems = computed( () => {
    //     return [{
    //         label: this.$translate.instant('header.home'),
    //         routerLink: '/home'
    //       },
    //       {
    //         label: this.$translate.instant('header.complaints'),
    //         routerLink: '/complaints',
    //         // visible: role === UserRole.AGENT
    //       },
    //       {
    //         label: this.$translate.instant('header.profil'),
    //         routerLink: '/profil',
    //         visible: isConnected
    //       }]
    //   })
    // })
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
