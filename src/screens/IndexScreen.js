import React, {useContext, useEffect} from 'react';
import {View,Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import { Context } from '../context/BlogContext'
import { Feather } from '@expo/vector-icons';

const IndexScreen  = ({navigation}) => {
  //extracting value to a variable from useContext hook and passing it the provider
  //destructure to get func and data out of object 
  const {state , addBlogPost, deleteBlogPost, getBlogPosts} = useContext(Context);

  //use effect hook to call getBlogPosts() just once when component loads
  useEffect(() => {
    getBlogPosts();

    //any time index screen gains focus, run this callback on addListeer
    //set to variable of listener so that we can clean it up as needed
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    })
    //this function will be invoked if index screen is removed from stack
    return () => {
      //remove listener to prevent memory leaks
      listener.remove();
    }
  }, [])

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id.toString()}
        renderItem={({item }) => {
          return (
          <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id})}>
              <View style={styles.row}>
              <Text style={styles.title}>{item.title}---{item.id}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                 <Feather style={styles.icon} name="trash" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
            
          )
        }}
      />
    </View>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24
  }
  
});

export default IndexScreen