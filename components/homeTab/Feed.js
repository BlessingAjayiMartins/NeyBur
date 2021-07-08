import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View} from 'react-native'
import { Avatar, Layout, Text, withStyles, List } from '@ui-kitten/components'
import {default as theme} from '../../theme.json'
import { useNavigation } from '@react-navigation/native';



const Feed = ({navigation}) => {
  const DATA = [
  {
    id: 1,
    postTitle: 'Planet of Nature',
    avatarURI:
      'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imageURI:
      'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    randomText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  },
  {
    id: 2,
    postTitle: 'Lampost',
    avatarURI:
      'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imageURI:
      'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    randomText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  }
]
  const renderItem = ({item}) => (
    <Layout style={styles.card}>
      <Image
        source={{ uri: item.imageURI }}
        style={styles.cardImage}
      />
      <Layout style={styles.cardHeader}>
        <Text category='s1' style={styles.cardTitle}>
          {item.postTitle}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}>
            
          <Avatar
            source={{ uri: item.avatarURI }}
            size='small'
            style={styles.cardAvatar}
          />
        </TouchableOpacity>
      </Layout>
      <Layout style={styles.cardContent}>
        <Text category='p2'>{item.randomText}</Text>
      </Layout>
    </Layout>
  )
  
  return (
    <List
    style={styles.container}
    data={DATA}
    renderItem={renderItem}
    keyExtractor={DATA.id}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    // backgroundColor: theme['color-success-500'],
    marginBottom: 25
  },
  cardImage: {
    width: '100%',
    height: 300
  },
  cardHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontWeight: '700',
    // color: theme['color-primary-800']
  },
  cardAvatar: {
    marginRight: 16
  },
  cardContent: {
    fontWeight: '500',
    padding: 10,
    borderWidth: 0.25,
    // borderColor: theme['color-primary-600']
  }
})
// const StyledFeed = withStyles(Feed, theme => ({
//   container: {
//     flex: 1
//   },
//   card: {
//     backgroundColor: theme['color-basic-100'],
//     marginBottom: 25
//   },
//   cardImage: {
//     width: '100%',
//     height: 300
//   },
//   cardHeader: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   cardTitle: {
//     color: theme['color-basic-1000']
//   },
//   cardAvatar: {
//     marginRight: 16
//   },
//   cardContent: {
//     padding: 10,
//     borderWidth: 0.25,
//     borderColor: theme['color-basic-600']
//   }
// }))
export default Feed