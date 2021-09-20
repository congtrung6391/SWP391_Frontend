import React, { useState } from 'react';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import ListUsers from './ListUsers';
import SearchBar from '../../common/SearchBar';

const UserPage = () => {
  const [totalUser, setTotalUsers] = useState(0);

  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['users', '/admin/users'],
        ]}
      />
      <Body>
        <div className="shadow-sm w-100 mt-2 p-2">
          <h2 className="mb-3"><strong>Users</strong></h2>
          <div className="d-flex mb-2">
            <div className="bg-green h-100 text-white corner p-2 text-right mr-2">
              <strong>
                Số lượng users:
                {totalUser}
              </strong>
            </div>
            <div className="flex-grow-1">
              <SearchBar toggleQuery />
            </div>
          </div>
          <ListUsers setTotalUsers={setTotalUsers} />
        </div>
      </Body>
    </>
  );
};

export default UserPage;
