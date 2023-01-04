// General
import { React, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { Typography, Button, theme, Radio, message } from 'antd'; /* eslint-disable-line */
import CommentRow from '../components/CommentRow';
import CommentReplyRow from '../components/CommentReplyRow';

const { Text } = Typography;
const { useToken } = theme;

const CommentWrapper = styled.div`
    border-radius: 8px;
    box-shadow: 0px 2px 6px #00000017;
    margin-top: 16px;
`;

const CommentHeadContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 20px 9px 20px;
    border-bottom: 1px solid #00000017;
`;

const CommentList = styled.ul`
    margin: 0;
    padding: 0;
`;

function PostSingleComment(props) {
    const { token } = useToken();
    const { postComments: postCts, postId, isAuthor } = props;
    const [commentSortValue, setCommentSortValue] = useState(1);
    const [showReplySlot, setShowReplySlot] = useState(false);
    const [postComments, setPostComments] = useState(postCts);
    const [messageApi, contextHolder] = message.useMessage();

    const onCommentSortChange = ({ target: { value } }) => {
        setCommentSortValue(value);
    };

    const onToReply = () => {
        if (localStorage.getItem('token')) {
            setShowReplySlot(true);
        } else {
            messageApi.open({ type: 'warning', content: '登入之後才能發表回答喔' });
        }
    };
    const onCancelReply = () => setShowReplySlot(false);

    // Message
    const onSubmitSuccess = () => {
        messageApi.open({ type: 'success', content: '留言成功' });
        onCancelReply();
    };

    const onNewCommentReceive = (comment) => {
        setPostComments([...postComments, comment]);
    };

    const onAdopted = (commentId) => {
        setPostComments(postComments.map((comment) => (
            (comment.comment_id === commentId)
                ? Object.assign(comment, { adopted: !comment.adopted })
                : Object.assign(comment, { adopted: false })
        )));
    };

    const commentSortOptions = [
        { label: '最高分', value: 1 },
        { label: '最新', value: 0 },
    ];

    const commentSortFuncs = [
        (a, b) => (dayjs(b.createdAt).diff(dayjs(a.createdAt))),
        (a, b) => (b.comment_rate - a.comment_rate),
    ];

    return (
        <CommentWrapper style={{ background: token.colorBgContainer }}>
            {contextHolder}
            <CommentHeadContainer style={{ borderBottomColor: (postComments.length || showReplySlot) ? token.colorBorder : '#FFFFFF00' }}>
                <Text style={{ fontSize: 16 }}>
                    { postComments.length ? `共有 ${postComments.length} 則留言` : '暫時沒有留言' }
                </Text>
                <div>
                    { postComments.length ? (
                        <Radio.Group
                            options={commentSortOptions}
                            onChange={onCommentSortChange}
                            value={commentSortValue}
                            optionType="button"
                            style={{ marginRight: 12 }}
                        />
                    ) : '' }
                    <Button type="primary" onClick={onToReply} disabled={showReplySlot}>發表回答</Button>
                </div>
            </CommentHeadContainer>
            <CommentList>
                { showReplySlot && (
                    <CommentReplyRow
                        onCancelReply={onCancelReply}
                        postId={postId}
                        onSubmitSuccess={onSubmitSuccess}
                        onNewCommentReceive={onNewCommentReceive}
                    />
                )}
                { postComments.length > 0 && (
                    postComments
                        .filter((e) => e.adopted)
                        .map((postComment) => (
                            <CommentRow
                                key={postComment.comment_id}
                                commentData={postComment}
                                postId={postId}
                                onAdopted={onAdopted}
                                isAuthor={isAuthor}
                            />
                        ))
                )}
                { postComments.length > 0 && (
                    postComments
                        .filter((e) => !e.adopted)
                        .sort(commentSortFuncs[commentSortValue])
                        .map((postComment) => (
                            <CommentRow
                                key={postComment.comment_id}
                                commentData={postComment}
                                postId={postId}
                                onAdopted={onAdopted}
                                isAuthor={isAuthor}
                            />
                        ))
                )}
            </CommentList>
        </CommentWrapper>
    );
}

PostSingleComment.propTypes = {
    postComments: PropTypes.array.isRequired,      /* eslint-disable-line */
    postId: PropTypes.string.isRequired,
    isAuthor: PropTypes.bool.isRequired,
};

export default PostSingleComment;
