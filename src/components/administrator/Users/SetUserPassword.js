import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Modal from '../../basic/Modal';
import Input from '../../basic/Input';
import Button from '../../basic/Button';

class SetUserPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      error: '',
    };
  }

  onChange = (property, value) => {
    this.setState(() => ({ [property]: value }));
  };

  onSubmit = () => {
    const { newPassword, confirmPassword } = this.state;
    const { changePassword } = this.props;
    if (newPassword !== confirmPassword) {
      return this.setState(() => ({ error: 'Mật khẩu mới phải giống với xác nhận' }));
    }

    if (!newPassword) {
      return null;
    }

    this.setState(() => ({ error: '' }));
    changePassword(newPassword);
    return null;
  };

  render() {
    const { newPassword, confirmPassword, error } = this.state;
    const { onHide } = this.props;

    return (
      <Modal
        {...this.props}
        title="Đặt lại mật khẩu cho người dùng"
        footer={(
          <Row style={{ width: '100%' }}>
            <Col style={{ paddingLeft: '0' }} className="col-md">
              <Button onClick={this.onSubmit} className="admin-set-password-btn accept w-100">Lưu mật khẩu mới</Button>
            </Col>
            <Col style={{ paddingRight: '0' }} className="col-md">
              <Button onClick={onHide} className="admin-set-password-btn cancel w-100">Hủy thao tác</Button>
            </Col>
          </Row>
        )}
      >
        <Input
          name="Nhập mật khẩu mới"
          type="password"
          value={newPassword}
          onChange={(value) => this.onChange('newPassword', value)}
        />
        <Input
          name="Xác nhận mật khẩu mới"
          type="password"
          value={confirmPassword}
          onChange={(value) => this.onChange('confirmPassword', value)}
          message={error}
        />
      </Modal>
    );
  }
}

SetUserPassword.propTypes = {
  onHide: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default SetUserPassword;
