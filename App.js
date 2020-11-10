
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen';
import {Provider} from './src/context/BlogContext'
import ShowScreen from './src/screens/ShowScreen'
import CreateScreen from './src/screens/CreateScreen'

const navigator = createStackNavigator({
  Index: IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Blogs'
  }
});

//Requirement of react native is that it exports atleast one react component, below solves that issue so that we can wrap with a **provider** for global state managemement

//calling createAppContainer returns simple React Component, that shows our screens in navigator. 
//set appcontainer with navigator to a variable
const App =  createAppContainer(navigator)

//create custom component that has access to global state by wrapping App level component with the provider
export default () => {
  return (
  <Provider>   
       <App />
  </Provider>
  )
}