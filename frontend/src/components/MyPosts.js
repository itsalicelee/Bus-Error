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
`;

const MyPagination = styled(Pagination)`
    margin: 0 auto;
    text-align: center;
    border-radius: 4px
    background-color: #FFFFFF;
    padding: 16px 0 18px 0;
`;

// data
const data = (
    <div style={{ marginTop: '-16px' }}>
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
