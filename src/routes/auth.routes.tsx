import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="SignIn" component={SignIn} />
    <App.Screen name="SignUp" component={SignUp} />
  </App.Navigator>
);

export default AuthRoutes;
