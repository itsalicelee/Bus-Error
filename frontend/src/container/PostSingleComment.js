// General
import { React, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Ant Design
import { Typography, Button, theme, Radio } from 'antd'; /* eslint-disable-line */

// // FontAwesome Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
`;

const CommentItem = styled.li`
    list-style: none;
    padding: 16px 0;
    margin: 0 20px;
`;

function PostSingleComment(props) {
    const { token } = useToken();
    const { postData } = props;   /* eslint-disable-line */

    const [commentSortValue, setCommentSortValue] = useState(0);
    const onCommentSortChange = ({ target: { value } }) => {
        setCommentSortValue(value);
    };
    const commentSortOptions = [
        { label: '最高分', value: 0 },
        { label: '最新', value: 1 },
    ];

    return (
        <CommentWrapper style={{ background: token.colorBgContainer }}>
            <CommentHeadContainer style={{ borderBottomColor: token.colorBorder }}>
                <Text style={{ fontSize: 16 }}>共有 6 則留言</Text>
                <div>
                    <Radio.Group
                        options={commentSortOptions}
                        onChange={onCommentSortChange}
                        value={commentSortValue}
                        optionType="button"
                        style={{ marginRight: 12 }}
                    />
                    <Button type="primary">發表回答</Button>
                </div>
            </CommentHeadContainer>
            <CommentList>
                <CommentItem style={{ background: token.colorBgContainer }}>
                    {/* 1 */}
                </CommentItem>
            </CommentList>
        </CommentWrapper>
    );
}

PostSingleComment.propTypes = {
    postData: PropTypes.object.isRequired,      /* eslint-disable-line */
};

export default PostSingleComment;
