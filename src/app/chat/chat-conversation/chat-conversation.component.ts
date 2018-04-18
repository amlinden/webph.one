import { Component, OnInit, HostListener, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Location } from '@angular/common';
import { StorageService } from '../../storage.service';
import {DirectoryItemI} from  '../../directory.service';
import { JsSipService } from '../../jssip.service';
import { SmsService } from '../../sms.service';
import { ChatMessageI } from '../chat-list/chat-list.component';
import { Observable } from 'rxjs/Observable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AsyncPipe } from '@angular/common';

interface ConversationI {
  messages: ChatMessageI[];
  to?: string;
  chatId?: string;
  myNumber: string;
}

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit, OnDestroy {
  public contacts: Observable<DirectoryItemI[]>;
  @ViewChild('conversation', { read: ElementRef }) public conversation: ElementRef;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public action: string;
  public chat;
  public chatId;
  public fixed = false;
  public top: number;
  myControl: FormControl;

  
  public message = '';

  constructor(
    private el: ElementRef,
    private _smsServie: SmsService,
    private _router: Router,
    public storageService: StorageService,
    private _route: ActivatedRoute,
    private _jsSip: JsSipService,
    private _location: Location,
  ) { 
    this.myControl = new FormControl();
    this.contacts = storageService
      .table('contacts')
      .read()
      .takeUntil(this.ngUnsubscribe);
   }

  ngOnInit() {
    this.chatId = this._route.snapshot.paramMap.get('id') || '';
    console.log("CHTAID"+this.chatId);
  //   this.contacts.subscribe(contact=> {
  //     this.myGridOptions.rowData = contact as CountryData[]
  // });


    this._smsServie
    .getChat(this.chatId)
    .takeUntil(this.ngUnsubscribe)
    .subscribe( x => {
      if (x.messages) {
        x.messages = x.messages.reverse();
      }
      this.chat = x;
      this.scrollOnMessage();
      this._smsServie.markAsRead(x.chatId);
    });
  console.log('[SMS] - Chat in list', this.chat);
  this.top = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  scrollOnMessage() {
    if (this.conversation) {
      this.conversation.nativeElement.scroll(0, this.conversation.nativeElement.offsetHeight);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
      console.log(window.scrollY + this.top);
      this.fixed = ((window.scrollY + this.top) > 0);
  }

  grow(event) {
    const element = event.target;
    element.style.height = '15px';
    element.style.overflowY = 'hidden';
    element.style.height = (element.scrollHeight - 20) + 'px';
    if (element.scrollHeight > 80) {
      element.style.overflowY = 'scroll';
    }
  }

  send() {
    this._smsServie.sendSms(this.message, this.chatId);
    this.message = null;
  }

  call() {
    this._jsSip.handleOutgoingCall('', this.chatId);
  }
  goBack() {
    this._location.back();
  }
  isDiferentDate(actual: number, prev: number = Date.now()) {
    const actualDate = new Date(actual);
    const prevDate = new Date(prev);
    return actualDate.toDateString() !== prevDate.toDateString();
  }
}
