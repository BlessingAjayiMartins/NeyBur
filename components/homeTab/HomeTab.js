
import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,

} from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components';
import location from '../../features/location'
import Feed from './Feed'
import Chanels from './Chanels'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import {default as theme} from '../theme.json'

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Layout style={styles.container}>
      <Text>
        Home Drawer
      </Text>
    </Layout>
  )
}
const HomeDrawer = ({navigation}) => {
  return (
    <Drawer.Navigator initialRouteName='Feed' drawerPosition='right'>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Chanels" component={Chanels} />
      <Drawer.Screen name="Feed" component={Feed} />
      {/* <Drawer.Screen name="Interests" component={Interest} /> */}
      {/* <Drawer.Screen name="Events" component={Events} /> */}
    </Drawer.Navigator>
  );
}
const HomeTab = ({navigation}) => {
  const [place, setPlace] = useState('place')
  
  // const locality = location()
  
  

  return (
    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Text style={styles.headText} >
          Welcome to {place}
        </Text>
        <Button style={styles.message} size='medium'>messages</Button>
      </Layout>
        <Layout style={styles.body}>
          {/* <HomeDrawer /> */}
          <Feed/>
        </Layout>
      {/* <Feed 
        navigation={navigation}
      /> */}
      
    </Layout>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme['color-primary-100']
  },
  header: {
    flex:1,
    // flexDirection: 'row',

  },
  message: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 14
  },
  headText: {
    // textAlign: 'center',
    fontWeight: '900',
    padding: 10
    // fontSize: 20,
    // fontFamily: 'Texturina',
    // backgroundColor: 'gray'
  }
})
export default HomeTab