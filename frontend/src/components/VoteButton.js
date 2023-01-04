import { React } from 'react';
import PropTypes from 'prop-types';

import { Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const { useToken } = theme;

function VoteButton(props) {
    const { token } = useToken();
    const { type, checked, disabled, onClick } = props;     /* eslint-disable-line */

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
            onClick={!disabled && onClick}
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
    onClick: PropTypes.func,
};

VoteButton.defaultProps = {
    disabled: false,
    checked: false,
    onClick: () => {},
};

export default VoteButton;
