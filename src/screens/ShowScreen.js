import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext'
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({navigation}) => {
  //get state from context hook
  const {state} = useContext(Context)
  //finding post using find() method from state object 
  const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'))

  return (
    <View>
      <Text>{blogPost.title} </Text> 
      <Text>{blogPost.content}</Text> 
    </View>
  )
}

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
          <EvilIcons name="pencil" size={30} color="black" />
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  
});

export default ShowScreen;