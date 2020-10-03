import React from 'react';
import { ScrollView, SafeAreaView, Button, StyleSheet } from 'react-native';
import { Post } from '../../components';
import Constants from 'expo-constants'

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Button
          title='Go to Login'
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   home: {
//     flex: 1,
//     alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
