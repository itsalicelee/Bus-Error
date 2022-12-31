import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Typography, Avatar, Button, theme } from 'antd'; /* eslint-disable-line */
import { gold } from '@ant-design/colors';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import DataContainerChild from './PostListRowSquare';

const { Paragraph, Text, Title } = Typography;
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

function PostListRow(props) {
    const { token } = useToken();
    const { postItem } = props;

    return (
        <Container style={{ borderBottomColor: token.colorBorder }}>
            <DataContainer style={{ margin: '0 8px 0 -4px' }}>
                <DataContainerChild name="評分" type="0" value={postItem.post_rates} />
                <DataContainerChild name="回答" type="1" value={postItem.post_commentCount} fill={postItem.post_commentHasAdopt} />
                <DataContainerChild name="閱覽" type="0" value={postItem.post_views} />
            </DataContainer>
            <ContentContainer style={{ flex: 1 }}>
                <Link to={`/posts/${postItem.post_id}`}>
                    <Title level={2} style={{ fontSize: 18, marginBottom: 0 }}>
                        { postItem.post_topic }
                    </Title>
                    <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginTop: 4, marginBottom: 10 }}>
                        { postItem.post_sbody }
                    </Paragraph>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        { postItem.post_tags && postItem.post_tags.map((postTag) => (
                            <Tag key={postTag.tag_displayName}>
                                {postTag.tag_displayName}
                            </Tag>
                        ))}
                    </div>
                    <div>
                        <Button type="text" size="small" shape="round" style={{ padding: '0 6px 0 0px', marginRight: -2 }}>
                            <Avatar
                                icon={<UserOutlined />}
                                size="small"
                                style={{
                                    backgroundColor: '#FCF4E0',
                                    color: '#D48806',
                                    marginTop: -3,
                                    marginRight: 3,
                                    transform: 'scale(0.85)',
                                }}
                            />
                            <span style={{ color: gold.primary }}>
                                { postItem.post_author.user_name }
                            </span>
                        </Button>
                        <Text type="secondary">
                            ·&nbsp;提問於&nbsp;
                            { dayjs(postItem.post_createdAt).format('YYYY-MM-DD HH:mm') }
                        </Text>
                    </div>
                </div>
            </ContentContainer>
        </Container>
    );
}

PostListRow.propTypes = {
    postItem: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default PostListRow;
