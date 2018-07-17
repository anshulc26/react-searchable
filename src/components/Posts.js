import React, { Component } from 'react'
import axios from 'axios'
import PostPagination from './PostPagination'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Commonheader from '../components/Commonheader'
// const posts = [
//   { id: 1, title: 'First-post',date: '17th July', desc: 'This is first desc'  },
//   { id: 2, title: 'Second-post',date: '18th July', desc: 'This is second desc'},
//   { id: 3, title: 'Third-post',date: '19th July', desc: 'This is third posts desc'}
// ];
function isSearching(text){
  return text.length > 0;
}

class Posts extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      pageOfItems: [],
      searchString: '',
      searchedItems: []
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/v1/ideas.json')
    .then(response => {
      this.setState({
        posts: response.data
      });
    })
    .catch(error => console.log(error));
  }
  onChangePage(page, perPage){
    axios.get(`http://localhost:4000/api/v1/ideas?page=${page}&per=${perPage}`)
    .then(response => {
      this.setState({ pageOfItems: response.data });
    })
    .catch(error => console.log(error))
  }

  handleChange(e){
    let search = e.target.value.trim();
    axios.get(`http://localhost:4000/api/v1/search?search=${search}`)
    .then(response => {
      this.setState({
        searchString: search,
        isSearching: !this.state.isSearching,
        searchedItems: response.data.ideas
      });
    })
    .catch(error => console.log(error));
  }

  render() {
    const items = isSearching(this.state.searchString) ? this.state.searchedItems : this.state.pageOfItems
    const postNode = items.map((post) => {
            return (
              <div className="row" key={post.id}>
                <div className='col-sm-3'></div>
                <div className="col-sm-9">
                  <h3 className="blog-post-title">
                 <Link
                    to={"/posts/"+post.title}
                    key={post.id}>
                    {post.title}
                </Link>

                </h3>
                <p className="blog-post-meta">{moment(post.created_at).format("MMM DD YYYY, h:mm a")}</p>
                <p>{post.body}</p>
              </div>
            </div>
            )
        });
    const postLength = isSearching(this.state.searchString) ? this.state.searchedItems.length : this.state.posts.length
    const paginate = isSearching(this.state.searchString) ? '' : <PostPagination itemsLength={postLength} onChangePage={this.onChangePage} />
    return (
      <div className="container news-timeline">
      <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search here..." />
        <div id="latestNews">
          {postNode}
          {paginate}
        </div>

      </div>

    );
  }
}

export default Posts;
