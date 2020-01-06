import React from 'react';

import { Row, Col, Upload, Button, message } from 'antd';

import Layout from '../Layout';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { _upload_m3u } from '../../../shared/actionCreators/m3u';


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { upload: _upload_m3u },
    dispatch,
  ),
});

const mapStateToProps = state => ({ m3u_upload: state.m3us.upload });

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const M3UUpload = ({
  m3u_upload,
  actions: { upload }
}) => {
  const [displayUpload, setDisplayUpload] = React.useState(true);
  const showUpload = () => setDisplayUpload(true);
  const hideUpload = () => setDisplayUpload(false);

  const onChange = info => {
    switch (info.file.status) {
      case "done":
        upload({ size: info.file.size, path: info.file.originFileObj.path });
        break;
      case "uploading":
        console.log(info.file, info.fileList);
        break;
      default:
        message.error(`${info.file.name} file upload failed.`);
        break;
    }
  };

  return (
    <Layout>
        <div>
            <Row>
                <Col span={12}>
                <Upload
                  accept=".m3u"
                  customRequest={dummyRequest}
                  onChange={onChange}
                >
                  <Button>Choose File</Button>
                </Upload>
                </Col>
                <Col span={12}>
                    Download from URL
                </Col>
            </Row>
        </div>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(M3UUpload);
