import React from 'react';
import { Typography, theme } from 'antd';
import PropTypes from 'prop-types';

const { Text, Title } = Typography;
const { useToken } = theme;

function PostListRowSquare(props) {
    const { token } = useToken();
    const { name, value, type, fill } = props; /* eslint-disable-line */

    const generalDivStyle = {
        display: 'inline-block',
        width: 50,
        height: 48,
        marginRight: 4,
        paddingTop: 5,
        textAlign: 'center',
        borderRadius: 4,
    };

    return (
        <div
            style={{
                ...generalDivStyle,
                border: (type === '1' && value > 0) ? `1px solid ${token.colorPrimary}` : 'none',
                background: (type === '1' && value > 0 && fill) ? token.colorPrimary : token.colorBgContainer,
            }}
        >
            <Title
                style={{
                    fontSize: 20,
                    lineHeight: 0.9,
                    margin: 0,
                    fontWeight: (value) ? 700 : 400,
                    color: (type === '1' && value > 0) ? (fill ? '#FFFFFF' : token.colorPrimary ) : '', /* eslint-disable-line */
                }}
                type={(value) ? 'primary' : 'secondary'}
                level={2}
            >
                { value }
            </Title>
            <Text
                type="secondary"
                style={{
                    fontSize: 12,
                    marginTop: -2,
                    color: (type === '1' && value > 0) ? (fill ? '#FFFFFF' : token.colorPrimary ) : '', /* eslint-disable-line */
                    fontWeight: (type === '1' && value > 0 && !fill && !token.isDarkMode) ? 700 : 400,
                }}
            >
                { name }
            </Text>
        </div>
    );
}

PostListRowSquare.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.string,
    fill: PropTypes.bool,
};

PostListRowSquare.defaultProps = {
    type: '',
    fill: false,
};

export default PostListRowSquare;
