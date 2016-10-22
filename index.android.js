import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    Text
} from 'react-native';

import LoginScene from './src/Scenes/LoginScene';
import HomeScene from './src/Scenes/HomeScene'

export default class GroupieApp extends Component {

    renderScene(route, navigator) {
        if (route.name === 'Login') {
            return <LoginScene navigator={navigator} />;
        } else if (route.name === 'Home') {
            return <HomeScene navigator={navigator}/>
        }
    }

    render() {
        return (
            <Navigator
                style={{ flex: 1 }}
                initialRoute={{ name: 'Login'}}
                renderScene={this.renderScene} />
        );
    }
}

AppRegistry.registerComponent('GroupieApp', () => GroupieApp);
