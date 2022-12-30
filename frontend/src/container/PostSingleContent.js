// General
import { React } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Ant Design
import { Typography, Button, Tag, Avatar, theme, Radio } from 'antd'; /* eslint-disable-line */
import { gold } from '@ant-design/colors';
import { UserOutlined } from '@ant-design/icons';

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// React Markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

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
    pre {
        margin-left: -8px;
        margin-right: -8px;
    }
    p code {
        background: #FAFAFA;
        padding: 2px 4px;
        border-radius: 8px;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
    }
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
    const { rmComponents, postData } = props;

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
            <PostContentContainer style={{
                fontFamily: token.fontFamily,
                fontSize: token.fontSize,
                lineHeight: token.lineHeight,
                fontWeight: token.fontWeight,
                colorPrimary: token.colorPrimary,
                colorInfo: token.colorInfo,
            }}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={rmComponents}
                >
                    {postData.post_fullBody}
                </ReactMarkdown>
            </PostContentContainer>
            <PostActionContainer style={{ bordeTopColor: token.colorBorder }}>
                <div style={{ marginLeft: -6 }}>
                    <Button type="text" shape="circle" style={{ fontSize: 16, paddingTop: 3, color: '#8C8C8C' }}><FontAwesomeIcon icon={faArrowUp} /></Button>
                    <Button type="text" shape="circle" style={{ fontSize: 16, paddingTop: 3, color: '#8C8C8C' }}><FontAwesomeIcon icon={faArrowDown} /></Button>
                    <Text style={{ fontSize: 16, lineHeight: 2, marginLeft: 8 }}>16</Text>
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
            </PostActionContainer>
        </PostContainer>
    );
}

PostSingleContent.propTypes = {
    rmComponents: PropTypes.object.isRequired,  /* eslint-disable-line */
    postData: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default PostSingleContent;
