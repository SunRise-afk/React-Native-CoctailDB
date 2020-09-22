import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export const Header = (props) => {
  const openFilters = () => {
    props.navigation.navigate('Filters');
  };
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerText}>{props.title}</Text>
      <TouchableOpacity
        onPress={openFilters}
        style={styles.headerImageTouchable}>
        <Image
          source={require('../common/baseline_filter_alt_black_18dp232.png')}
          style={styles.headerImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#333',
    letterSpacing: 1,
  },
  headerImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
    marginTop: 5,
  },
  headerImageTouchable: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
  },
});
