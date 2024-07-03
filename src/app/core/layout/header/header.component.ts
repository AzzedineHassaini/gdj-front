import {Component, effect, inject, signal} from '@angular/core';
import {TranslateService } from "@ngx-translate/core";
import {MenuItem} from "primeng/api";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private readonly $translate = inject(TranslateService)

  menuItems: MenuItem[] = []

  constructor() {

    this.$translate.onLangChange.subscribe(() => {
      this.menuItems = [{
        label: this.$translate.instant('header.home'),
        routerLink : '/home'
        },
        {
         label: this.$translate.instant('header.complaints'),
          routerLink : '/complaints'
        },
        {
         label: this.$translate.instant('header.profil'),
          routerLink : '/profil'
         },
        ]
    })
  }

  selectedOption = signal<'fr' | 'en'>('fr')

  dropdownOptions = [
    'en',
    'fr'
  ]

  selectEffect = effect(() => {
    const selected = this.selectedOption()
      this.$translate.use(selected)
    })

  displayModal: boolean = false;

  showModal() {
    this.displayModal = true;
  }

}


