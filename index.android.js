import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';
import LoginScene from './src/Scenes/LoginScene';

export default class GroupieApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ title: 'My Initial Scene', index: 0}}
                renderScene={(route, navigator) => {
                    console.log(route);
                    return <LoginScene title={route.title} />;
                }} />
        );
    }
}


AppRegistry.registerComponent('GroupieApp', () => GroupieApp);
