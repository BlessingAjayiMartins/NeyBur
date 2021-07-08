import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import {  useSelector } from 'react-redux'


const message = () => {
  // each user will have a message reference object with userid as the key and message docref as the value pair.
  // when messaging a user, search to see if the userid is stored in the message reference object. if so, use the value pair and access the docement in the collection of messages.
  // if the userid is not present in your message reference object, create a new message document and save the key value pair in the users message reference object.

  const onSend = () => {

  }

  return (

  )
}