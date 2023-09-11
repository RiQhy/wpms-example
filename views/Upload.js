import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {placeholderImage} from '../utils/appConfig';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';

const Upload = () => {
  const {postMedia} = useMedia();
  const [image, setImage] = useState(placeholderImage);
  const [type, setType] = useState('image');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const upload = async (uploadData) => {
    console.log('upload', uploadData);
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop;
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: filename,
      type: `${type}/${fileExtension}`,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('load', response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };

  return (
    <Card>
      {type === 'image' ? (
        <Card.Image
          source={{uri: image}}
          style={styles.image}
          onPress={pickImage}
        />
      ) : (
        <Video
          source={{uri: image}}
          style={styles.image}
          useNativeControls={true}
          resizeMode="cover"
        />
      )}
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 10, message: 'minimum 10 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />

      <Button title="Choose Media" onPress={pickImage} />

      <Button title="Submit" onPress={handleSubmit(upload)} />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    heihgt: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

export default Upload;
