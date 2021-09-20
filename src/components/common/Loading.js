import React from 'react';
import PropTypes from 'prop-types';
import CenterContainer from '../basic/CenterContainer';
import HorizontalContainer from '../basic/HorizontalContainer';
import Body from '../basic/Body';
import NavigationBar from './NavigationBar';

export const Loading = ({ className }) => (
  <CenterContainer style={{ height: '100%' }} className={className}>
    <span className="fas fa-spin fa-spinner m-auto" style={{ verticalAlign: 'middle' }} />
  </CenterContainer>
);
Loading.propTypes = {
  className: PropTypes.string,
};
Loading.defaultProps = {
  className: '',
};

export const Loading3X = ({ className }) => (
  <CenterContainer className={className}>
    <span className="fas fa-spin fa-spinner fa-3x" />
  </CenterContainer>
);
Loading3X.propTypes = {
  className: PropTypes.string,
};
Loading3X.defaultProps = {
  className: '',
};

export const LoadingDNA3X = () => (
  <CenterContainer>
    <HorizontalContainer>
      <img alt="loading..." src="./loading-dna.svg" style={{ height: '150px' }} />
      <CenterContainer>
        LOADING...
      </CenterContainer>
    </HorizontalContainer>
  </CenterContainer>
);

export const LoadingDNA = () => (
  <CenterContainer>
    <img alt="loading..." src="./loading-dna.svg" style={{ height: '50px' }} />
  </CenterContainer>
);

export const LoadingPage = () => (
  <>
    <NavigationBar
      nav={[['', '']]}
    />
    <Body>
      <div className="col-12">
        <CenterContainer>
          <LoadingDNA3X />
        </CenterContainer>
      </div>
    </Body>
  </>
);
