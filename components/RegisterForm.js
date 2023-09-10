import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import {PropTypes} from 'prop-types';

const RegisterForm = ({setToggleRegister}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    try {
      delete registerData.confirm_password;
      const registerResponse = await postUser(registerData);
      Alert.alert('Registering was successful', registerResponse.message);
      setToggleRegister(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card>
      <Card.Title>Register Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'minimum length is 3 characters'},
          validate: async (value) => {
            try {
              const isAvailable = await checkUsername(value);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.error(error);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
            return value === password ? true : 'Passwords dont match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'minimum length is 5 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          pattern: {
            value: /\S+@\S+\.\s+$/,
            message: 'must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="full_name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(register)} />
    </Card>
  );
};

RegisterForm.propTypes = {
  setToggleRegister: PropTypes.func,
};

export default RegisterForm;
