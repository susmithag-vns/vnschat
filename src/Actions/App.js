import React,{Component} from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Components/Login';
import Chat from '../Components/Chat';


const Stack = createStackNavigator();

class App extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen  name="Login" component={Login}  options={{ title: 'My home' }} />
        <Stack.Screen name="Chat" component={Chat}   />      
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

export default App;
