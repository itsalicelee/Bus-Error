import React from 'react';
import { gold } from '@ant-design/colors';
import { ConfigProvider, theme } from 'antd';

import './App.css';
import Header from './container/Header';
import Body from './container/Body';

const colorAlgorithm = theme.defaultAlgorithm;
// const colorAlgorithm = theme.darkAlgorithm;

function App() {
    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: gold.primary },
                algorithm: colorAlgorithm,
            }}
        >
            <Header />
            <Body />
        </ConfigProvider>
    );
}

export default App;
