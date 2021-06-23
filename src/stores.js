import XMPP from 'react-native-xmpp';
const DOMAIN = "13.233.215.155";
const SCHEMA = "android";
import {observable} from 'mobx';
import autobind from 'autobind'
@autobind
class XmppStore  {
    @observable logged = false;
    @observable loading = false;
    @observable loginError = null;
    @observable error = null;
    @observable storemessage =null;
    @observable conversation = [];
    
    constructor() {
        XMPP.on('loginError', this.onLoginError);
        XMPP.on('error', this.onError);
        // XMPP.on('disconnect', this.onDisconnect);
        XMPP.on('login', this.onLogin);
        XMPP.on('message', (message) => console.log('MESSAGE:' + JSON.stringify(message)));
        XMPP.on('presence', (message) => console.log('PRESENCE:' + JSON.stringify(message)));
        

        // default values
        // this.username="",x
        // this.password=""
    }

    sendMessage(message){
        var to = '7780234146@groupin.app';
        console.log("Store sendMessage"+message +"to"+to)
        // add to list of messages
        this.conversation.unshift({own:true, text:message.trim()});
        // empty sent message
        this.error = null;
        // send to XMPP server
        XMPP.message(message.trim(), to)
    }

    onReceiveMessage({from, body}){
        console.log("Store onReceiveMessage"+JSON.stringify(from))
        // extract username from XMPP UID
        if (!from || !body){
            return;
        }
        var name = from.match(/^([^@]*)@/)[1];
        this.conversation.unshift({own:false, text:body});
    }

    onLoginError(){
        this.loading = false;
        // this.conversation = [];
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
        // this.conversation =[];
        this.loading = false;
        this.loginError = null;
        this.logged = true;
    }

    onloginuser(username,password){
         console.log("Store  name thislocal =="+username+password)
         var user =username.toString()
         var pwd =password.toString()
         var host ='13.233.215.155'
            // try to login to test domain with the same password as username
        //    host = JSON.stringify(host)
        //    var hostid = JSON.stringify(host)
           console.log("Store  name hostid ==  " + JSON.stringify(host) )
              XMPP.connect(user,pwd,'',host);
            this.loading = true;
        // }

    }

    // disconnect() {
    //     XMPP.disconnect();
    // }

}

export default new XmppStore();