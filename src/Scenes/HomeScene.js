/**
 * Created by alexandrupele on 21/10/2016.
 */

import React, { Component } from 'react';
import {
    Text,
    ListView,
    ActivityIndicator,
    StyleSheet,
    View,
    Image,
    Switch,
    TouchableHighlight,
    RefreshControl,
    ToolbarAndroid,
    TouchableNativeFeedback
} from 'react-native';
import {
    GraphRequest,
    AccessToken,
    GraphRequestManager
} from 'react-native-fbsdk';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
    },
    button: {
        height: 60,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#FF9A00',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    image: {
        width: 70,
        height: 70,
        margin: 15,
        borderRadius: 64
    },
    listItem: {
        flexDirection: 'row'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    name: {
        fontSize: 20,
        alignSelf: 'center'
    },
    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    switch: {
        marginRight: 10
    }
});

export default class HomeScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: true,
            refreshing: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }

    componentDidMount() {
        this.loadFriends();
    }

    loadFriends() {
        AccessToken.getCurrentAccessToken().then(accessToken => {
            console.log(accessToken);
            const graphPath = '/me/friends?fields=link,name,picture.type(large)';
            console.log(graphPath);

            var request = new GraphRequest(graphPath, null, (err, res) => {
                if (!err) {
                    console.log(res.data);
                    setTimeout(() => {
                        this.setState({
                            animating: false,
                            refreshing: false,
                            dataSource: this.state.dataSource.cloneWithRows(res.data)
                        });
                    }, 5000);
                }
            });

            new GraphRequestManager().addRequest(request).start();
        });
    }

    onRefresh() {
        this.setState({
            refreshing: true
        });
        this.loadFriends();
    }

    getRefreshControl() {
        return (
            <RefreshControl
                title="Fetching friends"
                progressViewOffset={0}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
            />
        );
    }

    getSpinner() {
        // return (
        //     <ActivityIndicator
        //         animating={this.state.animating}
        //         style={styles.spinner}
        //         size="large"
        //     />
        // );
        return null;
    }

    getSendButton() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableNativeFeedback
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Send notifications</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <ToolbarAndroid style={styles.toolbar}
                    title="Friends" />

                { this.state.animating? this.getSpinner() : null }

                <ListView
                    style={{ flex: 1 }}
                    dataSource={this.state.dataSource}
                    refreshControl={this.getRefreshControl()}
                    onRefresh={this.onRefresh.bind(this)}
                    renderRow={(friend) => {
                        console.log(friend.picture.data.url);
                        return (
                            <View style={styles.listItem}>
                                <Image style={styles.image}
                                    source={{ uri: friend.picture.data.url }}
                                />

                                <Text style={styles.name}>{friend.name}</Text>

                                <View style={styles.switchContainer}>
                                    <Switch style={styles.switch} />
                                </View>
                            </View>
                        );
                    }}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                { this.state.animating ? null : this.getSendButton()}
            </View>
        );
    }
}