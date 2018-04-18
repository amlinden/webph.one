import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatNewconversationComponent } from './chat-newconversation/chat-newconversation.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Routes = [{
    path: 'chat',
    component: ChatListComponent,
    pathMatch: 'full'
},
{
    path: 'chat/conversation/:id',
    component: ChatConversationComponent,
    pathMatch: 'full'
},
{
    path: 'chat/newconversation',
    component: ChatNewconversationComponent,
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
