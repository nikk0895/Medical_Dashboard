import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,  // Make sure this is added
    // ...other imports...
  ],
})
export class AppModule {}