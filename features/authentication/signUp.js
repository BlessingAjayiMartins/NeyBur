import React, {useState} from 'react'
import {
  StyleSheet
} from 'react-native'
import { Layout, Input, Text, Button } from '@ui-kitten/components'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { setUID } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const signUp = () => {
  const [state, setState] = useState({email: '', password: '', username: ''})

  const onSignUp = ({state}) => {
    const dispatch = useDispatch()
    const { email, password, username } = state
    auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firestore().collection("users")
                .doc(auth().currentUser.uid)
                .set({
                    username: username,
                    email: email,
                    userid: auth().currentUser.uid
                })
            console.log(result)
          dispatch(setUId(auth().currentUser.uid))
        })
        .catch((error) => {
            console.log(error)
        })
  }

  return (
    <Layout>
      <Input
          placeholder="username"
          onChangeText={name => setState({...state, username: name})}
      />
      <Input
          placeholder="email"
          onChangeText={email => setState({...state, email: email })}
      />
      <Input
          placeholder="password"
          secureTextEntry={true}
          onChangeText={text => setState({...state, password: text })}
      />
      <Button
          title="Sign Up"
          onPress={onSignUp(state)}
      />
    </Layout>
  )
} 

export default signUp