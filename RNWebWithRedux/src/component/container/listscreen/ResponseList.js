/*
 * @Author: Mohd Danish Khan 
 * @Date:2018-04-28
 *  
 */

import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
    Container, 
    Content, List, 
    ListItem, 
    Left, 
    Right,
    Body,
    Thumbnail} from 'native-base';
import {connect} from 'react-redux';

class GetList extends Component {

    //----------------------c
    renderURLImage(url) {
        if (url != null) 
         return (
         <Thumbnail source={{ uri: url}} />
        );
    }

    renderSourceName(name) {
        if (name != null)
        return (
            <Text> {name} </Text>
        );
    }

    renderTitle(title) {
        if(title != null) 
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
     

    render() {
        return(
            <Container>
                <Content>
                    <List 
                        dataArray = {this.props.dataArray}
                        renderRow ={(RowData, SectionID, rowID, higlightRow) => {
                            const { source, author, title, description, url, urlToImage, publishedAt } = RowData;
                            const { name } = source;
                            debugger;
                            return (
                                <ListItem avatar>
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
                </Content>
            </Container>
                
        );
    }
};


const MapStateToProps = state => {
    debugger;
    
    return { dataArray : state.web.data };
    
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

export default connect(MapStateToProps)(GetList);
