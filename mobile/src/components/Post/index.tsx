import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default () => {
  return (
    <View style={styles.post}>
      <View style={styles.body}>
        <Text>This is a Post</Text>
      </View>
      <View style={styles.footer}>
        <Text>Icons</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    maxHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 20,
    marginBottom: 40,
  },
  body: {
    backgroundColor: '#888',
    height: '100%',
  },
  footer: {
    backgroundColor: '#999',
    height: 32,
  }
})