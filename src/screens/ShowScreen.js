import React, {useContext} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext'

const ShowScreen = ({navigation}) => {
  //get state from context hook
  const {state} = useContext(Context)
  //finding post using find() method from state object 
  const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'))

  return (
    <View>
      <Text>{blogPost.title} </Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default ShowScreen;