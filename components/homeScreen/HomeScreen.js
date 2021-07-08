import React from 'react'
import { Icon } from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeTab from '../homeTab/HomeTab'
import Travel from '../travelTab/TravelTab'
import Profile from '../profileTab/ProfileTab'


const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon:({focused}) => {
            let name
          
            if (route.name === 'Home') {
              name = 'home'
            } else if (route.name === 'Travel') {
              name = 'map-outline'
            } else if (route.name === 'Profile') {
              name = 'person'
            }
          
            return <Icon name={name} width={40} height={32} fill={focused ? '#111' :   '#939393'} />
          }
        })}
        tabBarOptions={{
          showLabel: false
        }}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Travel" component={Travel} />
        {/* <Tab.Screen name="AddPost" component={AddPost} /> */}
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default HomeScreen