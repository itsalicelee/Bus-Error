// General
import { React, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Typography, Button, theme, Radio, message  } from 'antd'; /* eslint-disable-line */
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
    const { postComments: postCts, postId } = props;
    const [commentSortValue, setCommentSortValue] = useState(0);
    const [showReplySlot, setShowReplySlot] = useState(false);
    const [postComments, setPostComments] = useState(postCts);/* eslint-disable-line */

    const onCommentSortChange = ({ target: { value } }) => {
        setCommentSortValue(value);
    };

    const onToReply = () => setShowReplySlot(true);
    const onCancelReply = () => setShowReplySlot(false);

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmitSuccess = () => {
        messageApi.open({ type: 'success', content: '留言成功' });
        onCancelReply();
    };

    const onNewCommentReceive = (comment) => {
        setPostComments([...postComments, comment]);
    };

    const commentSortOptions = [
        { label: '最高分', value: 0 },
        { label: '最新', value: 1 },
    ];

    const commentSortFuncs = [
        (a, b) => (a.comment_createdAt - b.comment_createdAt),
        (a, b) => (a.comment_like - a.comment_dislike - b.comment_like + b.comment_dislike),
    ];

    return (
        <CommentWrapper style={{ background: token.colorBgContainer }}>
            {contextHolder}
            <CommentHeadContainer style={{ borderBottomColor: (postComments.length) ? token.colorBorder : '#FFFFFF00' }}>
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
                        .filter((e) => e.comment_adopt)
                        .map((postComment) => (
                            <CommentRow key={postComment.comment_id} commentData={postComment} />
                        ))
                )}
                { postComments.length > 0 && (
                    postComments
                        .filter((e) => !e.comment_adopt)
                        .sort(commentSortFuncs[commentSortValue])
                        .map((postComment) => (
                            <CommentRow key={postComment.comment_id} commentData={postComment} />
                        ))
                )}
            </CommentList>
        </CommentWrapper>
    );
}

PostSingleComment.propTypes = {
    postComments: PropTypes.array.isRequired,      /* eslint-disable-line */
    postId: PropTypes.string.isRequired,
};

export default PostSingleComment;
