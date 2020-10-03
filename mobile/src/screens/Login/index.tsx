import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../theme';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      expiresIn
    }
  }
`;

export default () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const { register, setValue, getValues } = useForm();

  useEffect(() => {
    register('username');
    register('password');
  }, []);

  const submit = () => {
    const { username, password } = getValues();
    login({ variables: { email: username, password } });
  };

  console.log({ data, loading, error });
  return (
    <View style={styles.login}>
      {loading ? (
        <Text style={styles.title}>loading...</Text>
      ) : (
        <Text style={styles.title}>Login</Text>
      )}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='#fff'
          textContentType='username'
          autoCapitalize='none'
          onChangeText={(value) => setValue('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='#fff'
          textContentType='password'
          secureTextEntry
          onChangeText={(value) => setValue('password', value)}
        />
        <Button kind='primary' label='Login' onPress={submit} />
        <View style={styles.error}>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
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
