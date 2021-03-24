import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import xmpp from '../stores'
import ActivityIndicator from './ActivityIndicator'
import Chat from './Chat';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    submit(){
        var XMPP =require('react-native-xmpp')
        var user = 'admin@ec2-13-233-8-121.ap-south-1.compute.amazonaws.com';
        var password = 'password';
    
        var to = 'susmi@ec2-13-233-8-121.ap-south-1.compute.amazonaws.com';
    
        XMPP.trustHosts(['ec2-3-14-27-95.us-east-2.compute.amazonaws.com']);
        XMPP.connect(user, password);
        XMPP.message('Testing...', to);
    }

    render() {

        return (


            <View style={[styles.container, { alignItems: 'center' }]}>
                {xmpp.loginError && <Text style={{ color: 'red' }}>{xmpp.loginError}</Text>}
                <Text style={styles.categoryLabel}>Please enter local{xmpp.local} and remote{xmpp.remote} usernames</Text>
                <Text style={styles.categoryLabel}>(userN, where N=1,2,3 or 4) </Text>
                <View style={styles.row}>

                    <TextInput
                        style={styles.rowInput}
                        onChangeText={(local) => {
                            this.setState({ local });
                        }}
                        value={this.state.local}
                        placeholder="Local (@jabber.hot-chilli.net)"
                        underlineColorAndroid="transparent"
                        autoCapitalize="characters"
                    // onSubmitEditing={(val) => this.setState({ emailidlocal: val })}
                    />
                </View>
                <View style={styles.lastRow}>
                    <TextInput
                        style={styles.rowInput}
                        onChangeText={(remote) => {
                            this.setState({ remote });
                        }}
                        value={this.state.remote}
                        placeholder="Remote (@jabber.hot-chilli.net)"
                        underlineColorAndroid="transparent"
                        autoCapitalize="characters"
                    // onEndEditing={(val) => this.setState({ emailidremote: val })}
                    />
                </View>
                <View style={styles.button}><Button title="Login" onPress={() =>{ 
                  this.submit();
                   
                  
                }}></Button></View>
                <ActivityIndicator active={xmpp.loading} />

            </View>

        )
    }
}

const styles = {

}

export default Login