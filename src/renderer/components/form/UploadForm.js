import React from 'react';

import { Form, Icon, Input, Button } from 'antd';

const { TextArea } = Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UploadForm extends React.Component {
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    const {form, onSubmit} = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const {
        form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
        children
    } = this.props;

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    return (
      <Form style={styles.form} onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input an M3U name' }],
          })(
            <Input
              prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="M3U Name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('description', {
            rules: [{ required: false, message: 'Please input a desription' }],
          })(
            <TextArea
                placeholder="Enter a description"
                autoSize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Finalise Import
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const styles = {
    form: {
        padding: '24px',
        background: '#fbfbfb',
        border: '1px solid #d9d9d9',
        borderRadius: '6px'
    }
}

export default Form.create({ name: 'upload_form' })(UploadForm);