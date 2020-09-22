import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

export const Filters = (props) => {
  const onPressApplyHandler = () => {
    props.onSubmitHandler(true);
    props.navigation.goBack();
  };
  return (
    <View>
      <View>
        {props.filterCategories ? (
          props.filterCategories.map((item) => {
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
      <TouchableOpacity
        style={styles.applyButton}
        onPress={onPressApplyHandler}>
        <View style={styles.applyTextContainer}>
          <Text style={styles.applyText}>APPLY</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
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
  applyButton: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  applyTextContainer: {
    height: '100%',
    width: '90%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  applyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
