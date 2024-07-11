import {Component, effect, EventEmitter, Output, signal} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthService, RegisterRole} from "../../../shared/services/auth.service";
import {MenuItem} from "primeng/api";
import {IAuth, UserRole} from "../../../features/auth/models/auth.model";
import {ThemeService} from '../../services/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {

  anonymousMenu: MenuItem[] = []
  citizenMenu: MenuItem[] = []
  agentMenu: MenuItem[] = []
  lawyerMenu: MenuItem[] = []
  adminMenu: MenuItem[] = []

  menuItems: MenuItem[] = [];

  @Output() messageEvent = new EventEmitter<RegisterRole>();

  selectedOption = signal<'fr' | 'en'>('fr')
  dropdownOptions = ['en','fr']

  currentUser: IAuth | undefined;
  isConnected = toSignal(this.$auth.isConnected$)

  constructor(
    private readonly $auth: AuthService,
    private readonly $translate: TranslateService,
    private readonly $theme: ThemeService,
    private readonly $router: Router,
  ) {

    this.$translate.onLangChange.subscribe(() => {
      this.menuItems = this.getMenu(this.currentUser)
    })

    this.$auth.currentUser$.subscribe((data) => {
        // console.log("CURRENT USER CHANGE")
        // console.log(data)
        this.currentUser = data;
        this.menuItems = this.getMenu(this.currentUser);
      });
  }

  handleLogout(): void {
    this.$auth.logout()
    this.$router.navigate(['home'])
  }

  selectEffect = effect(() => {
    const selected = this.selectedOption()
    this.$translate.use(selected)
  })

  getMenu(currentUser: IAuth | undefined): MenuItem[] {
    if (currentUser) {
      // console.log("connected user, role = " + (currentUser.role));
      // console.log("Comparing with UserRole.AGENT: ", currentUser.role as UserRole === UserRole.AGENT);
      // console.log("UserRole.AGENT value: ", UserRole.AGENT as UserRole);
      switch (currentUser.role){
        case UserRole.ADMIN:
          return this.getAdminMenu()
        case UserRole.AGENT:
          // console.log ("returning agent menu")
          return this.getAgentMenu()
        case UserRole.CITIZEN:
          return this.getCitizenMenu()
        case UserRole.LAWYER:
          return this.getLawyerMenu()
      }
    } else {
      return this.getAnonymousMenu()
    }
  }

  private getAnonymousMenu(): MenuItem[] {
    return [
      {
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      }
    ]
  }

  private getAdminMenu(): MenuItem[] {
    return [
      {
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      },
      {
        label: this.$translate.instant('header.admin.registerAgent'),
        routerLink: '/auth/register/agent'
      },
      {
        label: this.$translate.instant('header.admin.registerAdmin'),
        routerLink: '/auth/register/admin',
      }
    ]
  }

  private getAgentMenu(): MenuItem[] {
    return [
      {
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      },
      {
        label: this.$translate.instant('header.profile'),
        routerLink: '/profile'
      },
      {
        label: this.$translate.instant('header.complaints'),
        routerLink: '/complaints'
      }
    ]
  }

  private getCitizenMenu(): MenuItem[] {
    return [
      {
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      },
      {
        label: this.$translate.instant('header.profile'),
        routerLink: '/profile'
      }
    ]
  }

  private getLawyerMenu(): MenuItem[] {
    return [
      {
        label: this.$translate.instant('header.home'),
        routerLink: '/home'
      },
      {
        label: this.$translate.instant('header.profile'),
        routerLink: '/profile'
      }
    ]
  }

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
