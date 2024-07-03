import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {TranslateLoader, TranslateModule } from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

function httpTranslationLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
import { AppComponent } from './container/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => httpTranslationLoader(http),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
