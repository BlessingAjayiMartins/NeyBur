import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

const Chanels = () => {
  return (
    <Layout style={styles.container}>
      <Text> Welcome to Chanels! Here you would be able to find Interests specefic to the Neyburhood. Have an interest that isnt listed? Feel free to create one! </Text>
    </Layout>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
export default Chanels