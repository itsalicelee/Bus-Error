// General
import { React } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Ant Design
import { Typography, Button, Tag, Avatar, theme } from 'antd'; /* eslint-disable-line */

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import MarkdownContainer from '../components/MarkdownContainer';
import ContentPublishInfo from '../components/ContentPublishInfo';

const { Text, Title } = Typography;
const { useToken } = theme;

const PostContainer = styled.div`
    border-radius: 8px;
    box-shadow: 0px 2px 6px #00000017;
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

function PostSingleContent(props) {
    const { token } = useToken();
    const { postData } = props;

    return (
        <PostContainer style={{ background: token.colorBgContainer }}>
            <PostHeadContainer style={{ borderBottomColor: token.colorBorder }}>
                <TitleContainer>
                    <PostTitle>{postData.post_topic}</PostTitle>
                    <Button type="primary">問問題</Button>
                </TitleContainer>
                <div>
                    <Tag color="gold">C / UNIX</Tag>
                    <Tag>SUID</Tag>
                    <Tag>EUID</Tag>
                </div>
            </PostHeadContainer>
            <PostContentContainer>
                <MarkdownContainer>
                    {postData.post_fbody}
                </MarkdownContainer>
            </PostContentContainer>
            <PostActionContainer style={{ borderTopColor: token.colorBorder }}>
                <div style={{ marginLeft: -6 }}>
                    <Button type="text" shape="circle" style={{ fontSize: 16, paddingTop: 3, color: '#8C8C8C' }}><FontAwesomeIcon icon={faArrowUp} /></Button>
                    <Button type="text" shape="circle" style={{ fontSize: 16, paddingTop: 3, color: '#8C8C8C' }}><FontAwesomeIcon icon={faArrowDown} /></Button>
                    <Text style={{ fontSize: 16, lineHeight: 2, marginLeft: 8 }}>16</Text>
                </div>
                <ContentPublishInfo actionText="提問於" date={postData.post_createdAt} username={postData.post_author.user_name} />
            </PostActionContainer>
        </PostContainer>
    );
}

PostSingleContent.propTypes = {
    postData: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default PostSingleContent;
