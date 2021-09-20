import React from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import SingleAdminFeature from './SingleAdminFeature';
import AdministratorService from '../../../services/administrator.service';

const Dashboard = (props) => {
  const features = AdministratorService.getRoleFeatures();
  return (
    <>
      <NavigationBar
        nav={[
          ['home', '/'],
          ['Admin', '/admin'],
        ]}
      />
      <Body>
        {
          features.map((feature, index) => (
            <SingleAdminFeature
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              logo={feature[0]}
              title={feature[1]}
              link={feature[2]}
              color={feature[3]}
              addButton={feature[4]}
              number={256}
              history={props.history}
            />
          ))
        }
      </Body>
    </>
  );
};

export default Dashboard;
