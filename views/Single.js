import React from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/appConfig';
import {Card, ListItem, Text} from '@rneui/themed';
import {formatDate} from '../utils/functions';

const Single = ({navigation, route}) => {
  // console.log('route params', route.params);
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
  } = route.params;
  return (
    <Card containerStyle={{backgroundColor: 'green'}}>
      <Card.Title style={{fontSize: 40, fontStyle: 'italic'}}>
        {title}
      </Card.Title>
      <Card.Image
        size="large"
        source={{
          uri: mediaUrl + filename,
        }}
        resizeMode="center"
        style={{height: 300}}
      />
      <ListItem>
        <ListItem.Content backgroundColor="yellow">
          <Text style={{fontSize: 20}}>{description}</Text>
          <Text>size: {Math.round(filesize / 1024)} kB</Text>
          <Text>user_id: {userId}</Text>
          <Text>Uploaded: {formatDate(timeAdded)}</Text>
        </ListItem.Content>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
