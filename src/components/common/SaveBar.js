import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from '../basic/Button';
import { LanguageContext } from '../../context/language.context';
import LanguageService from '../../services/language.service';

const saveBarlanguage = {
  vi: {
    save: 'Lưu',
    remove: 'Xóa',
    saved: 'Đã lưu',
    cancel: 'Hủy',
  },
};

const LS = new LanguageService();
LS.import(saveBarlanguage);

class SaveBar extends React.Component {
  constructor(props) {
    super(props);
    const {
      mode, isRemoving, isSaving, isCanceling, isSavingAndPreviewing,
    } = props;
    this.state = {
      mode,
      isRemoving,
      isSaving,
      isCanceling,
      isSavingAndPreviewing,
      saveSuccessfully: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const {
      mode: modeProps,
      isRemoving: isRemovingProps,
      isSaving: isSavingProps,
      isSavingAndPreviewing: isSavingAndPreviewingProps,
      isCanceling: isCancelingProps,
      saveSuccessfully: saveSuccessfullyProps,
    } = props;

    const {
      mode, isRemoving, isSaving, isCanceling, isSavingAndPreviewing, saveSuccessfully,
    } = this.state;

    if (
      mode !== modeProps
      || isRemoving !== isRemovingProps
      || isSaving !== isSavingProps
      || isCanceling !== isCancelingProps
      || saveSuccessfully !== saveSuccessfullyProps
      || isSavingAndPreviewing !== isSavingAndPreviewingProps
    ) {
      this.setState({
        mode: modeProps,
        isRemoving: isRemovingProps,
        isSaving: isSavingProps,
        isSavingAndPreviewing: isSavingAndPreviewingProps,
        saveSuccessfully: saveSuccessfullyProps,
      });
    }
  }

  render() {
    const {
      mode, isRemoving, isSaving, isCanceling, isSavingAndPreviewing, saveSuccessfully,
    } = this.state;
    const {
      onSaveAndPreview,
      onSave,
      onRemove,
      onCancel,
    } = this.props;

    return (
      <LanguageContext.Consumer>
        {({ language }) => {
          LS.use(language);

          return (
            <Card className="p-2 mt-2 shadow-sm w-100">
              <Card.Body className="p-0 d-flex justify-content-end" style={{ fontSize: '16px' }}>
                {
                  onCancel && (
                  <Button className="bg-danger mr-2" onClick={onCancel} disabled={isCanceling}>
                    {
                      (isCanceling && <span className="fas fa-spin fa-spinner" />)
                      || <span className="fas fa-ban" />
                    }
                      &nbsp;
                    {LS.get('cancel')}
                  </Button>
                  )
                }
                {
                mode === 'edit'
                  && (
                  <Button className="bg-danger mr-2" onClick={onRemove} disabled={isRemoving}>
                    {
                      (isRemoving && <span className="fas fa-spin fa-spinner" />)
                      || <span className="fas fa-trash" />
                    }
                    &nbsp;
                    {LS.get('remove')}
                  </Button>
                  )
                }
                {
                  onSaveAndPreview && mode === 'edit'
                  && (
                  <Button className="bg-light-blue" onClick={onSaveAndPreview} disabled={isSaving}>
                    {
                      (isSavingAndPreviewing && <span className="fas fa-spin fa-spinner" />)
                      || <span className="fas fa-eye" />
                    }
                    &nbsp;Lưu và xem thử
                  </Button>
                  )
                }
                &nbsp;
                {
                  saveSuccessfully
                    ? (
                      <Button className="bg-green">
                        <span className="fas fa-check-circle" />
                        &nbsp;
                        {LS.get('Saved')}
                      </Button>
                    )
                    : (
                      <Button className="bg-light-blue" onClick={onSave} disabled={isSaving}>
                        {
                          (isSaving && !isSavingAndPreviewing && <span className="fas fa-spin fa-spinner" />)
                          || <span className="fas fa-save" />
                        }
                        &nbsp;
                        {LS.get('Save')}
                      </Button>
                    )
                }
              </Card.Body>
            </Card>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}

SaveBar.propTypes = {
  isRemoving: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isCanceling: PropTypes.bool,
  isSavingAndPreviewing: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  saveSuccessfully: PropTypes.bool,
  onSaveAndPreview: PropTypes.func,
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
  onCancel: PropTypes.func,
};
SaveBar.defaultProps = {
  isCanceling: false,
  isSavingAndPreviewing: false,
  saveSuccessfully: false,
  onSaveAndPreview: null,
  onSave: null,
  onRemove: null,
  onCancel: null,
};

export default SaveBar;
