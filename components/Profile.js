import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,

} from 'react-native'
import { Layout } from '@ui-kitten/components';


const Profile = () => {
  

  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.locality}>
          Profile Page
        </Text>
        
      </View>
      <View>

      </View>
      

    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  locality: {
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 18,
    // backgroundColor: 'gray'
  }
})
export default Profile