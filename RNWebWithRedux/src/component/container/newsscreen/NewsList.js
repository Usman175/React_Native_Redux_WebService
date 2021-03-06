/*
 * @Author: Mohd Danish Khan 
 * @Date:2018-04-28
 *  
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import {
    Container,
    Content, List,
    ListItem,
    Header,
    Button,
    Icon,
    Left,
    Title,
    Right,
    Body,
    Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
import { reachability, getRequestThunk } from '../../../actions/WebServiceActions';
import { DUMMY_TEST_URL, DATA_MANAGER } from '../../../appConstant/Constant';
import { Spinner } from '../../../utility/Spinner'


class NewsList extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            isConnected: false
        }
        DATA_MANAGER.setWebServiceManager();
        this._connectivityListener = this._connectivityListener.bind(this);    
    }

    componentWillMount() {
        debugger;
        DATA_MANAGER.addConnectivityListener(this._connectivityListener);
      }
    
      componentWillUnmount() {
        debugger;
        DATA_MANAGER.removeConnectivityListener(this._connectivityListener);
      }

    //-------------------methods to render data --------------//

    /*this method will load the spinner if data is not availabe, and then loads the
    data as it is fetched from redux store*/
    renderList() {
        if (this.props.loading) {
            return <Spinner size="large"/>
        } else if(this.props.data.length <=0 ) {
            if (this.props.isConnected) {
                this.props.getRequestThunk(DUMMY_TEST_URL);
            }else {
                Alert.alert('Check you internet connectivity..Its disconnected');
            }
        } else {
            return (
                <List
                    dataArray={this.props.data}
                    renderRow={(RowData, SectionID, rowID, higlightRow) => {
                        const { source, author, title, description, url, urlToImage, publishedAt } = RowData;
                        const { name } = source;
                        debugger;
                        return (
                            <ListItem
                                avatar
                                onPress={() => this.newsItemPressed(url)}
                            >
                                <Left>
                                    {this.renderURLImage(urlToImage)}
                                </Left>
                                <Body>
                                    {this.renderTitle(title)}
                                    {this.renderDescription(description)}
                                </Body>
                            </ListItem>
                        )
                    }}>
                </List>
            );
        }
    }

    //-----------------------Check for null values -----------------------------//
    renderURLImage(url) {
        if (url != null)
            return (
                <Thumbnail source={{ uri: url }} />
            );
    }


    renderSourceName(name) {
        if (name != null)
            return (
                <Text> {name} </Text>
            );
    }

    renderTitle(title) {
        if (title != null)
            return (
                <Text> {title} </Text>
            );
    }

    renderDescription(description) {
        if (description != null)
            return (
                <Text note> {description} </Text>
            );
    }

    renderPublished(publishedAt) {
        if (publishedAt != null)
            return (
                <Text note> {publishedAt} </Text>
            );
    }

    // to navigate to news details with parameter url
    newsItemPressed(url) {
        this.props.navigation.navigate('NewsDetail', { url });
    }

     //Connectivity listener
  _connectivityListener(isConnected) {
    debugger;
    this.props.reachability(isConnected);
  }

    //-------------
    render() {
        return (
            <Container>
                <Content>
                    {this.renderList()}
                </Content>
            </Container>
        );
    }
};



//-----------------Adding drawer navigation to NewsList.-------------//
NewsList.navigationOptions = ({ navigation }) => ({
    header: (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
                <Title>HEADLINES</Title>
            </Body>
            <Right />
        </Header>
    )
});

const mapStateToProps = state => {
    debugger;
    const { data, loading, isConnected } = state.web;
    return { data, loading, isConnected };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    newsTitle: {
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default connect(mapStateToProps, { reachability, getRequestThunk })(NewsList);