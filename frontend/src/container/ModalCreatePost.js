import { React, useState, useEffect } from 'react';
import { Modal, Input, Button, Form, Select, message } from 'antd'; // eslint-disable-line
import PropTypes from 'prop-types';

import axios from '../api';
import MarkdownContainer from '../components/MarkdownContainer';

const { TextArea } = Input;

// style
const titleStyle = {
    textAlign: 'center',
    fontweight: 700,
    marginBottom: '8px',
    fontSize: '24px',
};

function ModalCreatePost(props) {
    const { isModalOpen, onCancel, onSubmitSuccess } = props;

    // Message
    const [messageApi, contextHolder] = message.useMessage();

    // Form
    const [form] = Form.useForm();

    // Title
    const [title, setTitle] = useState('');
    const onTitleChange = (e) => setTitle(e.target.value);

    // Tags
    // const [tags, setTags] = useState([]);
    // const onTagsChange = (e) => setTags(e);

    // Topic
    const [topic, setTopic] = useState('');
    const [topicOptions, setTopicOptions] = useState([]);
    const onTopicChange = (e) => setTopic(e);
    useEffect(() => {
        axios
            .get('/getMainTagList')
            .then((res) => {
                const { tags: topics } = res.data.contents;
                const preTagItems = [];
                topics.forEach((t) => {
                    preTagItems.push({
                        value: t.tag_identifier,
                        label: t.tag_displayName,
                    });
                });
                setTopicOptions(preTagItems);
            });
    }, []);

    // Content
    const [contentText, setContentText] = useState('');
    const onContentChange = (e) => setContentText(e.target.value);

    // Previewer
    const [showPreview, setShowPreview] = useState(false);
    const onPreviewChange = () => setShowPreview(!showPreview);

    // Submit
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const onSubmitClick = () => {
        setSubmitBtnLoading(true);
        axios
            .post('/createPost', {
                title,
                topic,
                tags: [],
                content: contentText,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(() => {
                form.setFieldsValue({
                    title: '',
                    topic: '',
                    contentText: '',
                    content: '',
                    showPreview: false,
                    submitBtnLoading: false,
                });
                setContentText('');
                setShowPreview(false);
                setSubmitBtnLoading(false);
            })
            .then(() => {
                onSubmitSuccess();
            })
            .catch((err) => {
                setSubmitBtnLoading(false);
                switch (err.response.data.error) {
                case 'ERR_AUTH_NOSIGN':
                    messageApi.open({ type: 'error', content: '????????????????????????', duration: 5 });
                    break;
                case 'ERR_TOPIC_UNKNOWN':
                    messageApi.open({ type: 'warning', content: '???????????????????????????????????????', duration: 5 });
                    break;
                case 'ERR_SERVER_DB':
                    messageApi.open({ type: 'error', content: '????????????????????????????????????????????????????????????????????????', duration: 5 });
                    break;
                default:
                    break;
                }
            });
    };

    const Content = (
        <div style={{ textAlign: 'left' }}>
            {contextHolder}
            <Form form={form} requiredMark={false}>
                <Form.Item label="??????" colon={false} name="title" rules={[{ required: true, message: '???????????????' }]}>
                    <Input placeholder="??????" value={title} onChange={onTitleChange} />
                </Form.Item>
                {/* <Form.Item label="??????" name="tags" rules={[{ required: true, message: '???????????????'}]}>
                    <Select
                        mode="tags"
                        placeholder="??????"
                        options={[]}
                        onChange={onTagsChange}
                        value={tags}
                    />
                </Form.Item> */}
                <Form.Item label="??????" colon={false} name="topic" rules={[{ required: true, message: '???????????????' }]}>
                    <Select
                        showSearch
                        placeholder="??????"
                        options={topicOptions}
                        onChange={onTopicChange}
                        value={topic}
                    />
                </Form.Item>

                <Form.Item label="??????" colon={false} name="content" rules={[{ required: true, message: '???????????????' }]}>
                    <TextArea
                        autoSize={{ minRows: 8, maxRows: 12 }}
                        onChange={onContentChange}
                        value={contentText}
                        placeholder="?????? Markdown ??????"
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
            <h1 style={titleStyle}>?????????</h1>
            {(showPreview) ? Preview : Content}
            <Button key="submit" onClick={onPreviewChange} style={{ marginRight: '12px' }}>??????</Button>
            <Button type="primary" onClick={onSubmitClick} loading={submitBtnLoading}>??????</Button>
        </Modal>
    );
}

ModalCreatePost.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired,
};

export default ModalCreatePost;
