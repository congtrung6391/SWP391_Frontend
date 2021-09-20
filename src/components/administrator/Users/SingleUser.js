import React, { useState, useContext } from 'react';
import SHA256 from 'crypto-js/sha256';
import PropTypes from 'prop-types';
import AdminUsersService from '../../../services/adminUsers.service';
import Button from '../../basic/Button';
import { UserTypeContext } from '../../../context/usertype.context';
import Modal from '../../basic/Modal';
import { /* userPropType */ } from '../../../propTypes/propTypes';

const SingleUser = ({ user }) => {
  const [fetched, setFetched] = useState(true);
  const [isBlocking, setIsBlocking] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const { usertypes } = useContext(UserTypeContext);
  const [error, setError] = useState('');

  const {
    Username, Email, Fullname, Role,
  } = user;

  const blockUser = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('ARE YOU SURE?')) {
      setIsBlocking(true);
      await AdminUsersService.updateUser(user.Id, { Status: false });
      setIsBlocking(false);
    }
  };

  const changeRole = async (event) => {
    const { value } = event.target;
    // eslint-disable-next-line max-len
    const response = await AdminUsersService.updateUser(user.Id, { UserTypeId: parseInt(value, 10) });
    if (!response) {
      setFetched(false);
      // eslint-disable-next-line no-param-reassign
      user.Role = usertypes.find((type) => type.Id === parseInt(value, 10)).Name;
      setFetched(true);
    }
  };

  const toggleChangePassword = () => {
    if (showChangePassword) {
      setNewPassword('');
      setReenterPassword('');
    }
    setShowChangePassword(!showChangePassword);
  };

  const changePassword = async () => {
    if (newPassword !== reenterPassword) {
      setError('Nhập lại mật khẩu không trùng khớp!');
    } else {
      await AdminUsersService.changePassword(user.Id, SHA256(newPassword).toString());
      toggleChangePassword();
    }
  };

  const role = usertypes.find((type) => type.Name === Role);

  if (!fetched) {
    return <tr />;
  }

  return (
    <tr>
      <td>{Username}</td>
      <td>{Email}</td>
      <td>{Fullname}</td>
      <td>
        <div
          as="select"
          style={{ fontSize: '14px' }}
          onChange={changeRole}
          value={role ? role.Id : ''}
        >
          {
            usertypes.map((usertype) => (
              <option value={usertype.Id} key={usertype.Id}>{ usertype.Name }</option>
            ))
          }
        </div>
      </td>
      <td className="text-center">
        <Button className="basic-component-button bg-warning text-white" onClick={toggleChangePassword}>
          <span className="fas fa-key" />
        </Button>
      </td>
      <td>
        <Button className="basic-component-button bg-light-pink text-white" onClick={blockUser}>
          {
            isBlocking ? <span className="fas fa-spin fa-spinner" /> : <span className="fas fa-ban" />
          }
        </Button>
      </td>
      {
        showChangePassword
        && (
        <Modal
          title="Đổi mật khẩu"
          show
          onHide={toggleChangePassword}
          footer={(
            <div>
              <Button className="bg-light-blue" onClick={toggleChangePassword}>Hủy</Button>
              &nbsp;
              <Button className="bg-light-pink" onClick={changePassword}>Đổi mật khẩu</Button>
            </div>
          )}
        >
          <h4>
            Username:
            <strong>{Username}</strong>
          </h4>
          <br />
          <div>
            <div>Mật khẩu mới</div>
            <div
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div>
            <div>Nhập lại mật khẩu mới</div>
            <div
              type="password"
              autoComplete="new-password"
              value={reenterPassword}
              onChange={(event) => setReenterPassword(event.target.value)}
            />
          </div>
          {
            error
            && <p className="text-danger">{error}</p>
          }
        </Modal>
        )
      }
    </tr>
  );
};

SingleUser.propTypes = {
  user: PropTypes.shape({
    Email: PropTypes.string.isRequired,
    Fullname: PropTypes.string,
    Id: PropTypes.number.isRequired,
    Role: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleUser;
