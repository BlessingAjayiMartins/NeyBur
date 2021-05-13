import React, { useState } from 'react';
import { Layout, Input } from '@ui-kitten/components';
import { Alert, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import {default as theme} from '../../theme.json'
const EmailLinkSignIn = () => {
  const [email, setEmail] = useState('');

  return (
    <Layout style={styles.container}>
      {/* <Layout style={styles.verticalCenter}> */}
        <Input style={styles.input} status='primary' value={email} onChangeText={text => setEmail(text)} />
        <Button title="Send login link" onPress={() => sendSignInLink(email)} />
      {/* </Layout> */}
      
    </Layout>
  );
};

const BUNDLE_ID = 'com.neybur';

const sendSignInLink = async (email) => {
  const actionCodeSettings = {
    handleCodeInApp: true,
    url: 'https://www.neybur-23349.firebaseapp.com',
    iOS: {
      bundleId: BUNDLE_ID,
    },
    android: {
      packageName: BUNDLE_ID,
      installApp: true,
      minimumVersion: '12',
    },
  };

  // Save the email for latter usage
  // await AsyncStorage.setItem('emailForSignIn', email);

  await auth().sendSignInLinkToEmail(email, actionCodeSettings);

  Alert.alert(`Login link sent to ${email}`);
  /* You can also show a prompt to open the user's mailbox using 'react-native-email-link'
  * await openInbox({ title: `Login link sent to ${email}`, message: 'Open my mailbox' }); */
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    padding: '7% 7%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalCenter: {
    // margin: 0,
    // position: 'absolute',
    // top: '50%',
  },
  input: {
    paddingBottom:'10%'
  }
})
export default EmailLinkSignIn;