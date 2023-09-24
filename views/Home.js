import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';

const Home = ({navigation}) => {
  return <List navigation={navigation} />;
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
