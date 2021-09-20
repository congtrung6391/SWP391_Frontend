import React from 'react';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import LanguageService from '../../../services/language.service';
import imageUploaderLang from './imageUploader.lang';
import { LanguageContext } from '../../../context/language.context';
import { Loading } from '../../common/Loading';
import Button from '../Button';

const LS = new LanguageService();
LS.import(imageUploaderLang);

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
    const { uploading, files } = this.state;
    // console.log(this.props.multiple,
    // this.state.files.length,
    // (
    //   this.props.multiple
    //     || (!this.props.multiple && this.state.files.length == 0))
    // );
    return (
      <LanguageContext.Consumer>
        {
          ({ language }) => {
            LS.use(language);
            return (
              <Modal
                onHide={onHide}
                show={show}
                title={LS.get('Upload image')}
                closebutton={1}
                footer={(
                  <div className="py-2 px-3 w-100 d-flex justify-content-between align-items-center">
                    <Alert variant="warning" className="m-0 p-2 mr-auto">
                      <span className="fas fa-exclamation-circle" />
                      &nbsp;
                      {LS.get('Picture size must be less than 5MB')}
                    </Alert>
                    {
                      uploading
                        ? <Loading />
                        : (
                          <>
                            <Button onClick={this.onUpload} className="bg-light-blue mr-2 p-2">
                              {LS.get('Ok')}
                            </Button>
                            <Button onClick={onHide} className="bg-light-blue p-2">
                              {LS.get('Cancel')}
                            </Button>
                          </>
                        )
                    }
                  </div>
                )}
              >
                <div className="p-3">
                  {
                    files.map((file, index) => {
                      const src = URL.createObjectURL(file);
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className="review-img" key={index}>
                          <Image
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            src={src}
                            rounded
                          />
                          <button type="button" title={LS.get('remove')} onClick={() => this.onRemove(index)}>
                            <span className="fas fa-times" />
                          </button>
                        </div>
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
                    <button type="button" className="upload-image-btn" onClick={this.toggleFileUpload}>
                      <span className="fas fa-plus" />
                    </button>
                    )
                  }
                </div>
              </Modal>
            );
          }
        }
      </LanguageContext.Consumer>
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
