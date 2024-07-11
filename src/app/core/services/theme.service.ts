import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';
  private themes = ['light.css', 'dark.css'];

  constructor() {
    this.setTheme(this.getTheme());
  }

  toggleDarkTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light.css' ? 'dark.css' : 'light.css';
    this.setTheme(newTheme);
  }

  private setTheme(theme: string) {
    if (this.themes.includes(theme)) {
      localStorage.setItem(this.themeKey, theme);
      const themeLink = document.getElementById("app-theme") as HTMLLinkElement;
      if (themeLink) {
        themeLink.href = theme;
      }
    }
  }

  private getTheme(): string {
    return localStorage.getItem(this.themeKey) || this.themes[0];
  }
}
