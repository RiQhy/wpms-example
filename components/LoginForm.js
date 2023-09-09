import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useAuthentication} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Button, Card, Input, Text} from '@rneui/themed';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const logIn = async (loginData) => {
    try {
      const loginResponse = await postLogin(loginData);
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setIsLoggedIn(true);
      setUser(loginResponse.user);
    } catch (error) {
      console.error('login failed', error);
      {
        errors.password && errors.username && (
          <Text>Login failed, Incorrect password/username</Text>
        );
      }
    }
  };

  return (
    <Card>
      <Card.Title>Login Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(logIn)} />
    </Card>
  );
};

export default LoginForm;
