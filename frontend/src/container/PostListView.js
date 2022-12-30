import React from 'react';
import PageMenu from '../components/PageMenu';
import MyPosts from '../components/PostList';
import MyCard from '../components/MyCard';

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
            <MyPosts />
            <MyCard />
        </div>
    );
}

export default PostListView;
