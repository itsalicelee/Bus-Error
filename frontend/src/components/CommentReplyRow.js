import { React, useState } from 'react';
import { Typography, Input, Button, Modal, theme, message } from 'antd';    /* eslint-disable-line */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from '../api';

import VoteButton from './VoteButton';
import MarkdownContainer from './MarkdownContainer';
// import PublishInfo from './PublishInfo';

const { Text } = Typography;
const { TextArea } = Input;

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

const ActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PreviewModal = styled(Modal)``;

function CommentReplyRow(props) {
    const { onCancelReply, postId, onSubmitSuccess, onNewCommentReceive } = props; /* eslint-disable-line */
    const { token } = useToken();
    const { colorBorder } = token;

    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [replyContentText, setReplyContentText] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const onClickShowPreviewModal = () => setPreviewModalOpen(true);
    const onClickHidePreviewModal = () => setPreviewModalOpen(false);
    const onReplyContentChange = (e) => setReplyContentText(e.target.value);

    // Submit
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false); // eslint-disable-line
    const onSubmitClick = () => {
        setSubmitBtnLoading(true);
        axios
            .post('/createComment', {
                content: replyContentText,
                postId,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                onNewCommentReceive(res.data.contents);
                setReplyContentText('');
                onClickHidePreviewModal();
                setSubmitBtnLoading(false);
            })
            .then(() => {
                onSubmitSuccess();
            })
            .catch((err) => {
                setSubmitBtnLoading(false);
                switch (err.response.data.error) {
                case 'ERR_AUTH_NOSIGN':
                    messageApi.open({ type: 'error', content: '請先登入～', duration: 5 });
                    break;
                case 'ERR_POST_UNKNOWN':
                    messageApi.open({ type: 'error', content: '貼文不存在或是可能已被刪除。', duration: 5 });
                    break;
                case 'ERR_SERVER_DB':
                    messageApi.open({ type: 'error', content: '系統無法處理您的請求，請檢查請求內容或稍候再試。', duration: 5 });
                    break;
                default:
                    break;
                }
            });
    };

    return (
        <Container style={{ borderBottomColor: colorBorder }}>
            {contextHolder}
            <VoteContainer>
                <VoteButton type="up" disabled />
                <Text style={{ fontSize: 16, lineHeight: 2, color: colorBorder }}>0</Text>
                <VoteButton type="down" disabled />
            </VoteContainer>
            <MainContainer>
                <TextArea
                    autoSize={{ minRows: 3, maxRows: 20 }}
                    style={{ marginBottom: 12 }}
                    onChange={onReplyContentChange}
                    value={replyContentText}
                />
                <ActionContainer>
                    <div />
                    <div>
                        <Button style={{ marginRight: 12 }} onClick={onCancelReply}>取消</Button>
                        <Button type="primary" onClick={onClickShowPreviewModal}>預覽 / 發表</Button>
                    </div>
                </ActionContainer>
            </MainContainer>
            <PreviewModal
                title="預覽"
                footer={[]}
                open={previewModalOpen}
                width={800}
                closable={false}
            >
                <MarkdownContainer>
                    {replyContentText}
                </MarkdownContainer>
                <div style={{ textAlign: 'right' }}>
                    <Button key="submit" onClick={onClickHidePreviewModal} style={{ marginRight: '12px' }}>返回</Button>
                    <Button type="primary" onClick={onSubmitClick} loading={submitBtnLoading}>發表</Button>
                </div>
            </PreviewModal>
        </Container>
    );
}

CommentReplyRow.propTypes = {
    onCancelReply: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    onNewCommentReceive: PropTypes.func.isRequired,
};

export default CommentReplyRow;
