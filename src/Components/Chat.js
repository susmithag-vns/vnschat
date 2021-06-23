import React from 'react';
import { View, Text, ScrollView, TextInput, Keyboard, Dimensions, Button, PixelRatio } from 'react-native';
const height = Dimensions.get('window').height;
// import {Actions} from 'react-native-router-flux';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import xmpp from '../stores'
import { FlatList } from 'react-native-gesture-handler';
// const ds = new FlatList.data({rowHasChanged: (r1, r2) => r1 !== r2});
const XMPP = require('react-native-xmpp');
export default class Chat extends React.Component {
    static title(props) {
        return xmpp.remote;
    }
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            height: 0,
            local:xmpp.local,
            remote:xmpp.remote,
            messagelist:xmpp.conversation
        }
    }
    componentDidMount() {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
        this.mounted = true;
        console.log("chatjs xmpplocal" + JSON.stringify(xmpp.conversation)+JSON.stringify(xmpp.username)+JSON.stringify(xmpp.password))
        // xmpp.onloginuser(this.state.navigation.userid, this.state.navigation.password)
        this.setState({messagelist:xmpp.conversation})
    }

    componentWillUnmount() {
        this.mounted = false;
        Keyboard.removeListener('keyboardWillShow');
        Keyboard.removeListener('keyboardWillHide');
        XMPP.removeListeners()
    }
    keyboardWillShow(e) {
        if (this.mounted) this.setState({ height: e.endCoordinates.height });
    }

    keyboardWillHide(e) {
        if (this.mounted) this.setState({ height: 0 });
    }
    submit(msg){
     
         var to = '7780234146@groupin.app';
         XMPP.message(msg, to);
        // let obj={
        //     msg:this.state.message,
        //     own:"right"
        // }
        // this.state.messagelist.push(obj)
        console.log("conversation"+JSON.stringify(xmpp.conversation))
        // var to = this.state.navigation.userid;
        // xmpp.sendMessage(msg, to);
        // let obj={
        //     msg:this.state.message,
        //     own:"right"
        // }
        // this.state.messagelist.push(obj)
        // var fromid = this.state.navigation.userid;
        // xmpp.onReceiveMessage(fromid)
    }
    componentWillUnmount(){
        XMPP.disconnect()
        XMPP.removeListeners()
    }
    _renderItem=({item})=>{
        if(this.state.messagelist!==undefined){
        return(
            <View >
                <Text style={[styles.messageItem, { textAlign: item.own ? 'right' : 'left',marginLeft:item.own=='right'?50:0 }]}>{item.msg}</Text>
            </View>
        )
        }
    }
    render() {
        // const dataSource = ds.cloneWithRows(xmpp.conversation.map(x => x));
        const dataSource = JSON.stringify(xmpp.conversation)
        console.log("chatjs" + JSON.stringify(xmpp.conversation))
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
              
                    <FlatList 
                    // enableEmptySections
                        // renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        data={this.state.messagelist}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                   
                    {/* <FlatList
                    inverted={true}
                    ref="messages"
                    // renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        data={dataSource}
                        renderItem={({ item, index, separators }) => (
                                <Text keyExtractor={(item, index) => index.toString()}>{item.text}</Text>
                          )}
                    /> */}
                </View>
                <View style={styles.messageBar}>
                    <View style={{ flex: 1 }}>
                        <TextInput ref='message'
                            value={this.state.message}
                            onChangeText={(message) => this.setState({ message })}
                            style={styles.message} placeholder="Enter message..." />
                    </View>
                    <View style={styles.sendButton}>
                        <Button
                            title="Send"
                            onPress={() => { this.submit(this.state.message); this.setState({ message: '' }) }} disabled={!this.state.message || !this.state.message.trim()}>

                        </Button>
                    </View>
                </View>
                <View style={{ height: this.state.height }}></View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 70,
        backgroundColor: '#F7F7F7',

    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#d6d7da',
        padding: 10,
        alignItems: 'center'
    },
    categoryLabel: {
        fontSize: 15,
        textAlign: 'left',
        left: 10,
        padding: 10,
        fontWeight: 'bold',
    },
    lastRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#d6d7da',
        padding: 10,
        alignItems: 'center'
    },
    rowLabel: {
        left: 10,
        flex: 1,
        fontSize: 15,
    },
    rowInput: {
        fontSize: 15,
        flex: 1,
        height: (Platform.OS == 'ios') ? 30 : 50
    },
    messageItem: {
        padding: 10,
        paddingRight: 20,
        fontSize: 15,
        backgroundColor: 'powderblue',
    },
    messageBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        left: 0,
        right: 0,
        height: 55
    },
    message: {
        left: 10,
        right: 10,
        fontSize: 15,
        flex: 1,
        height: 30
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderColor: '#eeeeee',
        borderWidth: 1,
        borderBottomWidth: 1 / PixelRatio.get(),
        marginTop: 20,
        borderRadius: 10,
        width: 300,
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'center'
    },
    sendButton: {
        justifyContent: 'center',
        width: 80
    },
    navBar: {
        backgroundColor: '#0db0d9'
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 70,
        borderRadius: 6,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
}