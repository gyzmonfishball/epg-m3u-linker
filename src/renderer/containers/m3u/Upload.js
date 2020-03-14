import React from 'react';

import { Row, Col, Upload, Button, Progress, Tabs } from 'antd';

import Layout from '../Layout';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { _upload_m3u } from '../../../shared/actionCreators/m3u';

const { TabPane } = Tabs;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { 
      upload: _upload_m3u
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({ m3u_upload: state.m3us.pending });

const M3UUpload = ({
  m3u_upload: { progress, channels },
  actions: { upload }
}) => {

  const customRequest = ({onSuccess}) => setTimeout(() => onSuccess("ok"), 1);

  const beforeUpload = (file) => upload({ size: file.size, path: file.path });

  return (
    <Layout>
        <div>
            <Row>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Upload" key="1">
                  <Upload
                    accept=".m3u"
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}
                  >
                    <Button>Choose File</Button>
                  </Upload>
                  {progress != null && <Progress percent={progress} size="small" />}
                </TabPane>
                <TabPane tab="Download" key="2">
                      Download from URL
                </TabPane>
                </Tabs>
            </Row>
        </div>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(M3UUpload);
