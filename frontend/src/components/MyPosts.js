import React from 'react';
import { Tabs, Pagination } from 'antd';
import styled from 'styled-components';
import MyPost from './MyPost';

// components
const Container = styled.div`
    border-radius: 4px;
    justify-content: center;
    align-item: middle;
    margin: 0 16px;
    flex: 1;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 6px #00000017;
`;

const MyTabs = styled(Tabs)`
    flex: 1;
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #FAAD14 !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active {
        border-bottom: 2px solid #FAAD14 !important;
        z-index: 2;
    }

    .ant-tabs-ink-bar {
        background-color: #FAAD00;
    }

    .ant-tabs-tab-btn:hover, .ant-tabs-tab:hover {
        color: #FAAD14 !important;
    }
`;

const MyPagination = styled(Pagination)`
    margin: 0 auto;
    text-align: center;
    border-radius: 4px
    background-color: #FFFFFF;
    padding: 16px 0 18px 0;
    .ant-pagination-item-active, .ant-pagination-item-active:hover {
        border-color: #F7AE38 !important;
        a {
            color: #F7AE38;
        }
    }
    
    .ant-pagination-item {
        border-color: #D9D9D9;
    }
`;

// data
const data = (
    <div>
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
    </div>
);

const items = [
    {
        label: '最新問題',
        key: '1',
        children: data,
    },
    {
        label: '熱門問題',
        key: '2',
    },
    {
        label: '尚待解決',
        key: '3',
    },
];

function MyPosts() {
    return (
        <Container>
            <MyTabs defaultActiveKey="1" items={items} centered />
            <MyPagination defaultCurrent={1} total={50} />
        </Container>
    );
}

export default MyPosts;
