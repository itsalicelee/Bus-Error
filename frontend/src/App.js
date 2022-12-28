import React from 'react';
import MyMenu from './components/MyMenu';
import MyHeader from './components/MyHeader';
import MyPosts from './components/MyPosts';

const containerStyle = {
    display: 'flex',
    maxWidth: '1200px',
    marginRight: 'auto',
    marginLeft: 'auto',
};

function App() {
    return (
        <>
            <MyHeader />
            <div style={containerStyle}>
                <MyMenu />
                <MyPosts />
            </div>
        </>
    );
}

export default App;
