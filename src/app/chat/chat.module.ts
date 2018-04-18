import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
//translation
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CustomMaterialModule } from '../material.module';
import { CustomsPipesModule } from '../customs-pipes/customs-pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatNewconversationComponent } from './chat-newconversation/chat-newconversation.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    CustomMaterialModule,
    CustomsPipesModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  declarations: [ChatConversationComponent, ChatListComponent, ChatNewconversationComponent]
})
export class ChatModule { }
