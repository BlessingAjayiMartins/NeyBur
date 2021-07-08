import React,{useState,useEffect} from 'react'
import { Layout, Text } from '@ui-kitten/components'
import firestore from '@react-native-firebase/firestore'
import {  useSelector, useDispatch } from 'react-redux'
import { incrementId } from '../../redux/slices/userSlice'



const addPost = () => {
  const dispatch = useDispatch()
  const postID = useSelector(state => state.user.postID)
  const [post, setPost] = useState({id: postID, img: null, caption: '' })
  
  const onSubmit = async() => {

    const neyburhoodRef = useSelector(state => state.neyburhood.doc)
    const userID = useSelector(state => state.user.UID)

    await firestore()
      .collection('users')
      .doc(userID)
      .update({
        posts: firestore.FieldValue.arrayUnion(post)
      })

    dispatch(incrementId())
  
      
    
  }
  return (

  )
}
