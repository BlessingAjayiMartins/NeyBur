/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {
  useState
} from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Home from './components/Home'
import Travel from './components/Travel'
import Profile from './components/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EmailLinkSignIn from './features/authentication/emailLinkSignIn'
import {default as theme} from './theme.json'
import {
  StyleSheet,
  Button,
  View,
} from 'react-native';
const Tab = createBottomTabNavigator()
const LandingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Neybur!</Text>
      <Button 
        title="Lets take a peek"
        onPress={()=> navigation.navigate('Home')}
      />
    </View>
  )
}
const App = () => {
  const [login, setLogin] = useState(false)
  return (
    login ? (
      <>
        <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
            <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon:({focused}) => {
                  let name
                
                  if (route.name === 'Home') {
                    name = 'home'
                  } else if (route.name === 'Travel') {
                    name = 'paper-plane'
                  } else if (route.name === 'Profile') {
                    name = 'person'
                  }
                
                  return <Icon name={name} width={40} height={32} fill={focused ? '#111' :      '#939393'} />
                }
              })}
              tabBarOptions={{
                showLabel: false
              }}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Travel" component={Travel} />
              {/* <Tab.Screen name="AddPost" component={AddPost} /> */}
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
            </NavigationContainer>
          </ApplicationProvider>
    </>
    ) : 
    (
    <>
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <EmailLinkSignIn />
      </ApplicationProvider>
    </>
    )
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default App;
