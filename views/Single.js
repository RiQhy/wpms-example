import React from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/appConfig';
import {Card, ListItem} from '@rneui/themed';
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
          <ListItem.Subtitle style={{fontSize: 20}}>
            {description}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            size: {Math.round(filesize / 1024)} kB
          </ListItem.Subtitle>
          <ListItem.Subtitle>user_id: {userId}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Uploaded: {formatDate(timeAdded)}
          </ListItem.Subtitle>
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
