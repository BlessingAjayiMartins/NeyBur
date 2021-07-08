/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {
  useState
} from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import HomeScreen from './components/homeScreen/HomeScreen'
import EmailLinkSignIn from './features/authentication/emailLinkSignIn'
import SignUp from './features/authentication/signUp'
import {default as theme} from './theme.json'
import {
  StyleSheet
} from 'react-native';
import store from './redux/store'
import { Provider } from 'react-redux'

// const LandingPage = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <Text>Welcome Neybur!</Text>
//       <Button 
//         title="Lets take a peek"
//         onPress={()=> navigation.navigate('Home')}
//       />
//     </View>
//   )
// }
const App = () => {
  const [login, setLogin] = useState(true)
  return (
    login ? (
      <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <HomeScreen />
          </ApplicationProvider>
      </Provider>
      </>
    ) : 
    (
    <>
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <SignUp />
      </ApplicationProvider>
    </Provider>
    </>
    )
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default App;
