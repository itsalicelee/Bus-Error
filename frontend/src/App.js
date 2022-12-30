import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { gold } from '@ant-design/colors';
import { ConfigProvider, theme } from 'antd';

import Header from './container/Header';
import PostListView from './container/PostListView';

const colorAlgorithm = theme.defaultAlgorithm;
// const colorAlgorithm = theme.darkAlgorithm;

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: gold.primary,
                    fontFamily: 'Roboto, "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                },
                algorithm: colorAlgorithm,
            }}
        >
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<PostListView />} />
                    <Route path="/posts" element={<PostListView />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;
