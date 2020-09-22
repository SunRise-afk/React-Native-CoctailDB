import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

export const Filters = (props) => {
  console.log(props);
  return (
    <View>
      <View>
        {props.filterCategorys ? (
          props.filterCategorys.map((item) => {
            return (
              <TouchableOpacity
                style={styles.filterItemContainer}
                onPress={() => props.checkboxHandler(item)}>
                <Text style={styles.filterItemText}>
                  {item.slice(0, 1).toUpperCase() + item.slice(1)}
                </Text>
                {props.appliedFilters[item] && (
                  <Image
                    source={require('../common/baseline_done_black_18dp.png')}
                    style={styles.checkBoxIcon}
                  />
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Just a few seconds...</Text>
        )}
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginVertical: 5,
  },
  filterItemText: {
    fontSize: 20,
    color: '#555',
    marginLeft: 20,
  },
  checkBoxIcon: {
    position: 'absolute',
    right: 20,
  },
});
