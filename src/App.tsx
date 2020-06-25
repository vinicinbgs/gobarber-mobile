import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="default" />
    <View style={styles.view}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
