import { colors } from '../theme';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Home from './Home';

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

const screens = {
  protected: [{ name: 'Home', component: Home, options: {} }],
  public: [
    { name: 'Welcome', component: Welcome, options: { headerShown: false } },
    { name: 'Login', component: Login, options },
    { name: 'Register', component: Register, options },
  ],
};

export default screens;
