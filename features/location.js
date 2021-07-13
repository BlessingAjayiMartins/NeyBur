import Geolocation from 'react-native-geolocation-service';
import React, {useEffect, useState} from 'react'
import {PermissionsAndroid} from 'react-native'
import {Platform} from 'react-native'
import RNPermissions, {RESULTS, PERMISSIONS} from 'react-native-permissions'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'
import {setLocation} from '../redux/slices/neyburhoodSlice'


// location function is meant to ...
// request access from native platform to recieve long/lat data via getLocation()
// save long/lat state 
// pass long/lat to google maps api to get the region data via getNeyburhood
// save data in global state via redux

const location = () =>{
  const apiKey = ""
  const LOCATION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  
  const [neyburhood, setNeyburhood] = useState({country: '', administrativeAreaLevel1: '', sublocality: '', locality: '' , doc: ''})
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
        
        let localityResult, sublocalityResult, stateResult, countryResult 
        for (let a = 0; a < addressComponents.length; a++) {
          if (addressComponents[a].types[0] == 'neighborhood') {
            localityResult = String(addressComponents[a].long_name)
          }
          if (addressComponents[a].types[0] == 'sublocality') {
            sublocalityResult = String(addressComponents[a].long_name)
          }
          if (addressComponents[a].types[0] == 'administrative_area_level_1') {
            stateResult = String(addressComponents[a].long_name)
          }
          if (addressComponents[a].types[0] == 'country') {
            countryResult = String(addressComponents[a].long_name)
          }
        }
        // console.log(localityResult)
        setNeyburhood({...neyburhood, locality: localityResult, sublocality: sublocalityResult, administrativeAreaLevel1: stateResult, country: countryResult})
      } catch (error) {
        console.log({error})
      }
    }
    getNeyburhood()

    // console.log(userLocation)
    return () => Geolocation.stopObserving()
  }, [userLocation])
  
  // need redux toolkit for global state management
  const docRef = `${neyburhood.country}/${neyburhood.administrativeAreaLevel1}/${neyburhood.sublocality}/${neyburhood.locality}`
  setNeyburhood({...neyburhood, doc: docRef})
  const dispatch = useDispatch()
  dispatch(setLocation(neyburhood))
  // if docRef is not a document in neyburhoods, create new neyburhood. 

  // return neyburhood.locality

  // part of the function that will help you populate firestore with neyburhoods later
  firestore()
    .collection('neyburhoods')
    .doc(`${neyburhood.country}/${neyburhood.state}/${neyburhood.sublocality}/${neyburhood.locality}`)
    .set(
      {...neyburhood},
      {merge: true}
    )
}


export default location