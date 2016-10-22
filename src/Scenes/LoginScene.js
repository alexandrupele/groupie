/**
 * Created by alexandrupele on 21/10/2016.
 */
import React, { Component } from 'react';

import { LoginManager } from 'react-native-fbsdk';

import {
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Text,
    StyleSheet
}from 'react-native';

var styles = StyleSheet.create({
    button: {
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b5998',
        alignItems: 'center',
        borderRadius: 30,
        width: 200
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    salutation: {
        alignSelf: 'center',
        fontSize: 40
    },
    salutationContainer: {
        flex: 2,
        justifyContent: 'center'
    }
});

export default class LoginScene extends Component {

    onLoginClicked = () => {
        LoginManager
            .logInWithReadPermissions(['public_profile', 'user_friends'])
            .then(result => {
                console.log(result);
                if (result.isCancelled) {
                } else {
                    this.props.navigator.push({ name: 'Home' });
                }
            }, error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.salutationContainer}>
                        <Text style={styles.salutation}>Welcome</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.onLoginClicked}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}