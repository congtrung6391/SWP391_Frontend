import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import NavigationBar from '../../../common/NavigationBar';
import Body, { Main, SideBar } from '../../../basic/Body';
import SideTabContent from '../../../basic/SideTabControl/SideTabContent';
import EditUserInformation from './EditUserInformation';
import EditUserAvater from './EditUserAvatar';
import EditUserProfileSidebar from './EditUserProfileSidebar';
import EditUserPassword from './EditUserPassword';
import { LoadingDNA3X } from '../../../common/Loading';
import { UserContext } from '../../../../context/user.context';
import { getUserInformation, saveUser } from '../../../../utils/cookies';
import { AuthenticationContext } from '../../../../context/authentication.context';
import history from '../../../../BrowserHistory';

const UserProfile = (props) => {
  const { match } = props;
  const [fetched, setFetched] = useState(false);
  const userContext = useContext(UserContext)
  const { verifyUser } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!verifyUser()) {
        history.push('/');
      }
      setFetched(false);
      if (!Number.isInteger(parseInt(match.params.uid, 10))) {
        return <Redirect to="/" />;
      }
      const uid = parseInt(match.params.uid, 10)
      const newUser = await userContext.getUserProfile(uid);
      const user = getUserInformation();
      const updateInfo = {};
      Object.keys(user).forEach((key) => {
        updateInfo[key] = user[key];
      });
      Object.keys(newUser).forEach((key) => {
        updateInfo[key] = newUser[key];
      });
      saveUser(updateInfo);
      setFetched(true);
    }
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fetched) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <NavigationBar
          nav={[
            ['Home', '/'],
            ['Profile'],
          ]}
        />
        <Body>
          <LoadingDNA3X />
        </Body>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Edit Profile'],
        ]}
      />
      <Body className="user-profile-body">
        <SideBar>
          <EditUserAvater />
          <EditUserProfileSidebar />
        </SideBar>
        <Main>
          <SideTabContent controlKey="userprofile-view">
            <div route="info">
              <EditUserInformation />
            </div>
            <div route="password">
              <EditUserPassword />
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
