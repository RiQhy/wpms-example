import React from 'react';
import PropTypes from 'prop-types';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import List from '../components/List';

const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={props.navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
