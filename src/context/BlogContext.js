import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'


//set reducer for useReducer hook
const blogReducer = (state, action) => {
  switch(action.type) {
    case 'get_posts': 
      return action.payload;
    case 'delete_post': 
      return state.filter((blogPost) => {
       return blogPost.id !== action.payload
      })
    case 'edit_post': 
      return state.map((blogPost) => {
        //if blogPost id matches payload id, return action.payload(which is a post) else, return old blogPost
        return blogPost.id === action.payload.id 
          ? action.payload 
          : blogPost
      })
    default:
      return state;
  }

}

const getBlogPosts = dispatch => {
  return async () => {
    //retrieving data from jsonServer package
    const res = await jsonServer.get('/blogposts')
    dispatch({type: 'get_posts', payload: res.data})
  }
}

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', {title, content});
    if(callback) {
      callback()
    }
  }
  
}

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`)
    dispatch({type: 'delete_post' , payload: id})
  }
}

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content})
    dispatch({type: 'edit_post', payload: {id, title, content}})

    if(callback) {
      callback()
    }
  }
  
}
export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts}, [])
