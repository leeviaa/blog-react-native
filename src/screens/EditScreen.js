import React, { useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm'

const EditScreen = ({navigation}) => {
  //pull out id 
  const id = navigation.getParam('id')
  //pull state from useContext
  const {state, editBlogPost} = useContext(Context);
  //find correct blog post by id from state 
  const blogPost = state.find(blogPost => blogPost.id === id)

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title,content) => {
      editBlogPost(id, title, content, () => navigation.pop())
       }} 
    />
  )
}

const styles = StyleSheet.create({
  
});

export default EditScreen