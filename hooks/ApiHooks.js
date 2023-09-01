import {useEffect, useState} from 'react';
import {apiUrl} from '../utils/appConfig';
import {doFetch} from '../utils/functions';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + 'media');
      const mediaFiles = await Promise.all(
        json.map(async (item) => {
          const fileData = await doFetch(apiUrl + 'media/' + item.file_id);
          return fileData;
        }),
      );
      setMediaArray(mediaFiles);
    } catch (error) {
      console.error('loadMedia failed', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (user) => {
    try {
      console.log('hey', apiUrl + 'login');
      return await doFetch(apiUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.error('postLogin error', error);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(apiUrl + 'users/user', options);
  };

  return {getUserByToken};
};

export {useMedia, useAuthentication, useUser};
