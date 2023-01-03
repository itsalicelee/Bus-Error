import { React, useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Tabs, Pagination, Typography, Button, theme, message } from 'antd'; /* eslint-disable-line */
import styled from 'styled-components';

import axios from '../api';
import PostRow from '../components/PostRow';
import ModalCreatePost from './ModalCreatePost';

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

function PostListView() {
    const pageSize = 10;
    const { token } = useToken();
    const { topicName, order, page } = useParams();
    const location = useLocation();
    const [init, setInit] = useState(false);
    const [postItems, setPostItems] = useState([]);
    const [postData, setPostData] = useState((<TabChild />));
    const [postCount, setPostCount] = useState(1);
    const [postKeywordType, setpostKeywordType] = useState('標籤');
    const [postKeyword, setPostKeyword] = useState('全部');
    const [params, setParams] = useState({});
    const [reloadFlipFlop, setReloadFlipFlop] = useState(false);

    const orders = ['newest', 'hottest', 'unsolved'];
    const navigate = useNavigate();

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmitSuccess = () => {
        messageApi.open({ type: 'success', content: '提問成功' });
        setIsModalOpen(false);
        setReloadFlipFlop(!reloadFlipFlop);
    };

    useEffect(() => {
        setParams({
            topic: topicName ?? 'all',
            order: (orders.indexOf(order) === -1) ? 0 : orders.indexOf(order),
            pageNum: (!Number.isNaN(parseInt(page, 10)) && parseInt(page, 10) > 0)
                ? parseInt(page, 10)
                : 1,
        });
        setInit(true);
    }, [location.pathname]);

    useEffect(() => {
        if (init) {
            axios
                .get('/getPostList', { params })
                .then((res) => {
                    setPostItems(res.data.contents.posts);
                    setPostCount(res.data.contents.totalPage * 10);
                    if (res.data.contents.mainTag) {
                        setpostKeywordType('標籤');
                        setPostKeyword(res.data.contents.mainTag.tag_displayName);
                    } else {
                        setpostKeywordType('標籤');
                        setPostKeyword('全部');
                    }
                })
                .catch((err) => {
                    switch (err.response.data.error) {
                    case 'ERR_TOPIC_UNKNOWN':
                        messageApi.open({ type: 'error', content: '系統無法處理您的請求，請檢查請求內容或稍候再試。', duration: 5 });
                        break;
                    case 'ERR_SERVER_DB':
                        messageApi.open({ type: 'error', content: '系統無法處理您的請求，請檢查請求內容或稍候再試。', duration: 5 });
                        break;
                    default:
                        break;
                    }
                });
        }
    }, [params, reloadFlipFlop]);

    useEffect(() => {
        setPostData((
            <TabChild>
                { postItems && postItems.map((postItem) => (
                    <PostRow key={postItem.post_id} postItem={postItem} />
                ))}
            </TabChild>
        ));
    }, [postItems]);

    const onTabChange = (key) => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate(`/posts/topic/${topicName ?? 'all'}/${key}/`), 0);
    };

    const onPageChange = (newPage) => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate(`/posts/topic/${topicName ?? 'all'}/${orders[params.order]}/${newPage}`), 0);
    };

    return (
        <Container style={{ background: token.colorBgContainer, marginBottom: 32 }}>
            {contextHolder}
            <ModalCreatePost
                isModalOpen={isModalOpen}
                onCancel={handleCancel}
                onSubmitSuccess={onSubmitSuccess}
            />
            <Text style={{ ...tabSideStyle, left: 20, lineHeight: '50px' }}>
                <Text type="secondary">
                    { postKeywordType }
                    :&nbsp;
                </Text>
                <Text strong>{ postKeyword }</Text>
            </Text>
            <Button type="primary" style={{ ...tabSideStyle, right: 20, top: 9 }} onClick={showModal}>問問題</Button>
            <Tabs
                defaultActiveKey={order}
                onChange={onTabChange}
                centered
                items={[
                    { label: '最新問題', key: 'newest', children: postData },
                    { label: '熱門問題', key: 'hottest', children: postData },
                    { label: '尚待解決', key: 'unsolved', children: postData },
                ]}
            />
            {(postCount > 0) ? (
                <Pagination
                    current={params.pageNum}
                    total={postCount}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    onChange={onPageChange}
                    style={{ textAlign: 'center', padding: '18px 0 20px 0' }}
                />
            ) : (
                <div />
            )}
        </Container>
    );
}

export default PostListView;
