import React, { Component } from 'react';


class Blog extends React.Component {

  sidebar;
  content;

  constructor(props) {
    super(props);
    this.sidebar = (
      <ul>
        {props.posts.map((post) =>
          <li key={post.id}>
            {post.title}
          </li>
        )}
      </ul>
    );

    this.content = props.posts.map((post) =>
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );

  }

  render() {
    return (
      <div>
        {this.sidebar}
        <hr />
        {this.content}
      </div>
    );
  }

}

export default Blog;