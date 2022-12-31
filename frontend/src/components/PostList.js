import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Pagination, Typography, Button, theme } from 'antd'; /* eslint-disable-line */
import styled from 'styled-components';

import axios from '../api';
import PostListRow from './PostListRow';

const { Text } = Typography;
const { useToken } = theme;

const Container = styled.div`
    border-radius: 8px;
    position: relative;
    margin: 0 16px;
    padding-top: 4px;
    flex: 1;
    box-shadow: 0px 2px 6px #00000017;
`;

const TabChild = styled.div`
    margin-top: -16px;
`;

const tabSideStyle = {
    position: 'absolute',
    top: 0,
    zIndex: 10,
};

function PostListRows() {
    const pageSize = 10;
    const { token } = useToken();
    const location = useLocation();
    const [postItems, setPostItems] = useState([]);
    const [postData, setPostData] = useState((<TabChild />));
    const [postCount, setPostCount] = useState(1);
    const [postKeyword, setPostKeyword] = useState('');

    useEffect(() => {
        axios.get('/posts').then((res) => {
            setPostItems(res.data.posts);
            setPostCount(res.data.totalPost);
            setPostKeyword(res.data.mainTag.tag_displayName);
            console.log('REFRESHED');
        });
    }, [location.pathname]);

    useEffect(() => {
        setPostData((
            <TabChild>
                { postItems && postItems.map((postItem) => (
                    <PostListRow key={postItem.post_id} postItem={postItem} />
                ))}
            </TabChild>
        ));
    }, [postItems]);

    return (
        <Container style={{ background: token.colorBgContainer }}>
            <Text style={{ ...tabSideStyle, left: 20, lineHeight: '50px' }}>
                {/* 搜尋時轉為[關鍵字] */}
                <Text type="secondary">標籤: </Text>
                <Text strong>{ postKeyword }</Text>
            </Text>
            <Button type="primary" style={{ ...tabSideStyle, right: 20, top: 9 }}>問問題</Button>
            <Tabs
                defaultActiveKey="recent"
                centered
                items={[
                    { label: '最新問題', key: 'recent', children: postData },
                    { label: '熱門問題', key: 'newest' },
                    { label: '尚待解決', key: 'unsolved' },
                ]}
            />
            <Pagination
                defaultCurrent={1}
                total={postCount}
                pageSize={pageSize}
                showSizeChanger={false}
                // onChange={}
                style={{ textAlign: 'center', padding: '18px 0 20px 0' }}
            />
        </Container>
    );
}

export default PostListRows;
