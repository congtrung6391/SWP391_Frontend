import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import CodeMirror from './CodeMirror';
import Modal from '../Modal';
import FormatText from '../FormatText';

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
      <div className="editor border">
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
        <hr className="m-0" />
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
        <Modal
          show={showPreview}
          title="Preview"
          onHide={this.togglePreview}
          closebutton={1}
        >
          <div className="p-3">
            <FormatText
              value={value}
            />
          </div>
        </Modal>
      </div>
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
