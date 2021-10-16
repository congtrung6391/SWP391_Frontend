import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../../common/Loading';
import {
  Card,
  Modal,
  Typography,
  Button,
  IconButton,
  Box,
  CardHeader,
  CardContent,
  CardActionArea,
  Divider,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
    };
  }

  onChange = (event) => {
    const { files } = this.state;
    this.setState({ files: [...files, ...event.target.files] });
  }

  onUpload = async () => {
    const { files } = this.state;
    const { onHide, uploadImage } = this.props;
    await this.setState({ uploading: true });
    await uploadImage(files);
    await this.setState({ uploading: false, files: [] });
    onHide();
  }

  toggleFileUpload = () => {
    document.getElementById('image-uploader').click();
  }

  onRemove = (index) => {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({
      files,
    });
  }

  render() {
    const { onHide, multiple, show } = this.props;
    const { uploading, files, title } = this.state;
    // console.log(this.props.multiple,
    // this.state.files.length,
    // (
    //   this.props.multiple
    //     || (!this.props.multiple && this.state.files.length == 0))
    // );
    return (
      <Modal
        onClose={onHide}
        open={show}
        title='Upload image'
      >
        <Card
          sx={{
            width: '20rem',
            p: 1,
            borderRadius: 3,
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CardHeader
            title={(
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                textAlign="center"
              >
                <Typography
                  variant="h6"
                >
                  {title || 'Select Image'}
                </Typography>
                <IconButton onClick={onHide}>
                  <HighlightOffIcon color="error" />
                </IconButton>
              </Box>
            )}
            sx={{ p: 1 }}
          />
          <Divider />
          <CardContent>
            {
              files.map((file, index) => {
                const src = URL.createObjectURL(file);
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box className="review-img" key={index}>
                    <img
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      src={src}
                      alt="img-upload"
                    />
                    <IconButton 
                      onClick={() => this.onRemove(index)}
                      color="error"
                    >
                      <HighlightOffIcon color="error" />
                    </IconButton>
                  </Box>
                );
              })
            }
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="image-uploader"
              multiple={!!multiple}
              onChange={this.onChange}
            />
            {
              (multiple || (!multiple && files.length === 0))
              && (
              <IconButton 
                onClick={this.toggleFileUpload}
              >
                <AddCircleOutlineIcon color="primary" />
              </IconButton>
              )
            }
          </CardContent>
          <CardActionArea
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{
                ml: 'auto',
                mr: 1,
              }}
              disabled={uploading}
              onClick={this.onUpload}
            >
              Save
              {
                uploading && (
                  <Loading />
                )
              }
            </Button>
            <Button
              color="error"
              onClick={onHide}
              variant="contained"
            >
              Cancel
            </Button>
          </CardActionArea>
        </Card>
      </Modal>
    );
  }
}

ImageUploader.propTypes = {
  multiple: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
ImageUploader.defaultProps = {
  multiple: false,
};

export default ImageUploader;
