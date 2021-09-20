import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from '../ImageUploader/ImageUploader';
import ImageService from '../../../services/image.service';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleImageUploader: false,
    };
  }

  toggleImageUploader = () => {
    const { toggleImageUploader } = this.state;
    this.setState({
      toggleImageUploader: !toggleImageUploader,
    });
  }

  onUploadImage = async (images) => {
    try {
      const urlResults = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const image of images) {
        try {
          urlResults.push(ImageService.uploadImage(image));
        } catch (error) {
          // console.log(error);
        }
      }

      let urls = null;

      try {
        urls = await Promise.all(urlResults);
      } catch (error) {
        // console.log(error);
      }

      const { insert } = this.props;
      urls.forEach((url) => {
        insert('',
          `\n\n<figure>
  <img
    src="${url}"
    style="min-width: 40%; max-width: 95%; display: block; margin-left: auto; margin-right: auto; border-radius: 5px"
  />
  <!-- Insert the caption of picture here -->
  <figcaption style="text-align: center"><em></em></figcaption>
</figure>`);
      });
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    const { showPreview, insert, disabled } = this.props;
    const { toggleImageUploader } = this.state;
    return (
      <div className="toolbar m-1">
        <button type="button" onClick={() => showPreview()}>
          <span className="far fa-eye" />
          {' '}
          Preview
        </button>
        <button type="button" disabled={disabled} aria-label="italic" onClick={() => insert('*', '*')}><span className="fas fa-italic" /></button>
        <button type="button" disabled={disabled} aria-label="bold" onClick={() => insert('**', '**')}><span className="fas fa-bold" /></button>
        <button type="button" disabled={disabled} aria-label="unoder list" onClick={() => insert('\n- ')}><span className="fas fa-list-ul" /></button>
        <button type="button" disabled={disabled} aria-label="order list" onClick={() => insert('\n1. ')}><span className="fas fa-list-ol" /></button>
        <button type="button" disabled={disabled} aria-label="quote" onClick={() => insert('\n> ')}><span className="fas fa-quote-right" /></button>
        <button type="button" disabled={disabled} aria-label="link" onClick={() => insert('[Description](link)')}><span className="fas fa-link" /></button>
        <button type="button" disabled={disabled} aria-label="image" onClick={this.toggleImageUploader}><span className="fas fa-image" /></button>
        <ImageUploader
          show={toggleImageUploader}
          onHide={this.toggleImageUploader}
          multiple
          uploadImage={this.onUploadImage}
        />
      </div>
    );
  }
}

Toolbar.propTypes = {
  insert: PropTypes.func.isRequired,
  showPreview: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
Toolbar.defaultProps = {
  disabled: false,
};

export default Toolbar;
