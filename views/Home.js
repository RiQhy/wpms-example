import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import List from '../components/List';

const Home = (props) => {
  return (
    <SafeAreaView>
      <List navigation={props.navigation} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
