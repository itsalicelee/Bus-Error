import React from 'react';
import PageMenu from './PageMenu';
import PostList from '../components/PostList';
import PageSideBar from '../components/PageSideBar';

const containerStyle = {
    display: 'flex',
    maxWidth: '1400px',
    marginRight: 'auto',
    marginLeft: 'auto',
};

function PostListView() {
    return (
        <div style={containerStyle}>
            <PageMenu />
            <PostList />
            <PageSideBar />
        </div>
    );
}

export default PostListView;
