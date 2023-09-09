import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Button, Card, Input, Text} from '@rneui/themed';

const RegisterForm = () => {
  const {postUser} = useUser();
  const {user} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });

  const Register = async (userData) => {
    try {
      const registerResponse = await postUser(userData);
      await AsyncStorage.setItem('userInformation', registerResponse.user);
      user(registerResponse.user);
    } catch (error) {
      console.error('Registering failed', error);
    }
  };

  return (
    <Card>
      <Card.Title>Register Form</Card.Title>
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
      {errors.password && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="full_name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(Register)} />
    </Card>
  );
};

export default RegisterForm;
