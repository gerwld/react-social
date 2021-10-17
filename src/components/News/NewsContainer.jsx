import React from 'react'
import News, { FeedBlock } from './News';
import { loadPostsTC, deletePost, addNewPostTC } from '../../redux/feed-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import moment from 'moment';
import { getAuthUserData } from '../../redux/profile-reducer';
import { change, getFormValues } from 'redux-form';
import store from '../../redux/redux-store.js'

class NewsContainer extends React.Component {

    componentDidMount() {
        this.props.loadPostsTC(this.props.nextPage, this.props.pageSize);
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


    whatsNewSubmit = async (data) => {
        if (data.postData && data.postData.length > 0) {
            if (!this.props.authProfile) {
                if (!this.props.profile || this.props.profile.userId !== this.props.authId) {
                    await this.props.getAuthUserData(this.props.authId);
                }
            }
            let profile = this.props.authProfile || this.props.profile;
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
            return <div key={post.source.postId}><FeedBlock addValueToMessage={this.addValueToMessage} postId={post.source.postId} id={post.source.id} text={post.title}
                avatar={post.avatar} nv={noAvatar} author={post.source.name} data={post.publishedAt}
                postLink={post.url} likesCount={post.likesCount} img={post.urlToImage}
                isAuthPost={post.source.id === this.props.authId} deletePost={this.props.deletePost} /></div>
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
        authId: state.auth.userId
    }
}


export default connect(mapStateToProps, { loadPostsTC, addNewPostTC, getAuthUserData, deletePost, change, getFormValues })(NewsContainer);