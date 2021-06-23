import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import xmpp from '../stores'
import ActivityIndicator from './ActivityIndicator'
import Chat from './Chat';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
     
    }
    submit(username,pwd){
        console.log("username"+username+"password"+pwd)
        var user=username
        var password =pwd
        // var ip ='13.233.215.155'
        // var user = "9160423384@groupin.app";
        // var password = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4OSIsImV4cCI6MTYyNDAzNDg5MywiaWF0IjoxNjIzOTk4ODkzfQ.ka2XKdcrOPlADidaLR0wnONVgKvuh3HuhWn-W08wggs';
        xmpp.onloginuser(user, password);
        this.props.navigation.navigate("Chat",{userid:username,password:pwd})
       
    }

    render() {

        return (


            <View style={[styles.container, { alignItems: 'center' }]}>
                {xmpp.loginError && <Text style={{ color: 'red' }}>{xmpp.loginError}</Text>}
                <Text style={styles.categoryLabel}>Please enter local{xmpp.local} and remote{xmpp.remote} usernames</Text>
                <Text style={styles.categoryLabel}>(userN, where N=1,2,3 or 4) </Text>
                <View style={styles.row}>

                    {/* <TextInput
                        style={styles.rowInput}
                        onChangeText={(local) => {
                            this.setState({ local });
                        }}
                        value={this.state.local}
                        placeholder="user1@groupin.app"
                        underlineColorAndroid="transparent"
                        autoCapitalize="characters"
                    // onSubmitEditing={(val) => this.setState({ emailidlocal: val })}
                    /> */}
                    <TouchableOpacity onPress={()=>this.submit("9160423386@groupin.app","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MTYwNDIzMzg2IiwiZXhwIjoxNjI0NDAzNDg2LCJpYXQiOjE2MjQzNjc0ODZ9.vBQEv8STEAl4Lz-NllblzksWIukT7sQCuIsys29iDUE")}>
                        <Text>9160423386@groupin.app</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lastRow}>
                    {/* <TextInput
                        style={styles.rowInput}
                        onChangeText={(remote) => {
                            this.setState({ remote });
                        }}
                        value={this.state.remote}
                        placeholder="user2@groupin.app"
                        underlineColorAndroid="transparent"
                        autoCapitalize="characters"
                    // onEndEditing={(val) => this.setState({ emailidremote: val })}
                    /> */}
                    <TouchableOpacity onPress={()=>this.submit("7780234146@groupin.app","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NzgwMjM0MTQ2IiwiZXhwIjoxNjI0Mzc4MjI0LCJpYXQiOjE2MjQzNDIyMjR9.Eh24VQGVJUNP4I1FvMDv7_MvizEj4Jal7VqWyxyhNMs")}>
                        <Text>7780234146@groupin.app</Text>
                    </TouchableOpacity>
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