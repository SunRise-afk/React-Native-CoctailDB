/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/Home';
import {Filters} from './components/Filters';
import {Header} from './components/Header';

const Stack = createStackNavigator();

const App = () => {
  const [wholeFilterCategories, setWholeFilterCategories] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [filteredArray, setFilteredArray] = useState({});
  const [content, setContent] = useState([]);
  const [isNothingToFetch, setIsNothingToFetch] = useState(false);
  const getContent = (arrayForFetching = filteredArray) => {
    if (!isNothingToFetch || arrayForFetching.categories.length == 0) {
      if (
        arrayForFetching.numOfReachedCategories ==
        arrayForFetching.categories.length
      ) {
        setContent((prev) => {
          return [
            ...prev,
            {
              idDrink: Date.now().toString(),
              strDrink: "Sorry, but it's the end of list. Try other filters.",
            },
          ];
        });
        setIsNothingToFetch(true);
      } else {
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${
            arrayForFetching.categories[arrayForFetching.numOfReachedCategories]
          }`,
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setContent((prev) => {
              return [
                ...prev,
                {
                  idDrink: Date.now().toString(),
                  strDrink:
                    arrayForFetching.categories[
                      arrayForFetching.numOfReachedCategories
                    ],
                },
                ...response.drinks,
              ];
            });
            setFilteredArray((prev) => {
              return {
                ...prev,
                numOfReachedCategories: prev.numOfReachedCategories + 1,
              };
            });
            setInitializing((prev) => false);
          });
      }
    }
  };
  const getFilteredArray = (
    isFetching = initializing,
    inputObject = appliedFilters,
  ) => {
    console.log(inputObject, isFetching);
    setIsNothingToFetch(false);
    setContent((prev) => []);
    let result = [];
    for (let key in inputObject) {
      if (inputObject[key]) {
        result.push(key);
      }
    }
    setFilteredArray({
      categories: result,
      numOfReachedCategories: 0,
    });
    if (isFetching) {
      getContent({
        categories: result.sort(),
        numOfReachedCategories: 0,
      });
    }
  };
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
        setWholeFilterCategories(data);
        setAppliedFilters(filtersToApply);
        getFilteredArray(initializing, filtersToApply);
      })
      .catch((error) => console.log(error));
  }, []);

  const checkboxHandler = (filter) => {
    if (appliedFilters[filter]) {
      setAppliedFilters((prev) => {
        return {
          ...prev,
          [filter]: false,
        };
      });
    } else {
      setAppliedFilters((prev) => {
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
            {(props) =>
              initializing ? (
                <Text>loading...</Text>
              ) : (
                <Home
                  {...props}
                  content={content}
                  onEndReachedHandler={getContent}
                />
              )
            }
          </Stack.Screen>
          <Stack.Screen name="Filters">
            {(props) => (
              <Filters
                {...props}
                filterCategories={wholeFilterCategories}
                appliedFilters={appliedFilters}
                checkboxHandler={checkboxHandler}
                onSubmitHandler={getFilteredArray}
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
