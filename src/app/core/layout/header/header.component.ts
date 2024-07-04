import {Component, effect, inject, signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import {TranslateService } from "@ngx-translate/core";
import {MenuItem} from "primeng/api";
import { ThemeService } from '../../services/theme.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


  menuItems: MenuItem[] = []

  constructor(
    private readonly $translate: TranslateService,
    private readonly $theme: ThemeService,
  ) {

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

  openProfil(){
    RouterLink: '/profil'
  }

  toggleDark(){
    this.$theme.toggleDarkTheme()
  }

  currentIcon = "pi pi-sun";
  newIcon ="pi pi-moon";

  toggleIcon(){
    this.currentIcon = this.currentIcon === "pi pi-sun" ? this.newIcon : "pi pi-sun";
  }

}
