import React, { Component } from 'react'

class Post extends Component {
  render() {
    // TODO section
    return (
      <div>
        <h3>{this.props.match.params.title}</h3>
      </div>
    );
  }
}

export default Post;
