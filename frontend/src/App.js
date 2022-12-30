import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { gold } from '@ant-design/colors';
import { ConfigProvider, theme } from 'antd';

import PageHeader from './container/PageHeader';
import PostListView from './container/PostListView';
import PostSingleView from './container/PostSingleView';

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
                <PageHeader />
                <Routes>
                    <Route path="/" element={<PostListView />} />
                    <Route path="/posts" element={<PostListView />} />
                    <Route path="/posts/:postId" element={<PostSingleView />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;
