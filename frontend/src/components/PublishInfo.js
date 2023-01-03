// General
import { React } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Ant Design
import { Typography, Button, Avatar } from 'antd'; /* eslint-disable-line */
import { gold } from '@ant-design/colors';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

function PublishInfo(props) {
    const { username, date, actionText } = props;

    return (
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
                    { username }
                </span>
            </Button>
            <Text type="secondary">
                ·&nbsp;
                { actionText }
                &nbsp;
                { dayjs(date).format('YYYY-MM-DD HH:mm') }
            </Text>
        </div>
    );
}

PublishInfo.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
};

export default PublishInfo;
