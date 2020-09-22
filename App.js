/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/Home';
import {Filters} from './components/Filters';
import {Header} from './components/Header';

const Stack = createStackNavigator();

const App = () => {
  const [wholeFilterCategorys, setWholeFilterCategorys] = useState([]);
  const [tmpState, settmpState] = useState(['ordinary drinks', 'beer']);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [tmpAppliedFilters, setTmpAppliedFilters] = useState({
    'ordinary drinks': true,
    beer: true,
  });
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const data = response.drinks.map((item) => {
          return item.strCategory;
        });
        const filtersToApply = {};
        data.forEach((item) => {
          filtersToApply[item] = true;
        });
        // console.log(data);
        setWholeFilterCategorys(data);
        setAppliedFilters(filtersToApply);
      });
  }, []);

  const checkboxHandler = (filter) => {
    if (tmpAppliedFilters[filter]) {
      setTmpAppliedFilters((prev) => {
        return {
          ...prev,
          [filter]: false,
        };
      });
    } else {
      setTmpAppliedFilters((prev) => {
        return {
          ...prev,
          [filter]: true,
        };
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
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
            }}>
            {(props) => <Home {...props} extraData={'allo'} />}
          </Stack.Screen>
          <Stack.Screen name="Filters">
            {(props) => (
              <Filters
                {...props}
                filterCategorys={tmpState}
                appliedFilters={tmpAppliedFilters}
                checkboxHandler={checkboxHandler}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
