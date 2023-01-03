import React from 'react';
import { Typography, Button, theme } from 'antd';    /* eslint-disable-line */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
    &:last-child {
        border-bottom: unset;
    }
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

function CommentRow(props) {
    const { commentData } = props;
    const { token } = useToken();
    const {
        colorWhite,
        colorPrimary,
        colorText,
        colorBorder,
    } = token;

    return (
        <Container style={{ borderBottomColor: colorBorder }}>
            <VoteContainer>
                <VoteButton type="up" checked={commentData.comment_userLiked} />
                <Text style={{ fontSize: 16, lineHeight: 2, color: colorText }}>
                    { commentData.likes.length - commentData.dislikes.length }
                </Text>
                <VoteButton type="down" checked={commentData.comment_userDisliked} />
            </VoteContainer>
            <MainContainer>
                {commentData && commentData.comment_adopt && (
                    <AdoptBadge style={{ background: colorPrimary, color: colorWhite }}>
                        <FAIcon icon={faCheck} style={{ fontSize: 14, marginRight: 4 }} />
                        <Text style={{ color: colorWhite, fontSize: 12, lineHeight: '12px' }}>獲採納的答案</Text>
                    </AdoptBadge>
                )}
                <MarkdownContainer>
                    {commentData.content}
                </MarkdownContainer>
                <ActionContainer>
                    <div />
                    <PublishInfo actionText="回答於" date={commentData.createdAt} username={commentData.author.user_name} />
                </ActionContainer>
            </MainContainer>
        </Container>
    );
}

CommentRow.propTypes = {
    commentData: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default CommentRow;
