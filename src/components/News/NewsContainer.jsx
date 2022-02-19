import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { change, getFormValues } from 'redux-form';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { addCommentTC } from '../../redux/comments-reducer';
import { addNewPostTC, deletePost, loadPostsTC } from '../../redux/feed-reducer';
import { getAuthUserData } from '../../redux/profile-reducer';
import store from '../../redux/redux-store.js';
import Preloader from '../common/Preloader/Preloader';
import News, { FeedBlock } from './News';

class NewsContainer extends React.Component {

    componentDidMount() {
        this.props.loadPostsTC(this.props.nextPage, this.props.pageSize);
        if (!this.props.authProfile) {
            if (!this.props.profile || this.props.profile.userId !== this.props.authId) {
                this.props.getAuthUserData(this.props.authId);
            }
        }
    }

    addValueToMessage = async (symbol, postId) => {
       let state = store.getState();
       let message = getFormValues(postId)(state);
        if(message && message.comment.length > 0){
            this.props.change(postId, "comment", message.comment + symbol.native);
        } else {
            this.props.change(postId, "comment", symbol.native);
        }
    }

    addComment = async (data, postId) => {    
        let profile = this.props.authProfile || this.props.profile;
        let currentT = moment().format();
        let message = {
        id: `${profile.userId}_${currentT}_${Math.random() * 100}_commentId`, 
        postId: postId, 
        senderId: profile.userId, 
        avatar: profile.photos.small,
        fullName: profile.fullName, 
        text: data.comment, 
        data: currentT, 
        likes: 0
        }
        this.props.addCommentTC(message);
    }


    whatsNewSubmit = async (data) => {
        let profile = this.props.authProfile || this.props.profile;
        if (data.postData && data.postData.length > 0) {
            let time = moment().format();
            this.props.addNewPostTC({
                "source": {
                    "id": profile.userId,
                    "postId": profile.fullName.split(' ')[0] + time + "_postId",
                    "name": profile.fullName,
                },
                "avatar": profile.photos.small,
                "title": data.postData,
                "publishedAt": time,
                "likesCount": 0
            });
        } else alert("Your message is empty, or you provided incorrect data.");
    }

    postsMap = (noAvatar) => {
        return this.props.posts.map(post => {
            return <div key={post.source.postId + "_key"}><FeedBlock content={post.content} addValueToMessage={this.addValueToMessage} 
                postId={post.source.postId} id={post.source.id} text={post.title}
                avatar={post.avatar} nv={noAvatar} author={post.source.name} data={post.publishedAt}
                postLink={post.url} likesCount={post.likesCount} img={post.urlToImage}
                isAuthPost={post.source.id === this.props.authId} deletePost={this.props.deletePost}
                isPopup={true} comments={this.props.comments.filter(c => c.postId === post.source.postId)} addComment={this.addComment} /></div>
        })
    }

    render() {
        if (this.props.posts.length > 2) {
            return (
                <News news={this.news} posts={this.props.posts} loadPosts={this.props.loadPostsTC}
                    currentPage={this.props.currentPage} lastPostTime={this.props.lastPostDate} whatsNewSubmit={this.whatsNewSubmit}
                    postsMap={this.postsMap} />
            )
        }
        else return <Preloader />;
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
        authId: state.auth.userId,
        comments: state.comments.list
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { loadPostsTC, addNewPostTC, getAuthUserData, deletePost, change, getFormValues, addCommentTC }),
)(NewsContainer);