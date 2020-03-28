import React from 'react';

import { Row, Upload, Button, Progress, Tabs } from 'antd';

import Table from '../../components/table/EditableTable';
import Notification from '../../components/Notification';
import UploadForm from '../../components/form/UploadForm';

import Layout from '../Layout';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { _upload_m3u, _set_pending_m3u } from '../../../shared/actionCreators/m3u';

import { SUCCESS, INPROGRESS } from '../../../utils/constants';

const { TabPane } = Tabs;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { 
      upload: _upload_m3u,
      setChannels: _set_pending_m3u
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({ m3u_upload: state.m3us.pending });

const generateTableColumns = fields => fields.map(field => ({
  title: field,
  dataIndex: field,
  editable: true,
}));

const onSubmit = values => {
  console.log(values);
}

const M3UUpload = ({
  m3u_upload: { progress, channels, fields, status: { status, message, description } },
  actions: { upload, setChannels }
}) => {

  const customRequest = ({onSuccess, file}) => setTimeout(() => {
    upload({ size: file.size, path: file.path });
    onSuccess("ok");
  }, 1);

  const renderUploadForm = () =>
    channels && status === SUCCESS &&
    <span>
      <UploadForm onSubmit={onSubmit} />
      <Table 
          cols={generateTableColumns(fields)}
          data={channels}
          setData={data => setChannels(data)}
        />
    </span>

  const renderNotification = () =>
    status && 
    Notification({status, message, description});

  const renderProgressBar = () => 
    progress != null &&
    status === INPROGRESS && 
    <Progress percent={progress} size="small" />;

  return (
    <Layout>
        <div>
            <Row>
              <Tabs defaultActiveKey="upload">
                <TabPane tab="Upload" key="upload">
                  <Upload
                    accept=".m3u"
                    customRequest={customRequest}
                  >
                    <Button>Choose M3U File</Button>
                  </Upload>
                  {renderProgressBar()}
                  {renderUploadForm()}
                  {renderNotification()}
                </TabPane>
                <TabPane tab="Download" key="download">
                      Download from URL
                </TabPane>
                </Tabs>
            </Row>
        </div>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(M3UUpload);
