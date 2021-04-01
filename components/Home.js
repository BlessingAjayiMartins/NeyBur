import Geolocation from 'react-native-geolocation-service';
import React, {useEffect, useState} from 'react'
import {SafeAreaView, Text, PermissionsAndroid} from 'react-native'
import {Platform} from 'react-native'
import RNPermissions, {RESULTS, PERMISSIONS} from 'react-native-permissions'
import location from '../features/location'



const Home = () => {
  location
  const hood = location()

  return (
    <SafeAreaView>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        {hood}
      </Text>
    </SafeAreaView>
  )
}

export default Home