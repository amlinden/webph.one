import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { TranslateService } from '@ngx-translate/core';
import { DirectoryService, DirectoryI, DirectoryItemI } from '../../directory.service';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../storage.service';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import { SmsService } from '../../sms.service';

export enum MessageType {
  TEXT = <any>'text'
}

export interface ChatMessageI {
  _id?: string;
  chatId?: string;
  from?: string;
  content?: string;
  createdAt?: number;
  type?: MessageType;
}


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  public chatItems;
  public chat;
  public contacts: Observable<DirectoryItemI[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private _smsService: SmsService,
    private translate: TranslateService,
    public storageService: StorageService
  ) {
    this.contacts = storageService
      .table('contacts')
      .read()
      .takeUntil(this.ngUnsubscribe);

      
   }

  ngOnInit() {
    this.chatItems = this._smsService
      .getAllChats()
      .takeUntil(this.ngUnsubscribe);
  }

  goTonewmessage(){
    this.router.navigate(['/chat', 'newconversation']);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goTo(chatId: string) {
    console.log(chatId);
    this.router.navigate(['/chat', 'conversation', chatId ]);
      } 
}
