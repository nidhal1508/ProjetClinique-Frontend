import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';
import jwt_decode from "../../../../node_modules/jwt-decode";
import { FormControl, FormGroup } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { LoginService } from 'src/app/services/login.service';
import { MessagesService } from 'src/app/theme/components/messages/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService, MessagesService]
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<Chat>;
  public talks: Array<Chat>;
  public sidenavOpen: boolean = true;
  public currentChat;
  public newMessage: string;

  listeCandidats: any;
  chosenUser: any;
  listeMessages: any;
  messageForm: FormGroup;
  conversation: any;
  logo;
  token = localStorage.getItem('token');
  decoded = JSON.parse(JSON.stringify(jwt_decode(this.token)))
  userId = this.decoded._id
  file;
  formData;
  myFiles: any;

  constructor(public appSettings: AppSettings,
    private socket: Socket,
    public chatService: ChatService,
    public auth: LoginService,
    private messagesService: MessagesService) {
    this.listeMessages = [];
    this.listeCandidats = [];
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
      if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }
    this.messageForm = new FormGroup({
      content: new FormControl(''),
      candidat: new FormControl(this.decoded._id),
      logo: new FormControl(this.decoded.user.profile.image)
    });

    this.socket.on('newUserAdded', () => {
      this.auth.getAllUsers().subscribe((res: any[]) => {
        this.chats = this.listeCandidats = res.filter(obj => obj._id !== this.userId);
      });
    });
    this.auth.getAllUsers().subscribe((res: any) => {
      this.chats = this.listeCandidats = res.filter(obj => obj._id !== this.userId);
      this.clickUser(this.listeCandidats[0]._id);
    });
    this.socket.on('newMessageSended', () => {     
      this.clickUser(this.chosenUser);
    });
  }

  clickUser(idCandidat) {
    this.chosenUser = idCandidat;
    this.chatService.getPrivateMessage(idCandidat, this.userId).subscribe((res: any) => {
      this.conversation = res._id;
      this.currentChat = res
      if (window.innerWidth <= 768) {
        this.sidenav.close();
      }
      this.talks = this.listeMessages = res.messages;
    });

  }

  sendMessage() {
    this.formData = new FormData();

    if (this.file != null) {
      this.formData.append('myFiles', this.file, this.file.name);

    }

    Object.keys(this.messageForm.value).forEach(fieldName => {
      this.formData.append(fieldName, this.messageForm.value[fieldName]);
    })

    this.chatService.sendMessage(this.formData, this.conversation).subscribe((res) => {
    });
    this.myFiles = '';
    this.messageForm.patchValue({
      content: '',
      files: '',
    });
    this.file = null
    let message = {
      reciever: this.chosenUser,
      text: "sent you a message",
      userOwner: this.userId,
      messages: true,
      chatUrl : 'chat'
    }
    this.messagesService.sendNotification(message).subscribe();
    // let chatContainer = document.querySelector('.chat-content');

    // if (chatContainer) {
    //   setTimeout(() => {
    //     var nodes = chatContainer.querySelectorAll('.mat-list-item');
    //     let newChatTextHeight = nodes[nodes.length - 1];
    //     chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
    //   });
    // }

  }

  selectFile(event) {
    if (event.target.value) {
      this.file = <File>event.target.files[0];
    }
  }


  deleteChat(chatId) {
    this.chatService.deleteChat(chatId).subscribe(res => {
    })
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }


  public ngOnDestroy() {
    if (this.talks)
      this.talks.length = 2;
  }



}