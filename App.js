/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/Home';
import {Filters} from './components/Filters';
import {Header} from './components/Header';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation}) => {
              return {
                headerTitle: () => (
                  <Header navigation={navigation} title="Drinks" />
                ),
                headerStyle: {
                  backgroundColor: '#fff',
                  height: 60,
                },
                headerTintColor: '#eee',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              };
            }}
          />
          <Stack.Screen name="Filters" component={Filters} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
