import { React, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Ant Design
import { Typography, Button, Tag, theme, message, Popconfirm, Dropdown, Modal } from 'antd'; /* eslint-disable-line */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import MarkdownContainer from '../components/MarkdownContainer';
import PublishInfo from '../components/PublishInfo';
import VoteButton from '../components/VoteButton';
import ModalCreatePost from './ModalCreatePost';
import axios from '../api';

const { Text, Title } = Typography;
const { useToken } = theme;

const PostContainer = styled.div`
    border-radius: 8px;
    box-shadow: 0px 2px 6px #00000017;
    .material-symbols-outlined {
        vertical-align: center;
        font-size: 18px;
        font-variation-settings:
            'FILL' 1,
            'wght' 500,
            'GRAD' -25,
            'opsz' 20
    }
`;

const PostHeadContainer = styled.div`
    margin: 0 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #00000017;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 9px;
    padding-bottom: 10px;
`;

const PostTitle = styled(Title)`
    font-size: 22px !important;
    margin: 0 !important;
    padding-top: 7px;
    line-height: 1.2;
    flex: 1;
`;

const PostContentContainer = styled.div`
    margin: 12px 20px;
`;

const PostActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
    padding: 12px 0 14px 0;
    border-top: 1px solid #00000017;
`;

const FaIcon = styled(FontAwesomeIcon)`
    width: 16px;
    margin-right: 8px;
`;

function PostSingleContent(props) {
    const { token } = useToken();
    const { postData } = props;
    const navigate = useNavigate();

    // Modal & Message
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [showInfoModal, setShowInfoModal] = useState(false);

    const onSubmitSuccess = () => {
        messageApi.open({ type: 'success', content: '提問成功' });
        setIsModalOpen(false);
    };

    const showModal = () => {
        if (localStorage.getItem('token')) {
            setIsModalOpen(true);
        } else {
            messageApi.open({ type: 'warning', content: '登入之後才能提問' });
        }
    };
    const onUserMenuClick = () => {
        setShowInfoModal(true);
    };

    const handleCancel = () => setIsModalOpen(false);

    const [userLiked, setUserLiked] = useState(postData.post_userLiked);
    const [userDisliked, setUserDisliked] = useState(postData.post_userDisliked);
    const [rate, setRate] = useState(postData.post_rate);

    const onVoteButtonClick = (dir) => {
        if (localStorage.getItem('token')) {
            axios
                .post('/updatePostRating', {
                    option: ((userLiked && dir === 'up') || (userDisliked && dir === 'down')) ? 0 : (dir === 'up') ? 1 : -1,  /* eslint-disable-line */
                    postId: postData.post_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => {
                    const content = res.data.contents;
                    setUserLiked(content.post_userLiked);
                    setUserDisliked(content.post_userDisliked);
                    setRate(content.post_rate);
                })
                .catch((err) => {
                    switch (err.response.data.error) {
                    case 'ERR_AUTH_NOSIGN':
                        messageApi.open({ type: 'error', content: '請先登入', duration: 5 });
                        break;
                    case 'ERR_NOINPUT':
                        messageApi.open({ type: 'error', content: '錯誤！請重新整理後再重試。', duration: 5 });
                        break;
                    case 'ERR_SERVER_DB':
                        messageApi.open({ type: 'error', content: '系統無法處理您的請求，請檢查請求內容或稍候再試。', duration: 5 });
                        break;
                    default:
                        break;
                    }
                });
        } else {
            messageApi.open({ type: 'warning', content: '登入之後才能為文章評分' });
        }
    };

    const onDeleteButtonClick = () => {
        if (localStorage.getItem('token')) {
            axios
                .post('/deletePost', {
                    postId: postData.post_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(() => {
                    navigate('/');
                })
                .catch((err) => {
                    switch (err.response.data.error) {
                    case 'ERR_AUTH_NOSIGN':
                        messageApi.open({ type: 'error', content: '請先登入', duration: 5 });
                        break;
                    case 'ERR_POST_UNKNOWN':
                        messageApi.open({ type: 'error', content: '貼文不存在或已經被刪除', duration: 5 });
                        break;
                    case 'ERR_AUTHOR_UNKNOWN':
                        messageApi.open({ type: 'error', content: '您必須為此篇貼文之作者才可採納發言', duration: 5 });
                        break;
                    case 'ERR_SERVER_DB':
                        messageApi.open({ type: 'error', content: '系統無法處理您的請求，請檢查請求內容或稍候再試。', duration: 5 });
                        break;
                    default:
                        break;
                    }
                });
        } else {
            messageApi.open({ type: 'warning', content: '登入之後才能刪除文章' });
        }
    };
    const hideInfoModal = () => setShowInfoModal(false);

    const postActionButton = (
        <>
            <FaIcon icon={faTrash} style={{ marginRight: 7, marginLeft: -1 }} />
            <span>刪除貼文</span>
        </>
    );

    return (
        <PostContainer style={{ background: token.colorBgContainer }}>
            {contextHolder}
            <ModalCreatePost
                isModalOpen={isModalOpen}
                onCancel={handleCancel}
                onSubmitSuccess={onSubmitSuccess}
            />
            <PostHeadContainer style={{ borderBottomColor: token.colorBorder }}>
                <TitleContainer>
                    <PostTitle>{postData.post_title}</PostTitle>
                    <Button type="primary" onClick={showModal}>問問題</Button>
                </TitleContainer>
                <div>
                    { postData.post_topic && (
                        <Tag color="gold" key={postData.post_topic.tag_displayName}>
                            {postData.post_topic.tag_displayName}
                        </Tag>
                    )}
                    { postData.post_tags && postData.post_tags.map((postTag) => (
                        <Tag key={postTag.tag_displayName}>
                            {postTag.tag_displayName}
                        </Tag>
                    ))}
                </div>
            </PostHeadContainer>
            <PostContentContainer>
                <MarkdownContainer>
                    {postData.post_fbody}
                </MarkdownContainer>
            </PostContentContainer>
            <PostActionContainer style={{ borderTopColor: token.colorBorder }}>
                <div style={{ marginLeft: -6 }}>
                    <VoteButton type="up" checked={userLiked} onClick={() => onVoteButtonClick('up')} />
                    <VoteButton type="down" checked={userDisliked} onClick={() => onVoteButtonClick('down')} />
                    <Text style={{ fontSize: 16, lineHeight: 2, marginLeft: 8 }}>{ rate }</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Modal
                        open={showInfoModal}
                        onCancel={hideInfoModal}
                        title="確定要刪除貼文？"
                        onOk={onDeleteButtonClick}
                        okText="確認"
                        cancelText="取消"
                        width={400}
                    >
                        <p>此動作不可復原</p>
                    </Modal>
                    <PublishInfo
                        actionText="提問於"
                        date={postData.post_createdAt}
                        avatar={postData.post_author.user_avatar}
                        username={postData.post_author.user_name}
                    />
                    {(postData.isAuthor)
                        ? (
                            <Dropdown
                                placement="bottomRight"
                                menu={{
                                    items: [
                                        { label: postActionButton, key: 'myinfo', danger: 'true' },
                                    ],
                                    onClick: onUserMenuClick,
                                }}
                            >
                                <Button
                                    type="text"
                                    shape="circle"
                                    style={{
                                        fontSize: 16,
                                        marginTop: -1,
                                        marginLeft: 4,
                                        marginRight: -6,
                                        paddingTop: 3,
                                        color: token.colorTextTertiary,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </Button>
                            </Dropdown>
                        )
                        : '' }
                </div>
            </PostActionContainer>
        </PostContainer>
    );
}

PostSingleContent.propTypes = {
    postData: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default PostSingleContent;
