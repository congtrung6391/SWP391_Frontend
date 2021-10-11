import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import NavigationBar from '../../common/NavigationBar';
import Body, { Main, SideBar } from '../../basic/Body';
import SideTabContent from '../../basic/SideTabControl/SideTabContent';
import UserInformation from './UserInformation';
import UserAvater from './Edit/EditUserAvatar';
import UserSideNavigation from './UserSideNavigation';

const UserProfile = (props) => {
  const { match } = props;

  if (!Number.isInteger(parseInt(match.params.uid, 10))) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Profile'],
        ]}
      />
      <Body className="user-profile-body">
        <SideBar>
          <UserAvater />
          <UserSideNavigation />
        </SideBar>
        <Main>
          <SideTabContent controlKey="userprofile-view">
            <div route="info">
              <UserInformation />
            </div>
          </SideTabContent>
        </Main>
        {/* <Col>
          <TabControl controlKey="view">
            <UserInformation
              route="profile"
              title="Thông tin cá nhân"
              uid={parseInt(match.params.uid, 10)}
            />
            <UserSubmission
              route="submissions"
              title="Bài nộp"
              uid={parseInt(match.params.uid, 10)}
            />
          </TabControl>
        </Col> */}
      </Body>
    </div>
  );
};

export default UserProfile;
