import Geolocation from 'react-native-geolocation-service';
import React, {useEffect, useState} from 'react'
import {SafeAreaView, Text, PermissionsAndroid} from 'react-native'
import {Platform} from 'react-native'
import RNPermissions, {RESULTS, PERMISSIONS} from 'react-native-permissions'

const location = () =>{
  // const apiKey = ""
  const LOCATION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  
  const [neyburhood, setNeyburhood] = useState({country: '', state: '', sublocality: '', locality: '' })
  const [userLocation, setUserLocation] = useState({
    lat: '',
    lng: '',
    granted: false,
  })
  

  useEffect(() => {
    const getLocation = async () => {
      // console.log(LOCATION)
      const userLocationPermissions = await RNPermissions.request(
        // @ts-ignore
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "need that location bro",
          message:
            "gimme da loot",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
        
        )
      // console.log(userLocationPermissions)
      if (userLocationPermissions === RESULTS.GRANTED) {
        try {
          // console.log('getting position')
          Geolocation.getCurrentPosition((location) => {
            
            setUserLocation({
              ...userLocation,
              lat: `${location.coords.latitude}`,
              lng: `${location.coords.longitude}`,
              granted: true,
            })}, 
            (error) => console.log(error.code, error.message),

            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          )
          
        } catch (error) {
          console.log(error)
        }
        
      } else if (userLocationPermissions === RESULTS.DENIED) {
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization()
          getLocation()
        } else {
          console.log('asking android for request')
          try {
            const granted = await PermissionsAndroid.request(
            // @ts-ignore
            PermissionsAndroid.PERMISSIONS.ACCESS_COURSE_LOCATION,
            {
              title: "need that location bro",
              message:
                "gimme da loot",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
            
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('location enabled')
            } else {
              console.log('access denied')
            }
          } catch (error) {
            console.log(error)
          }
          
          
          // console.log(userLocationPermissions)
          getLocation()
        }
      }
    }
    getLocation()

    const getNeyburhood = async() => {
      // console.log(userLocation)
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&key=${apiKey}`)
        // console.log(response)
        const json = await response.json()
        const addressComponents = json.results[0].address_components
        
        let result 
        for (let a = 0; a < addressComponents.length; a++) {
          if (addressComponents[a].types[0] == 'neighborhood') {
            result = String(addressComponents[a].long_name)
          }
        }
        // console.log(result)
        setNeyburhood({...neyburhood, locality: result})
      } catch (error) {
        console.log({error})
      }
    }
    getNeyburhood()

    // console.log(userLocation)
    return () => Geolocation.stopObserving()
  }, [userLocation])
  // const lat = userLocation.lat
  // const long = userLocation.lng
  // console.log({lat:lat, long: long})

  // useEffect(() => {
    // const getNeyburhood = async() => {
    //   console.log(userLocation)
    //   try {
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&key=${apiKey}`)
    //     console.log(response)
    //     const json = await response.json()
    //     const addressComponents = json.results[0].address_components
        
    //     let result 
    //     for (let a = 0; a < addressComponents.length; a++) {
    //       if (addressComponents[a].types[0] == 'neighborhood') {
    //         result = String(addressComponents[a].long_name)
    //       }
    //     }
    //     // console.log(result)
    //     setNeyburhood({...neyburhood, locality: result})
    //   } catch (error) {
    //     console.log({error})
    //   }
    // }
    // getNeyburhood()
  // },[neyburhood])
  return neyburhood.locality
}


export default location