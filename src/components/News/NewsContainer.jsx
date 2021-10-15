import React from 'react'
import News, { FeedBlock } from './News';
import { loadPostsTC, addNewPost, deletePost, addNewPostTC } from '../../redux/feed-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import moment from 'moment';
import { getAuthUserData } from '../../redux/profile-reducer';

class NewsContainer extends React.Component {
    
    componentDidMount(){
        this.props.loadPostsTC(this.props.nextPage, this.props.pageSize);
    }

    whatsNewSubmit = async (data) => {
        if(!this.props.authProfile){
            if(!this.props.profile || this.props.profile.userId !== this.props.authId) {
                await this.props.getAuthUserData(this.props.authId);
            } 
        } 
        let profile = this.props.authProfile || this.props.profile;
        
        this.props.addNewPostTC({
            "postId": profile.fullName + moment().format(),
            "source": {
                "id": profile.userId,
                "name": profile.fullName,
              },
              "avatar": profile.photos.small,
              "title": data.postData,
              "publishedAt": moment(),
              "likesCount": 0
        });
    }

    postsMap = (noAvatar) => {
       return this.props.posts.map(post => {
            return <div key={post.publishedAt}><FeedBlock postId={post.postId} id={post.source.id} text={post.title} 
                avatar={post.avatar} nv={noAvatar} author={post.source.name} data={post.publishedAt}
                postLink={post.url} likesCount={post.likesCount} img={post.urlToImage}
                isAuthPost={post.source.id === this.props.authId} deletePost={this.props.deletePost}/></div>
        })
    }
   
    render() {
        if(this.props.posts.length > 2) {
        return (
            <News news={this.news} posts={this.props.posts} loadPosts={this.props.loadPostsTC}
                currentPage={this.props.currentPage} lastPostTime={this.props.lastPostDate} whatsNewSubmit={this.whatsNewSubmit}
                postsMap={this.postsMap} />
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
        lastPostDate: state.feed.lastPostDate,
        nextPage: state.feed.nextPage,
        pageSize: state.feed.pageSize,
        authUserName: state.auth.login,
        profile: state.profilePage.profile,
        authProfile: state.profilePage.authProfile,
        authId: state.auth.userId
    }
}

export default connect(mapStateToProps, {loadPostsTC, addNewPostTC, getAuthUserData, deletePost})(NewsContainer);