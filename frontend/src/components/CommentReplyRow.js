import { React, useState } from 'react';
import { Typography, Input, Button, Modal, theme } from 'antd';    /* eslint-disable-line */
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    const { onCancelReply } = props;
    const { token } = useToken();
    const { colorBorder } = token;

    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [replyContentText, setReplyContentText] = useState('');

    const onClickShowPreviewModal = () => setPreviewModalOpen(true);
    const onClickHidePreviewModal = () => setPreviewModalOpen(false);
    const onReplyContentChange = (e) => setReplyContentText(e.target.value);

    return (
        <Container style={{ borderBottomColor: colorBorder }}>
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
                        <Button type="primary" onClick={onClickShowPreviewModal}>預覽/發表</Button>
                    </div>
                </ActionContainer>
            </MainContainer>
            <PreviewModal
                title="預覽"
                cancelText="返回"
                okText="發表"
                open={previewModalOpen}
                onCancel={onClickHidePreviewModal}
                width={800}
                closable={false}
            >
                <MarkdownContainer>
                    {replyContentText}
                </MarkdownContainer>
            </PreviewModal>
        </Container>
    );
}

CommentReplyRow.propTypes = {
    onCancelReply: PropTypes.func.isRequired,
};

export default CommentReplyRow;
