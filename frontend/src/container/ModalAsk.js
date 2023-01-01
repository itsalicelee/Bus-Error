import { React, useState } from 'react';
import { Modal, Input, Button, Form, Select } from 'antd'; // eslint-disable-line
import PropTypes from 'prop-types';
import MarkdownContainer from '../components/MarkdownContainer';

const { TextArea } = Input;

// style
const titleStyle = {
    textAlign: 'center',
    fontweight: 700,
    marginBottom: '8px',
    fontSize: '24px',
};

function ModalAsk(props) {
    const { isModalOpen, onCancel } = props;
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [contentText, setContentText] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [form] = Form.useForm();

    const onTitleChange = (e) => setTitle(e.target.value);
    const onTagsChange = (e) => setTags(e);
    const onContentChange = (e) => setContentText(e.target.value);
    const onPreviewChange = () => setShowPreview(!showPreview);

    const Content = (
        <div style={{ textAlign: 'left' }}>
            <Form form={form}>
                <Form.Item
                    label="標題"
                    name="title"
                    rules={[{ required: true, message: '請輸入標題' }]}
                >
                    <Input placeholder="標題" value={title} onChange={onTitleChange} />
                </Form.Item>

                <Form.Item
                    label="標籤"
                    name="tags"
                    rules={[{ required: true, message: '請選擇標籤' }]}
                >
                    <Select
                        mode="tags"
                        placeholder="標籤"
                        options={[]}
                        onChange={onTagsChange}
                        value={tags}
                    />
                </Form.Item>

                <Form.Item
                    label="內文"
                    name="content"
                    rules={[{ required: true, message: '請填寫內文' }]}
                >
                    <TextArea
                        autoSize={{ minRows: 8, maxRows: 12 }}
                        onChange={onContentChange}
                        value={contentText}
                        placeholder="內文 (支援 Markdown 語法)"
                    />
                </Form.Item>
            </Form>
        </div>
    );

    const Preview = (
        <div style={{ textAlign: 'left' }}>
            <MarkdownContainer>{contentText}</MarkdownContainer>
        </div>
    );

    return (
        <Modal
            width="800px"
            footer={[]}
            open={isModalOpen}
            onCancel={onCancel}
            centered
            destroyOnClose="true"
            maskClosable="true"
            style={{ textAlign: 'right' }}
        >
            <h1 style={titleStyle}>問問題</h1>
            {(showPreview) ? Preview : Content}
            <Button
                key="submit"
                onClick={onPreviewChange}
                style={{ marginRight: '12px' }}
            >
                預覽
            </Button>
            <Button
                type="primary"
            >
                送出
            </Button>
        </Modal>
    );
}

ModalAsk.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ModalAsk;
