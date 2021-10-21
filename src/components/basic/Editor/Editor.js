import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import CodeMirror from './CodeMirror';
import Modal from '../Modal';
import FormatText from '../FormatText';
import { Box, Divider } from '@mui/material';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const { showToolbar } = this.props;
    this.state = {
      // selectionRange: {},
      showPreview: false,
      showToolbar: showToolbar === undefined ? true : showToolbar,
    };
    this.EditorRef = React.createRef();
  }

  // onSelectionChange = (selectionRange) => {
  //   this.setState({ selectionRange });
  // }

  inserts = async (before = '', after = '') => {
    const { editor } = this.EditorRef.current;
    const selections = editor.getSelections();
    for (let i = 0; i < selections.length; i += 1) {
      selections[i] = `${before}${selections[i]}${after}`;
    }
    editor.replaceSelections(selections);
  }

  togglePreview = () => {
    const { showPreview } = this.state;
    this.setState({
      showPreview: !showPreview,
    });
  }

  render() {
    const { showToolbar, showPreview } = this.state;
    const {
      mode, theme, value, name, onChange, readOnly, lineNumbers,
    } = this.props;

    return (
      <Box className="editor border">
        {
          showToolbar
          && (
          <Toolbar
            insert={this.inserts}
            showPreview={this.togglePreview}
            disabled={readOnly}
          />
          )
        }
        <Box
          sx={{
            border: 2,
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 1,
            mt: '0.15rem',
            p: 1,
          }}
        >
          <CodeMirror
            readOnly={readOnly}
            mode={mode}
            theme={theme}
            value={value}
            name={name}
            lineNumbers={lineNumbers}
            ref={this.EditorRef}
            onSelectionChange={this.onSelectionChange}
            onChange={onChange}
          />
        </Box>
        <Modal
          open={showPreview}
          title="Preview"
          onClose={this.togglePreview}
          closebutton={1}
        >
          <FormatText
            value={value}
          />
        </Modal>
      </Box>
    );
  }
}

Editor.propTypes = {
  mode: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  lineNumbers: PropTypes.bool,
  name: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  showToolbar: PropTypes.bool,
};

Editor.defaultProps = {
  name: '',
  theme: 'default',
  value: '',
  showToolbar: undefined,
  onChange: undefined,
  readOnly: false,
  lineNumbers: true,
};

export default Editor;
