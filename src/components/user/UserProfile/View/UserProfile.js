import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import NavigationBar from '../../../common/NavigationBar';
import Body, { Main, SideBar } from '../../../basic/Body';
import SideTabContent from '../../../basic/SideTabControl/SideTabContent';
import UserInformation from './UserInformation';
import UserAvater from './UserAvatar';
import UserSideNavigation from './UserSideNavigation';
import { UserContext } from '../../../../context/user.context';
import { LoadingDNA3X } from '../../../common/Loading';

const UserProfile = (props) => {
  const { match } = props;
  const [user, setUser] = useState({});
  const [fetched, setFetched] = useState(false);
  const userContext = useContext(UserContext)

  useEffect(() => {
    const fetchUser = async () => {
      setFetched(false);
      if (!Number.isInteger(parseInt(match.params.uid, 10))) {
        return <Redirect to="/" />;
      }
      const uid = parseInt(match.params.uid, 10)
      const newUser = await userContext.getUserProfile(uid);
      setUser(newUser);
      setFetched(true);
    }
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fetched) {
    return <LoadingDNA3X />
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
          <UserAvater
            user={user}
          />
          <UserSideNavigation />
        </SideBar>
        <Main>
          <SideTabContent controlKey="userprofile-view">
            <div route="info">
              <UserInformation
                user={user}
              />
            </div>
          </SideTabContent>
        </Main>
      </Body>
    </div>
  );
};

export default UserProfile;
