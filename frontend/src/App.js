import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { gold } from '@ant-design/colors';
import { ConfigProvider, theme } from 'antd';
import styled from 'styled-components';

import PageHeader from './container/PageHeader';
import PageMenu from './container/PageMenu';
import PageSideBar from './container/PageSideBar';
import PostListView from './container/PostListView';
import PostSingleView from './container/PostSingleView';

const LOCALSTORAGE_KEY = 'lsDarkMode';
const lsDarkMode = localStorage.getItem(LOCALSTORAGE_KEY);

const MainWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
`;

const fontConfig = 'Roboto, "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

function App() {
    // Dark Mode
    const [darkMode, setDarkMode] = useState(lsDarkMode === 'true' || false);
    const [user, setUser] = useState({ name: '匿名使用者', avatar: 'https://www.w3schools.com/howto/img_avatar.png' });
    useEffect(() => {
        const theUser = localStorage.getItem('user');

        if (theUser && !theUser.includes('undefined')) {
            setUser(JSON.parse(theUser));
        }
    }, []);

    const handleThemeChange = () => setDarkMode(!darkMode);
    useEffect(() => localStorage.setItem(LOCALSTORAGE_KEY, darkMode), [darkMode]);

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: gold.primary, fontFamily: fontConfig, isDarkMode: darkMode },
                algorithm: (darkMode) ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            autoInsertSpaceInButton={false}
        >
            <Router>
                <PageHeader
                    darkMode={darkMode}
                    handleThemeChange={handleThemeChange}
                    userEmail={user?.email}
                />
                <MainWrapper>
                    <PageMenu />
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={<PostListView />} />
                        {/* Page List */}
                        <Route path="/posts" element={<PostListView />} />
                        <Route path="/posts/topic/:topicName" element={<PostListView />} />
                        <Route path="/posts/topic/:topicName/:order" element={<PostListView />} />
                        <Route path="/posts/topic/:topicName/:order/:page" element={<PostListView />} />
                        {/* Page Single View */}
                        <Route path="/posts/:postId" element={<PostSingleView />} />
                    </Routes>
                    <PageSideBar username={user.name} avatar={user.avatar} />
                </MainWrapper>
            </Router>
        </ConfigProvider>
    );
}

export default App;
