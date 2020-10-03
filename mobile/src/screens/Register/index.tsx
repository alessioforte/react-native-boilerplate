import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../theme';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation registerUser(
    $firstname: String
    $username: String
    $lastname: String
    $email: String
    $password: String
  ) {
    register(
      firstname: $firstname
      username: $username
      lastname: $lastname
      email: $email
      password: $password
    ) {
      accessToken
      refreshToken
      expiresIn
    }
  }
`;

export default () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const form = useForm();
  const { getValues, setValue } = form
  useEffect(() => {
    form.register('givenName');
    form.register('name');
    form.register('username');
    form.register('email');
    form.register('password');
  }, []);

  const submit = () => {
    const { givenName, name, email, username, password } = getValues();
    register({
      variables: {
        firstname: givenName,
        lastname: name,
        email,
        username,
        password,
      },
    });
  };

  return (
    <View style={styles.register}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='First name'
          placeholderTextColor='#fff'
          textContentType='givenName'
          onChangeText={(value) => setValue('givenName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Last name'
          placeholderTextColor='#fff'
          textContentType='name'
          onChangeText={(value) => setValue('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='#fff'
          textContentType='username'
          autoCapitalize='none'
          onChangeText={(value) => setValue('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='#fff'
          autoCapitalize='none'
          onChangeText={(value) => setValue('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='#fff'
          textContentType='password'
          secureTextEntry
          onChangeText={(value) => setValue('password', value)}
        />
        <Button kind='primary' label='Register' onPress={submit} />
        <View style={styles.error}>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  register: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.groundzero,
  },
  title: {
    color: '#fff',
  },
  container: {
    padding: 20,
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    borderColor: '#5a5a5a',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#5a5a5a',
  },
  error: {
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center'
  }
});
