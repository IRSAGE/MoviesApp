import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
const defaultProps = {
  main: false,
};
class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Image
              source={require('../assets/images/movies.png')}
              style={{height: 50, width: 50}}
            />
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Search
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              margin: 10,
              height: 40,
              width: 40,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4481FC',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
              {'<'}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}

export default NavBar;
NavBar.defaultProps = defaultProps;
