import React from 'react';
import {Image, Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/appConfig';

const Single = ({navigation, route}) => {
  console.log('route params', route.params);
  const singleMedia = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 40, fontStyle: 'italic'}}>
        {singleMedia.title}
      </Text>
      <Image
        style={{width: '100%', resizeMode: 'contain', height: '80%'}}
        source={{
          uri: mediaUrl + singleMedia.filename,
        }}
      />
      <Text style={{fontSize: 20}}>{singleMedia.description}</Text>
      <Text style={{fontSize: 20}}>{singleMedia.mime_type}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
