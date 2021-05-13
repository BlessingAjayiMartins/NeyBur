
import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  Button,

} from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import location from '../features/location'
import Feed from './Feed'
// import {default as theme} from '../theme.json'


const Home = ({navigation}) => {
  const [place, setPlace] = useState('place')
  
  // const locality = location()
  
  

  return (
    <Layout style={styles.container}>
      
        <Text style={styles.locality} >
          Welcome to {place}
          
        </Text>
   
      

      <Feed 
        navigation={navigation}
      />
    </Layout>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme['color-primary-100']
  },
  locality: {
    textAlign: 'center',
    fontWeight: '900',
    padding: 10
    // fontSize: 20,
    // fontFamily: 'Texturina',
    // backgroundColor: 'gray'
  }
})
export default Home