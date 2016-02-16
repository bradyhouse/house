/// <reference path="typings/angular2/angular2.d.ts" />

/*
 * Angular
 */
import {Component, bootstrap, View} from "angular2/angular2";

/*
 * Components
 */
import {ChatNavBar} from "./ts/components/ChatNavBar";
import {ChatThreads} from "./ts/components/ChatThreads";
import {ChatWindow} from "./ts/omponents/ChatWindow";

/*
 * Injectables
 */
import {servicesInjectables} from "./ts/services/services";
import {utilInjectables} from "./ts/util/util";

/*
 * Services
 */
import {MessagesService, ThreadsService, UserService} from "./ts/services/services";
import {ChatExampleData} from "./ts/ChatExampleData";

/*
 * Webpack
 */
require("css/styles.scss");

@Component({
    selector: "fiddle-0016-ChatApp"
})
@View({
    directives: [ChatNavBar,
        ChatThreads,
        ChatWindow],
    template: `
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <chat-threads></chat-threads>
      <chat-window></chat-window>
    </div>
  </div>
  `
})
class Fiddle {
    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService,
                public userService: UserService) {
        ChatExampleData.init(messagesService, threadsService, userService);

    }
}

bootstrap(Fiddle, [ servicesInjectables, utilInjectables ]);
