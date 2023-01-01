import { React } from 'react';
import PropTypes from 'prop-types';

import { Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const { useToken } = theme;

function VoteButton(props) {
    const { token } = useToken();
    const { type, checked, disabled } = props;

    const normalButtonStyle = {
        fontSize: 16,
        paddingTop: 3,
        color: (checked) ? token.colorPrimary : token.colorTextTertiary,
    };

    const disabledButtonStyle = {
        cursor: 'unset',
        color: token.colorBorder,
    };

    return (
        <Button
            type="text"
            shape="circle"
            style={
                (disabled)
                    ? { ...normalButtonStyle, ...disabledButtonStyle }
                    : { ...normalButtonStyle }
            }
            disabled={disabled}
        >
            <FontAwesomeIcon icon={(type === 'up') ? faArrowUp : faArrowDown} />
        </Button>
    );
}

VoteButton.propTypes = {
    type: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
};

VoteButton.defaultProps = {
    disabled: false,
    checked: false,
};

export default VoteButton;
