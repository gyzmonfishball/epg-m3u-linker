import React from 'react';
import { notification } from 'antd';
import { INPROGRESS }  from '../../utils/constants';

const openNotificationWithIcon = statusInfo => {
    const { status, message, description } = statusInfo;
    return status !== INPROGRESS ? 
    notification[status.toLowerCase()]({
      message,
      description,
    }): null;
};

export default openNotificationWithIcon;