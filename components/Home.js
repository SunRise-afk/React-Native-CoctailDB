import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export const Home = (props) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.contentContainer}
        data={props.content}
        keyExtractor={(item) => item.idDrink}
        renderItem={({item}) => {
          return (
            <View style={styles.drinkContainer}>
              {item.strDrinkThumb && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: `${item.strDrinkThumb}`}}
                    style={styles.drinkImage}
                  />
                </View>
              )}
              <Text>{item.strDrink}</Text>
            </View>
          );
        }}
        onEndReached={() => props.onEndReachedHandler()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  drinkContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    marginRight: 20,
  },
  drinkImage: {
    width: '100%',
    height: '100%',
  },
});
