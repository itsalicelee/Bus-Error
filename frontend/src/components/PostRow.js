import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Typography, theme } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PostRowData from './PostRowData';
import PublishInfo from './PublishInfo';

const { Paragraph, Title } = Typography;
const { useToken } = theme;

// Components
const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 16px 0px;
    margin: 0 20px;
    border-bottom: 1px solid #E8E8E8;
`;

const DataContainer = styled.div``;

const ContentContainer = styled.div``;

function PostRow(props) {
    const { token } = useToken();
    const { postItem } = props;

    return (
        <Container style={{ borderBottomColor: token.colorBorder }} key={postItem.post_id}>
            <DataContainer style={{ margin: '0 8px 0 -4px' }}>
                <PostRowData name="評分" type="0" value={postItem.post_rates} />
                <PostRowData name="回答" type="1" value={postItem.post_commentCount} fill={postItem.post_commentHasAdopt} />
                <PostRowData name="閱覽" type="0" value={postItem.post_views} />
            </DataContainer>
            <ContentContainer style={{ flex: 1 }}>
                <Link to={`/posts/${postItem.post_id}`}>
                    <Title level={2} style={{ fontSize: 18, marginBottom: 0 }}>
                        { postItem.post_title }
                    </Title>
                    <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginTop: 4, marginBottom: 10 }}>
                        { postItem.post_sbody }
                    </Paragraph>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        { postItem.post_topic && (
                            <Tag key={postItem.post_topic.tag_displayName}>
                                {postItem.post_topic.tag_displayName}
                            </Tag>
                        )}
                        { postItem.post_tags && postItem.post_tags.map((postTag) => (
                            <Tag key={postTag.tag_displayName}>
                                {postTag.tag_displayName}
                            </Tag>
                        ))}
                    </div>
                    <PublishInfo
                        actionText="提問於"
                        date={postItem.post_createdAt}
                        avatar={postItem.post_author.user_avatar}
                        username={postItem.post_author.user_name}
                    />
                </div>
            </ContentContainer>
        </Container>
    );
}

PostRow.propTypes = {
    postItem: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default PostRow;
