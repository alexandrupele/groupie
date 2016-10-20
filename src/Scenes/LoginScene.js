/**
 * Created by alexandrupele on 21/10/2016.
 */
import React, { Component } from 'react';

import { LoginButton } from 'react-native-fbsdk';


export default class LoginScene extends Component {


    render() {
        return (
            <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            alert("Login failed with error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("Login was cancelled");
                        } else {
                            alert("Login was successful with permissions: " + result.grantedPermissions)
                        }
                    }
                }
                onLogoutFinished={() => alert("User logged out")} />
        );
    }
}