import React from 'react';
import MyMenu from '../components/MyMenu';
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
            <MyMenu />
            <MyPosts />
            <MyCard />
        </div>
    );
}

export default PostListView;
