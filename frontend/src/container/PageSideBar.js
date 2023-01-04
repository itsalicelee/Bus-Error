import {
    React, useState, useEffect, useContext,
} from 'react';
import { Card, Divider as AntDivider, Typography } from 'antd';

import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleQuestion, faCommentDots } from '@fortawesome/free-regular-svg-icons';

import styled from 'styled-components';

import { AuthContext } from '../hooks/useAuth';

const { Title, Text } = Typography;

const InfoWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
    margin: 4px;
`;

const SideBarContainer = styled.div`
    width: 200px;
    padding-right: 16px;
`;

const Divider = styled(AntDivider)`
    margin: 6px 0 10px 0;
`;

function SideStatistic(props) {
    const {
        title, value, unit, suffix, icon,
    } = props;

    return (
        <div>
            <Divider />
            <Text type="secondary">
                {(icon) ? <FontAwesomeIcon icon={icon} style={{ width: 16, marginRight: 4 }} /> : ''}
                {title}
            </Text>
            <div style={{ marginBottom: (suffix) ? -3 : 0, marginLeft: (icon) ? 20 : 0 }}>
                <Text type="primary" style={{ lineHeight: 1.5, fontSize: 24 }}>{value}</Text>
                &nbsp;
                <Text type="primary" style={{ display: 'inline-block', transform: 'translateY(-0.55px)' }}>{unit}</Text>
            </div>
            {(suffix !== null) && (
                <Text type="secondary" style={{ display: 'inline-block', marginTop: -5, marginLeft: (icon) ? 20 : 0 }}>{suffix}</Text>
            )}
        </div>
    );
}

SideStatistic.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    icon: PropTypes.object,     /* eslint-disable-line */
};

SideStatistic.defaultProps = {
    suffix: null,
    icon: null,
};

function PageSideBar() {
    const { userState } = useContext(AuthContext);
    const [user] = userState;
    const [dayDiff, setDayDiff] = useState(0);

    useEffect(() => setDayDiff(
        Math.ceil(dayjs().diff(dayjs(user.join), 'hour') / 24),
    ), [user]);

    return (
        <SideBarContainer>
            <Card size="small">
                {user.name ? (
                    <InfoWrapper>
                        <Text>您好，</Text>
                        <Title level={4} style={{ marginTop: 0 }}>{user.name}</Title>
                        <SideStatistic title="已加入社群" value={dayDiff} unit="天" icon={faUser} />
                        <SideStatistic title="提出的問題" value={user.counts.post} unit="個" icon={faCircleQuestion} />
                        <SideStatistic title="已發表回答" value={user.counts.commentAll} unit="則" icon={faCommentDots} suffix={`其中 ${user.counts.commentAdopted} 則獲採納`} />
                    </InfoWrapper>
                ) : (
                    <InfoWrapper />
                )}
            </Card>
        </SideBarContainer>
    );
}

export default PageSideBar;
