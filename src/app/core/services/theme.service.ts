import { Injectable } from "@angular/core";

@Injectable()
export class ThemeService {



    toggleDarkTheme(){
        const themeLink = document.getElementById("app-theme") as HTMLLinkElement
        const currentTheme = themeLink?.href;        

        if( currentTheme ){
            themeLink.href = currentTheme.includes("dark.css") ? "/light.css" : "/dark.css";
        }
    }

}