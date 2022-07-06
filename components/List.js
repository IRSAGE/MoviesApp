import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
};

const List = ({navigation, content, title}) => {
  return (
    <View style={styles.listView}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={content}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
      />
    </View>
  );
};

export default List;
List.prototype = propTypes;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  listView: {
    marginTop: 10,
  },
});
