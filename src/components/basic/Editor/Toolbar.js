import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from '../ImageUploader/ImageUploader';
import ImageService from '../../../services/image.service';

import {
  ButtonGroup,
  Button,
  Box,
} from '@mui/material';

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

  getToolList = () => {
    const { showPreview, insert } = this.props;
    return [
      {
        ariaLabel: 'preview',
        onClick: () => showPreview(),
        name: [<span className="far fa-eye" />, ' ', 'Preview'],
      },
      {
        ariaLabel: 'italic',
        onClick: () => insert('*', '*'),
        name: <span className="fas fa-italic" />,
      },
      {
        ariaLabel: 'bold',
        onClick: () => insert('**', '**'),
        name: <span className="fas fa-bold" />,
      },
      {
        ariaLabel: 'unoder list',
        onClick: () => insert('\n- '),
        name: <span className="fas fa-list-ul" />,
      },
      {
        ariaLabel: 'order list',
        onClick: () => insert('\n1. '),
        name: <span className="fas fa-list-ol" />,
      },
      {
        ariaLabel: 'quote',
        onClick: () => insert('\n> '),
        name: <span className="fas fa-quote-right" />,
      },
      {
        ariaLabel: 'link',
        onClick: () => insert('[Description](link)'),
        name: <span className="fas fa-link" />,
      },
      {
        ariaLabel: 'image',
        onClick: this.toggleImageUploader,
        name: <span className="fas fa-image" />,
      },
    ]
  }

  render() {
    const { disabled } = this.props;
    const { toggleImageUploader } = this.state;
    return (
      <Box>
        <ButtonGroup
          size="small"
          sx={{
            borderRadius: 0,
          }}
        >
          {
            this.getToolList().map((tool) => (
              <Button
                key={tool.ariaLabel}
                aria-label={tool.ariaLabel}
                onClick={tool.onClick}
                disabled={disabled}
                color="inherit"
              >
                {
                  tool.name
                }
              </Button>
            ))
          }
        </ButtonGroup>
        <ImageUploader
          show={toggleImageUploader}
          onHide={this.toggleImageUploader}
          multiple
          uploadImage={this.onUploadImage}
        />
      </Box>
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
