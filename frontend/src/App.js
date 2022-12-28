import React from 'react';
import './App.css';
import MyMenu from './components/MyMenu';
import MyHeader from './components/MyHeader';
import MyPosts from './components/MyPosts';
import MyCard from './components/MyCard';

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
                <MyCard />
            </div>
        </>
    );
}

export default App;
