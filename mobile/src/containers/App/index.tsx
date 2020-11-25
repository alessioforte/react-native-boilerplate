import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import screens from '../../screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Route = ({ component: Component, ...rest }) => {
  return <Component {...rest} />;
};

const App = () => {
  const isAuth = false;
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <Stack.Navigator initialRouteName='Welcome'>
        {!isAuth &&
          screens.public.map((screen) => {
            const { component, name, options } = screen;
            return (
              <Stack.Screen
                children={(props) => (
                  <Route component={component} {...props} />
                )}
                name={name}
                options={options}
              />
            );
          })}
        {isAuth &&
          screens.protected.map((screen) => (
            <Stack.Screen
              children={(props) => (
                <Route component={screen.component} {...props} />
              )}
              name={screen.name}
              options={screen.options}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
