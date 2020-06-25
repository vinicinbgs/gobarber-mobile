import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import AppProvider from "./hooks";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#313030'
  },
});

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="default"/>
    <AppProvider>
      <View style={styles.view}>
        <Routes/>
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
