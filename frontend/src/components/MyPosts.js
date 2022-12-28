import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';

// components
const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-item: middle;
    width: 800px;
    margin: 0 16px;
`;

const MyTabs = styled(Tabs)`
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #FAAD14 !important;
    }

    .ant-tabs-tab-btn:hover, .ant-tabs-tab:hover {
        color: #FAAD14 !important;
    }
`;

// style
const tabsStyle = {
    // color: 'red',
};

// data
const posts = [
    {
        label: '最新問題',
        key: '1',
    },
    {
        label: '熱門問題',
        key: '2',
    },
    {
        label: '待解決',
        key: '3',
    },
];

function MyPosts() {
    return (
        <Container>
            <MyTabs defaultActiveKey="1" items={posts} style={tabsStyle} centered />
        </Container>
    );
}

export default MyPosts;
