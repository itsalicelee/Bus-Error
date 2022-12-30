import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Typography, Avatar, Button, theme } from 'antd'; /* eslint-disable-line */
import { gold } from '@ant-design/colors';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';

// components
const { Paragraph, Text, Title } = Typography;
const { useToken } = theme;

const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 16px 0px;
    margin: 0 20px;
    border-bottom: 1px solid #E8E8E8;
    h2 {
        font-size: 18px;
        margin-bottom: 0;
    }
`;

const DataContainer = styled.div`
    margin-right: 8px;
    margin-left: -4px;
    div {
        display: inline-block;
        width: 50px;
        height: 48px;
        margin: 0 4px 0 0;
        padding-top: 3px;
        text-align: center;
        border-radius: 4px;
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    > div {
        display: flex;
        justify-content: space-between;
    }
`;

const postData = {
    post_id: 0,
    post_author: {
        user_id: 'paun3wrad6saff6LUM4cris2gnew',
        user_name: '不知名的小子',
    },
    post_tag: [],
    post_topic: '進程 exec 了設有 SUID 的程式，會改變進程的 EUID 嗎？',
    post_body: '為方便大家閱讀，我把關鍵程式碼貼出 有如下 C 程式碼，編譯成程式 test {程式片段} 並設定 test 為 root 所有以及 SUID {程式片段} 有另外一個程式 fork，調用 exec 來執行 test {程式片段} 系統系統中普通用戶的 uid 為 1000，root 的 uid 為 0 個人覺得，輸出結果應該是： EUID:0 因為 test 設置了 SUID，fork 在 exec 時應該會將有效用戶 ID',
    post_createdAt: 1672297200360,
    post_updatedAt: 1672297200360,
    post_views: 12,
};

function PostListRow() {
    const { token } = useToken();

    return (
        <Container style={{ borderBottomColor: token.colorBorder }}>
            <DataContainer>
                <div>
                    <Title level={2}>16</Title>
                    <Text type="secondary" style={{ fontSize: 12 }}>評分</Text>
                </div>
                <div>
                    <Title level={2}>15</Title>
                    <Text type="secondary" style={{ fontSize: 12 }}>回答</Text>
                </div>
                <div>
                    <Title level={2}>{postData.post_views}</Title>
                    <Text type="secondary" style={{ fontSize: 12 }}>閱覽</Text>
                </div>
            </DataContainer>
            <ContentContainer>
                <Link to={`/posts/${postData.post_id}`}>
                    <Title level={2}>{ postData.post_topic }</Title>
                    <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginTop: 4, marginBottom: 10 }}>
                        { postData.post_body }
                    </Paragraph>
                </Link>
                <div>
                    <div>
                        <Tag>C / UNIX</Tag>
                        <Tag>SUID</Tag>
                        <Tag>EUID</Tag>
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
                                { postData.post_author.user_name }
                            </span>
                        </Button>
                        <Text type="secondary">
                            ·&nbsp;提問於&nbsp;
                            { dayjs(postData.post_createdAt).format('YYYY-MM-DD HH:mm') }
                        </Text>
                    </div>
                </div>
            </ContentContainer>
        </Container>
    );
}

export default PostListRow;
