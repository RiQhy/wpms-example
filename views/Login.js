import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card} from '@rneui/themed';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(token);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Card>
      <Card.Title>Login</Card.Title>
      <LoginForm />
      <Card.Title>Register</Card.Title>
      <RegisterForm />
    </Card>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
