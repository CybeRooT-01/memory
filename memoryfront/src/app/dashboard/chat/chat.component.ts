import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Pusher from 'pusher-js';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { map } from 'rxjs/operators';
import { Discussion } from '../../Interfaces/Discussion';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatComponent implements OnInit {
  messages = [];
  discussion: Discussion[] = [];
  userlogged: LoggedUser | undefined;
  user_id: number | undefined;
  discussionMerged: any;
  receiverId: number | undefined;
  message: string | undefined;

  @ViewChild('discu_zone') discu_zone!: ElementRef;

  constructor(
    private chatservice: ChatService,
    private authservice: AuthService
  ) {
    (Window as any)['ChatComponent'] = this;
  }
  ngOnInit(): void {
    //ajouter bootstrap dur le component
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const pusher = new Pusher('baf002bfb7174188cf9c', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      // alert(JSON.stringify(data));
      this.chargerDernierMessage(data.disc);
      let id = data.disc.chatter.id;
      this.ngOnInit();
    });
    // recup le user connecter
    this.authservice.getCurrentUser().subscribe((user: LoggedUser) => {
      this.user_id = user.data?.id;
      this.userlogged = user;
      // console.log(this.user_id);
      this.chatservice.getDiscussion(this.user_id).subscribe((data: any) => {
        console.log(this.user_id);
        console.log(data);

        this.discussion = data.messages.map((message: any) => {
          let messageType = '';
          let date = message.created_at;
          if (message.sender.id === this.user_id) {
            delete message.sender;
            message.chatter = message.receiver;
            messageType = 'envoyé';
          }
          if (message.receiver.id === this.user_id) {
            delete message.receiver;
            message.chatter = message.sender;
            messageType = 'reçu';
          }
          message.type = messageType;
          return message;
        });
        console.log(this.discussion);
        const discussionsGrouped = this.discussion.reduce(
          (acc: any, message: any) => {
            const chatterId = message.chatter.id;

            if (!acc[chatterId]) {
              acc[chatterId] = {
                chatter: message.chatter,
                messages: [],
              };
            }
            const formattedDate = new Date(message.created_at).toLocaleString();
            acc[chatterId].messages.push({
              type: message.type,
              texte: message.message,
              date: formattedDate,
            });
            return acc;
          },
          {}
        );
        this.discussionMerged = Object.values(discussionsGrouped);
        console.log(this.discussionMerged);
      });
    });
  }
  //

  chargerDernierMessage(discussion: any) {
    console.log('chargerDernierMessage');

    console.log(discussion);

    console.log('chargerDernierMessage');

    this.discu_zone.nativeElement.innerHTML =
      `
    <div >
      <div class="chat-header clearfix">
        <div class="row">
          <div class="col-lg-6">
            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
              <img src="${
                discussion.chatter.photo
                  ? discussion.chatter.photo
                  : 'https://i.pinimg.com/474x/4a/90/19/4a9019fbeb9799a1a0c1c3c103353ded.jpg'
              }" alt="avatar" />
            </a>
            <div class="chat-about chatter">
              <h6 class="m-b-0">${discussion.chatter.nom}</h6>
              <small class="test">Last seen: 2 hours ago</small>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-history" style="margin-bottom: 100px"
      >
        <ul class="m-b-0">` +
      `${discussion.messages
        .map((message: any) => {
          if (message.type === 'reçu') {
            `+`;
            return `
                <li class="clearfix">
                  <div class="message-data text-right">
                    <span class="message-data-time">${message.date}</span>
                    <img src="${
                      discussion.chatter.photo
                        ? discussion.chatter.photo
                        : 'https://i.pinimg.com/474x/4a/90/19/4a9019fbeb9799a1a0c1c3c103353ded.jpg'
                    }" alt="avatar" style="float: right" />
                  </div>
                  <div class="message other-message float-right">
                    ${message.texte}
                  </div>
                </li>
                `;
          } else {
            `+`;
            return `
                <li class="clearfix">
                  <div class="message-data">
                    <span class="message-data-time">${message.date}</span>
                  </div>
                  <div class="message my-message">${message.texte}</div>
                </li>
                `;
          }
        })
        .join('')}
        </ul>
      </div>
      <div class="chat-message clearfix" style="position: absolute; bottom: 0;  width: 75%;">
            <div class="input-group mb-0">
              <input
                #messageBox
                type="text"
                class="send-chat"
                style="border-radius: 10px"
                placeholder="Votre message ici"
                oninput="Window.ChatComponent.message = this.value"
              />
              <div class="send-message">
                <span class="input-group-text" 
                >
                  <button style="border-radius: 10px" class="btn btn-primary" onclick="Window.ChatComponent.send()">
                  Envoyer
                  </button>
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  `;
    // console.log(discussion);
    this.receiverId = discussion.chatter.id;
  }

  getDernierMessage(discussion: any): string {
    const dernierMessage = discussion.messages[discussion.messages.length - 1];
    const texteCourt = dernierMessage ? dernierMessage.texte.slice(0, 15) : '';
    return texteCourt
      ? `${dernierMessage.type === 'reçu' ? 'recu' : 'vous'}: ${texteCourt}...`
      : '';
  }
  send() {
    let data = {
      sender_id: this.user_id,
      receiver_id: this.receiverId,
      message: this.message,
    };
    this.chatservice.sendMessage(data).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
      //vider le champ
      this.message = '';
    });
  }
}
