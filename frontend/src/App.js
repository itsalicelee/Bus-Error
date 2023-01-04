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

import { AuthProvider } from './hooks/useAuth';

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
    const handleThemeChange = () => setDarkMode(!darkMode);
    useEffect(() => localStorage.setItem(LOCALSTORAGE_KEY, darkMode), [darkMode]);

    const [user, setUser] = useState({});

    useEffect(() => {
        const usrLsItem = localStorage.getItem('user');
        if (usrLsItem && !usrLsItem.includes('undefined')) setUser(JSON.parse(usrLsItem));
    }, []);

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: gold.primary, fontFamily: fontConfig, isDarkMode: darkMode },
                algorithm: (darkMode) ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            autoInsertSpaceInButton={false}
        >
            <AuthProvider>
                <Router>
                    <PageHeader
                        darkMode={darkMode}
                        handleThemeChange={handleThemeChange}
                        user={user}
                        setUser={setUser}
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
                        <PageSideBar user={user} />
                    </MainWrapper>
                </Router>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;
