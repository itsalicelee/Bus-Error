import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { gold } from '@ant-design/colors';
import { ConfigProvider, theme } from 'antd';

import PageHeader from './container/PageHeader';
import PostListView from './container/PostListView';
import PostSingleView from './container/PostSingleView';

const LOCALSTORAGE_KEY = 'lsDarkMode';
const lsDarkMode = localStorage.getItem(LOCALSTORAGE_KEY);

function App() {
    const [darkMode, setDarkMode] = useState(lsDarkMode === 'true' || false);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_KEY, darkMode);
    }, [darkMode]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: gold.primary,
                    fontFamily: 'Roboto, "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                },
                algorithm: (darkMode) ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <Router>
                <PageHeader darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Routes>
                    <Route path="/" element={<PostListView />} />
                    <Route path="/posts" element={<PostListView />} />
                    <Route path="/posts/tag/:tagName" element={<PostListView />} />
                    <Route path="/posts/:postId" element={<PostSingleView />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;
