import React from 'react'
import News from './News';
import { loadPostsTC } from '../../redux/feed-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';

class NewsContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.props.loadPostsTC();
    }

    render() {
        if(this.props.posts.length > 3) {
        return (
            <News news={this.news} posts={this.props.posts} loadPosts={this.props.loadPostsTC} />
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
        posts: state.feed.posts
    }
}



export default connect(mapStateToProps, {loadPostsTC})(NewsContainer);