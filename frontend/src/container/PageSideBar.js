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
    flex-shrink: 0;
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
                {(icon) ? <FontAwesomeIcon icon={icon} style={{ width: 16, marginLeft: -1, marginRight: 6 }} /> : ''}
                {title}
            </Text>
            <div style={{ marginBottom: (suffix) ? -3 : 0, marginLeft: (icon) ? 21 : 0 }}>
                <Text type="primary" style={{ lineHeight: 1.5, fontSize: 24 }}>{value}</Text>
                &nbsp;
                <Text type="primary" style={{ display: 'inline-block', transform: 'translateY(-0.55px)' }}>{unit}</Text>
            </div>
            {(suffix !== null) && (
                <Text type="secondary" style={{ display: 'inline-block', marginTop: -5, marginLeft: (icon) ? 21 : 0 }}>{suffix}</Text>
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
                    <InfoWrapper>
                        <Text>歡迎光臨！</Text>
                        <Title level={4} style={{ marginTop: 2 }}>立即加入會員，<br />並使用以下功能</Title>    {/* eslint-disable-line */}
                        <div style={{ marginTop: 16 }}>
                            <Title level={5} style={{ marginTop: 2, marginBottom: 2 }}>自由提問</Title>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>碰到困難了嗎？不妨向社群伙伴提問，讓大家一起跟你找出答案。</Text>
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <Title level={5} style={{ marginTop: 2, marginBottom: 2 }}>盡情討論</Title>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>在此尋找和你遇上相同疑難的人，一起討論問題、分享見解，找出最佳解決方案。</Text>
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <Text style={{ display: 'block', marginBottom: 8 }}>更多功能敬請期待。</Text>
                        </div>
                    </InfoWrapper>
                )}
            </Card>
        </SideBarContainer>
    );
}

export default PageSideBar;
