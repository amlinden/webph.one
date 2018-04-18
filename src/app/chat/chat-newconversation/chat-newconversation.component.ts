
import { Component, OnInit, HostListener, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {Injectable} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Location } from '@angular/common';
import { StorageService } from '../../storage.service';
import { JsSipService } from '../../jssip.service';
import { SmsService } from '../../sms.service';
import { ChatMessageI } from '../chat-list/chat-list.component';
import { Observable } from 'rxjs/Observable';
import { DirectoryService, DirectoryI, DirectoryItemI } from '../../directory.service';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
//HÄR
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { ReactiveFormsModule } from '@angular/forms';
import { Http,Response } from '@angular/http';

@Injectable()

@Component({
  selector: 'app-chat-newconversation',
  templateUrl: './chat-newconversation.component.html',
  styleUrls: ['./chat-newconversation.component.scss']
})

export class ChatNewconversationComponent implements OnInit, OnDestroy {
  searchResult = [];  
  @ViewChild('conversation', { read: ElementRef }) public conversation: ElementRef;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  //public contacts: Observable<DirectoryItemI[]>;
  public chat;
  public chatId;
  public fixed = false;
  public top: number;
  //contactForm: FormGroup;
  nameChangeLog: string[] = [];
  
  //autocomplete
  myControl: FormControl;
  filteredContacts: Observable<any[]>;
  contacts: DirectoryItemI[] = [];

  
  public message = '';
  url: string
  isLoading = false;
      
  constructor(
    private http : Http,
    private el: ElementRef,
    private _smsServie: SmsService,
    private _router: Router,
    public storageService: StorageService,
    public directoryService: DirectoryService,
    private _route: ActivatedRoute,
    private _jsSip: JsSipService,
    private _location: Location
  ) { 
        
    this.contacts = storageService
      .table('contacts')
      .read()
      .takeUntil(this.ngUnsubscribe)
      // .subscribe(contacts => {
      //   this.contacts = contacts;
      // });
      
    //autocomplete - formcontrol
    this.myControl = new FormControl();
    this.filteredContacts = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterContacts(val))
      );
      console.log(this.filteredContacts);
   }
//.title?
  filterContacts(title: string) {
    return this.contacts.filter(contact =>
      contact.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }
  existContact(number) {
    return this.contacts.filter(contact => contact.number === Number(number)).length > 0;
  }
  send(chatId) {
    this._smsServie.sendSms(this.message, this.chatId);
    this.message = null;
  }


  ngOnInit() {
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
