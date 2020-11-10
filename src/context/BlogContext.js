import createDataContext from './createDataContext'


//set reducer for useReducer hook
const blogReducer = (state, action) => {
  switch(action.type) {
    case 'add_post': 
      return [
        ...state, {id: Math.floor(Math.random() * 99999) ,title: `Blog post number ${state.length + 1}`}
      ]
    case 'delete_post': 
      return state.filter((blogPost) => {
       return blogPost.id !== action.payload
      })
    default:
      return state;
  }

}


const addBlogPost = (dispatch) => {
  return () => {
    dispatch({type: 'add_post'})
  }
  
}

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({type: 'delete_post' , payload: id})
  }
}

export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost}, [])
