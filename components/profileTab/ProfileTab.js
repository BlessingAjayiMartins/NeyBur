import React, {useEffect, useState} from 'react'
import {
  StyleSheet

} from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components';

// Profile page will have the name of user, userAvatar, number of posts, #followers, #following, bio, editprofile button, users posts...

//  - when a user goes to their own personal profile page to see their posts they will see a feed of their posts that shows which neyburhood the post was created at.

// - when user goes to another persons profile that isn't theirs they will not see the neyburhood where each post was created.
const Profile = () => {
  

  return (
    <Layout style={styles.container}>
      
        <Text style={styles.locality}>
          Profile Page
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
    // fontWeight: 'bold',
    fontSize: 18,
    // backgroundColor: 'gray'
  }
})
export default Profile