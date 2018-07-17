import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Posts from './components/Posts'
import Post from './components/Post'
import ImageUpload from './components/ImageUpload'
import SelectSearch from './components/SelectSearch'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path="/posts/:title" component={Post}/>
      <Route path='/posts' component={Posts}/>
      <Route path='/images' component={ImageUpload}/>
      <Route path='/searchable' component={SelectSearch}/>
    </Switch>
  </Router>, document.getElementById('root'));
registerServiceWorker();
