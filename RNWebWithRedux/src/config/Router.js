/*
 * @Author: Mohd Danish Khan 
 * @Date:2018-04-28
 *  
 */

import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from '../component/container/homescreen/HomeScreen';
import SideBar from '../component/container/sidebar/SideBar';
import LucyChat from '../component/container/chatscreen/LucyChat';
import NewsList from '../component/container/newsscreen/NewsList';
import NewsDetail from '../component/container/newsscreen/NewsDetail';
import {Profile, EditScreenOne, EditScreenTwo} from '../component/container/profilescreen';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';

//-------------------Example of StackNavigation -------------------------//


export const ProfileScreenStackNav = StackNavigator({
  Profile: { 
      screen: Profile 
    },
  EditScreenOne: { 
      screen: EditScreenOne 
    },
  EditScreenTwo: { 
      screen: EditScreenTwo 
    }
});

//-------------------Example of TabNavigator -------------------------//


export const MainScreenNavigator = TabNavigator(
    {
      LucyChat: { screen: LucyChat },
      // JadeChat: { screen: JadeChat },
      // NineChat: { screen: NineChat }
    },
    {
      tabBarPosition: 'bottom',
      tabBarComponent: props => {
        return (
          <Footer>
            <FooterTab>
              <Button
                  vertical
                  active={props.navigationState.index === 0}
                  onPress={() => props.navigation.navigate('LucyChat')}
              >
                <Icon name="bowtie" />
                <Text>Lucy</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 1}
                onPress={() => props.navigation.navigate('JadeChat')}
              >
                <Icon name="briefcase" />
                <Text>Nine</Text>
              </Button>
              {/* <Button
                vertical
                active={props.navigationState.index === 2}
                onPress={() => props.navigation.navigate('NineChat')}
              >
                <Icon name="headset" />
                <Text>Jade</Text>
              </Button> */}
            </FooterTab>
          </Footer>
        );
      }
    }
  );

  export const NewsScreenStackNav = StackNavigator (
    {
        News: {
            screen: NewsList,
            navigationOptions: {
              title: 'Top Headlines'
            },
        },
       NewsDetail: {
         screen: NewsDetail,
         navigationOptions:{
            title: 'News Details'
         },
       }
    },
  );

  //-------------------Example of DrawerNavigation -------------------------//

export const HomeScreenDrawerNav = DrawerNavigator(
    {
        Home: { 
            screen: HomeScreen 
            },
        Chat: { 
            screen: MainScreenNavigator 
            },
        Profile: { 
            screen: ProfileScreenStackNav 
            },
        News: {
            screen: NewsScreenStackNav
        },
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  );

  