import React from 'react';
import Body from '../basic/Body';
import NavigationBar from './NavigationBar';

const Page404 = () => (
  <div>
    <NavigationBar
      nav={[
        ['Home Page', '/'],
      ]}
    />
    <Body>
      404 error
    </Body>
  </div>
);

export default Page404;
