import React from 'react';
import PropTypes from 'prop-types';
import { LoadingDNA3X } from '../common/Loading';

class ImageDisplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
    };
  }

  render() {
    const { fetched } = this.state;
    const { src, modalImage } = this.props;
    // console.log(this.props);
    if (!fetched) {
      return (
        <div>
          <img
            style={{ display: 'none' }}
            src={src}
            onLoad={() => this.setState({ fetched: true })}
            alt=""
          />
          <LoadingDNA3X
            style={{ width: '80%', margin: 'auto', display: 'block' }}
          />
        </div>
      );
    }
    if (modalImage) { return <img style={{ width: '80%', margin: 'auto', display: 'block' }} src={src} alt="" />; }
    return <img src={src} alt="" />;
  }
}
ImageDisplayer.propTypes = {
  src: PropTypes.string.isRequired,
  modalImage: PropTypes.object.isRequired,
};

export default ImageDisplayer;
