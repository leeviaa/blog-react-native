import createDataContext from './createDataContext'


//set reducer for useReducer hook
const blogReducer = (state, action) => {
  switch(action.type) {
    case 'add_post': 
      return [
        ...state, {id: Math.floor(Math.random() * 99999) ,title: action.payload.title, content: action.payload.content}
      ]
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


const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({type: 'add_post', payload: {title, content}});
    
    if(callback) {
      callback()
    }
  }
  
}

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({type: 'delete_post' , payload: id})
  }
}

const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({type: 'edit_post', payload: {id, title, content}})

    if(callback) {
      callback()
    }
  }
  
}
export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost, editBlogPost}, [{id: 1, title: 'TEST POST', content: "TEST CONTENT"}])
