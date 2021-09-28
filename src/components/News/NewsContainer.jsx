import React from 'react'
import News from './News';
import { loadPostsTC } from '../../redux/feed-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import moment from 'moment';

class NewsContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.props.loadPostsTC();
    }
   
    render() {
        if(this.props.posts.length > 2) {
        return (
            <News news={this.news} posts={this.props.posts} loadPosts={this.props.loadPostsTC}
                currentPage={this.props.currentPage} lastPostTime={this.props.lastPostDate} />
        )}
        else {
            return (
                <Preloader />
            )
        }
    }
}

var mapStateToProps = (state) => {
    return {
        posts: state.feed.posts,
        currentPage: (state.feed.nextPage - 1),
        lastPostDate: state.feed.lastPostDate
    }
}



export default connect(mapStateToProps, {loadPostsTC})(NewsContainer);