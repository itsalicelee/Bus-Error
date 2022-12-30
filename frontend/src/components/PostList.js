import React from 'react';
import { Tabs, Pagination, Typography, Button } from 'antd'; /* eslint-disable-line */
import styled from 'styled-components';
import PostListRow from './PostListRow';

const { Text } = Typography;

// components
const Container = styled.div`
    border-radius: 4px;
    position: relative;
    margin: 0 16px;
    padding-top: 4px;
    flex: 1;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 6px #00000017;
`;

// data
const data = (
    <div style={{ marginTop: '-16px' }}>
        <PostListRow />
        <PostListRow />
        <PostListRow />
        <PostListRow />
        <PostListRow />
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

const tabSideStyle = {
    position: 'absolute',
    top: 0,
    zIndex: 10,
};

function PostListRows() {
    return (
        <Container>
            <Text style={{ ...tabSideStyle, left: 16, lineHeight: '50px' }}>
                <Text type="secondary">C / </Text>
                <Text strong>UNIX</Text>
            </Text>
            <Button type="primary" style={{ ...tabSideStyle, right: 16, top: 9 }}>問問題</Button>
            <Tabs defaultActiveKey="1" items={items} centered />
            <Pagination defaultCurrent={1} total={50} style={{ textAlign: 'center', padding: '16px 0 18px 0' }} />
        </Container>
    );
}

export default PostListRows;
