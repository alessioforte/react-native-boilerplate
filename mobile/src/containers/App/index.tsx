import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Login, Register, Home } from '../../screens';
import { colors } from '../../theme';
// import { Provider, useStore } from './store';

const Stack = createStackNavigator();

const options: any = {
  headerStyle: {
    backgroundColor: colors.groundzero,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    display: 'none',
  },
  headerBackTitle: 'Back',
  headerTintColor: '#fff',
  headerBackTitleStyle: {
    color: '#fff',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='Login' component={Login} options={options} />
        <Stack.Screen name='Register' component={Register} options={options} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
