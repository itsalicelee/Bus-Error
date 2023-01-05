import { React } from 'react';
import { Typography, Button, theme, message, Dropdown } from 'antd';    /* eslint-disable-line */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import axios from '../api';

import VoteButton from './VoteButton';
import MarkdownContainer from './MarkdownContainer';
import PublishInfo from './PublishInfo';

const { Text } = Typography;

const { useToken } = theme;

const Container = styled.li`
    display: flex;
    align-items: flex-start;
    list-style: none;
    padding: 16px 0;
    margin: 0 20px;
    border-bottom: 1px solid #FFFFFF00;
    .commentAdoptedButton { opacity: 0.3; }
    &:hover .commentAdoptedButton { opacity: 1; }
`;

const VoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: -4px 0 -4px -20px;
    width: 58px;
`;

const MainContainer = styled.div`
    flex: 1;
    overflow: auto;
`;

const AdoptBadge = styled.div`
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 9px;
    margin-bottom: 8px;
    font-weight: 500;
    border-radius: 20px;
    color: #FFFFFF;
`;

const ActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FaIcon = styled(FAIcon)`
    width: 16px;
    margin-right: 8px;
`;

function CommentRow(props) {
    const { commentData, postId, onAdopted, isAuthor, onRated } = props; /* eslint-disable-line */
    const { token } = useToken();
    const {
        colorWhite,
        colorPrimary,
        colorText,
        colorBorder,
    } = token;

    const [messageApi, contextHolder] = message.useMessage();
    const userLiked = commentData.comment_userLiked;
    const userDisliked = commentData.comment_userDisliked;
    const rate = commentData.comment_rate;

    const postActionButton = (
        <>
            <FaIcon
                icon={(commentData.adopted) ? faXmark : faCheck}
                style={{ marginRight: 7, marginLeft: -1 }}
            />
            <span>{(commentData.adopted) ? '取消採納該留言' : '採納該留言'}</span>
        </>
    );

    const onVoteButtonClick = (dir) => {
        if (localStorage.getItem('token')) {
            axios
                .post('/updateCommentRating', {
                    option: ((userLiked && dir === 'up') || (userDisliked && dir === 'down')) ? 0 : (dir === 'up') ? 1 : -1,  /* eslint-disable-line */
                    commentId: commentData.comment_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => {
                    const content = res.data.contents;
                    onRated(commentData.comment_id, content);
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
            messageApi.open({ type: 'warning', content: '登入之後才能為留言評分' });
        }
    };

    const onAdoptButtonClick = () => {
        if (localStorage.getItem('token')) {
            axios
                .post('/adoptComment', {
                    postId,
                    commentId: commentData.comment_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => {
                    onAdopted(res.data.contents);
                })
                .catch((err) => {
                    switch (err.response.data.error) {
                    case 'ERR_AUTH_NOSIGN':
                        messageApi.open({ type: 'error', content: '請先登入', duration: 5 });
                        break;
                    case 'ERR_COMMENT_UNKNOWN':
                        messageApi.open({ type: 'error', content: '留言不存在或已經被刪除', duration: 5 });
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
            messageApi.open({ type: 'warning', content: '登入之後才能採納留言' });
        }
    };

    return (
        <Container style={{ borderBottomColor: colorBorder, position: 'relative' }}>
            { contextHolder }
            <VoteContainer>
                <VoteButton type="up" checked={userLiked} onClick={() => onVoteButtonClick('up')} />
                <Text style={{ fontSize: 16, lineHeight: 2, color: colorText }}>{ rate }</Text>
                <VoteButton type="down" checked={userDisliked} onClick={() => onVoteButtonClick('down')} />
            </VoteContainer>
            <MainContainer>
                {commentData && commentData.adopted && (
                    <AdoptBadge
                        style={{ background: colorPrimary, color: colorWhite, marginLeft: -2.5 }}
                    >
                        <FAIcon icon={faCheck} style={{ fontSize: 14, marginRight: 4 }} />
                        <Text style={{ color: colorWhite, fontSize: 12, lineHeight: '12px' }}>獲採納的答案</Text>
                    </AdoptBadge>
                )}
                <div style={{ minHeight: (commentData.adopted) ? 0 : '64px' }}>
                    <MarkdownContainer>
                        {commentData.content}
                    </MarkdownContainer>
                </div>
                <ActionContainer>
                    <div style={{ marginLeft: -4 }} />
                    <PublishInfo
                        actionText="回答於"
                        date={commentData.createdAt}
                        avatar={commentData.author.user_avatar}
                        username={commentData.author.user_name}
                    />
                </ActionContainer>
            </MainContainer>
            <Dropdown
                placement="bottomRight"
                menu={{
                    items: [{ label: postActionButton, key: 'myinfo', danger: commentData.adopted }],
                    onClick: onAdoptButtonClick,
                }}
            >
                <Button
                    type="text"
                    shape="circle"
                    style={{
                        fontSize: 16,
                        paddingTop: 3,
                        color: token.colorTextTertiary,
                        position: 'absolute',
                        top: 9,
                        right: -6,
                    }}
                >
                    <FAIcon icon={faEllipsisVertical} />
                </Button>
            </Dropdown>
        </Container>
    );
}

CommentRow.propTypes = {
    commentData: PropTypes.object.isRequired,      /* eslint-disable-line */
    postId: PropTypes.string.isRequired,
    onAdopted: PropTypes.func.isRequired,
    isAuthor: PropTypes.bool.isRequired,
    onRated: PropTypes.func.isRequired,
};

export default CommentRow;
