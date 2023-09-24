import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/appConfig';
import {Button, Card, ListItem, Text} from '@rneui/themed';
import {formatDate} from '../utils/functions';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite, useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import {ScrollView} from 'react-native';

const Single = ({navigation, route}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(true);
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesById, deleteFavourite} = useFavourite();
  const {user} = useContext(MainContext);
  const [likes, setLikes] = useState([]);

  const videoRef = useRef(null);

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
    media_type: mediaType,
    file_id: fileId,
  } = route.params;

  // fetch owner info

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(userId, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // add favourite
  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite({file_id: fileId}, token);
      response && setUserLike(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  // delete favourite
  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(fileId, token);
      response && setUserLike(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  // get favouritesbyid
  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesById(fileId);
      setLikes(likesData);
      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // check favourite

  const unlockOrientation = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error(error.message);
    }
  };

  const lockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.current.presentFullscreenPlayer();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    unlockOrientation();
    fetchOwner();
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          videoRef.current && showVideoInFullscreen();
        }
      },
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lockOrientation();
    };
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  return (
    <ScrollView>
      <Card containerStyle={{backgroundColor: 'green'}}>
        <Card.Title style={{fontSize: 40, fontStyle: 'italic'}}>
          {title}
        </Card.Title>
        {mediaType === 'image' ? (
          <Card.Image
            size="large"
            source={{
              uri: mediaUrl + filename,
            }}
            resizeMode="center"
            style={{height: 300}}
          />
        ) : (
          <Video
            source={{uri: mediaUrl + filename}}
            style={{height: 300}}
            useNativeControls
            shouldPlay={true}
            isLooping={true}
            ref={videoRef}
          />
        )}
        <ListItem>
          <ListItem.Content backgroundColor="yellow">
            <Text style={{fontSize: 20}}>{description}</Text>
            <Text>size: {Math.round(filesize / 1024)} kB</Text>
            <Text>user_id: {userId}</Text>
            <Text>Uploaded: {formatDate(timeAdded)}</Text>
            <Text>id: {owner.username}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          {userLike ? (
            <Button onPress={removeFavourite} title={'Unlike'} />
          ) : (
            <Button onPress={createFavourite} title={'Like'} />
          )}
          <Text> Total likes: {likes.length} </Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
