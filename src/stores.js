import XMPP from 'react-native-xmpp';
const DOMAIN = "jabber.hot-chilli.net";
const SCHEMA = "android";
import {observable} from 'mobx';
import autobind from 'autobind'
@autobind
class XmppStore  {
    @observable logged = false;
    @observable loading = false;
    @observable loginError = null;
    @observable error = null;
    @observable conversation = [];
    
    constructor() {
        XMPP.on('loginError', this.onLoginError);
        XMPP.on('error', this.onError);
        XMPP.on('disconnect', this.onDisconnect);
        XMPP.on('login', this.onLogin);
        XMPP.on('message', this.onReceiveMessage);
        // default values
        this.local = 'user1';
        this.remote = 'admin';
    }
    // serverconnection(user){
      
    //     XMPP.connect(user, password);
    // }
    
    _userForName(name){
        console.log("Store  name"+name)
        return name 
    }

    sendMessage(message){
        if (!this.remote || !this.remote.trim()){
            console.error("No remote username is defined");
        }
        if (!message || !message.trim()){
            return false;
        }
        // add to list of messages
        this.conversation.unshift({own:true, text:message.trim()});
        // empty sent message
        this.error = null;
        // send to XMPP server
        XMPP.message(message.trim(), "susmi@ec2-13-233-8-121.ap-south-1.compute.amazonaws.com")
    }

    onReceiveMessage({from, body}){
        console.log("Store onReceiveMessage")
        // extract username from XMPP UID
        if (!from || !body){
            return;
        }
        var name = from.match(/^([^@]*)@/)[1];
        this.chat.unshift({own:false, text:body});
    }

    onLoginError(){
        this.loading = false;
        this.chat.replace([]);
        this.loginError = "Cannot authenticate, please use correct local username";
    }

    onError(message){
        this.error = message;
    }

    onDisconnect(message){
        this.logged = false;
        this.loginError = message;
    }

    onLogin(){
        console.log("Store LOGGED!");
        this.chat.replace([]);
        this.loading = false;
        this.loginError = null;
        this.logged = true;
    }

    login(storlogin){
        console.log("Store  name thislocal =="+this.local+" ==test local "+storlogin.local," store thisremote =="+this.remote+"==test remote==="+storlogin.remote)
        this.local = storlogin.local;
        this.remote = storlogin.remote;
    
        
        if (!storlogin.local ){
            this.loginError = "Local username should not be empty";
        } else if (!storlogin.remote ){
            this.loginError = "Remote username should not be empty";
        } else if (storlogin.local==storlogin.remote){
            this.loginError = "Local username should not be the same as remote username";
        } else {
            this.loginError = null;

            // try to login to test domain with the same password as username
            XMPP.connect(this._userForName("admin"),"password");
            // this.serverconnection("admin")
            this.loading = true;
        }

    }

    disconnect() {
        XMPP.disconnect();
    }

}

export default new XmppStore();