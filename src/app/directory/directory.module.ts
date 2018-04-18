import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../material.module';
import { CustomsPipesModule } from '../customs-pipes/customs-pipes.module';
import { TranslateService } from '@ngx-translate/core';
//translation
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { OrderModule } from 'ngx-order-pipe';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
import { ContactAddComponent } from './contact-add/contact-add.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomsPipesModule,
    HttpClientModule,
    CommonModule,
    OrderModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  declarations: [DirectoryComponent, ContactAddComponent]
})
export class DirectoryModule {}
