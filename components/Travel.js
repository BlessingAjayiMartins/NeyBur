import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,

} from 'react-native'
import { Layout } from '@ui-kitten/components';


const Travel = () => {
  

  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.locality}>
          Travel Page
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
export default Travel