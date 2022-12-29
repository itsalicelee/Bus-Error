import React from 'react';
import { gold } from '@ant-design/colors';
import { ConfigProvider, theme } from 'antd';

import Header from './container/Header';
import Body from './container/Body';

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
            <Header />
            <Body />
        </ConfigProvider>
    );
}

export default App;
