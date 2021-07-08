import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Button,

} from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

// Purpose of this page will be to allow the user to "travel" from one neyburhood to another. User from the outside neybur would be able to look into the chanels, interest and ask questions to people in that neyburhood (designated section for neyburhood inquries). other than the inquries section, all neyburhood features will be read only. writing function can only be enabled one of 2 ways. either be currently located in that neyburhood. or mark neyburhood as primary neyburhood.

const Travel = () => {
  

  return (
    <Layout style={styles.container}>
      
        <Text style={styles.locality}>
          Travel Page
        </Text>
       
     
        
      
      
      

    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  locality: {
    textAlign: 'center',
    padding: '2%',
    // fontWeight: 'bold',
    fontSize: 18,
    // backgroundColor: 'gray'
  }
})
export default Travel