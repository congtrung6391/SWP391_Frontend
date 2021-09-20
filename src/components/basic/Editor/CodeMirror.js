import React from 'react';
import PropTypes from 'prop-types';
import { Controlled } from 'react-codemirror2';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/clike/clike');
require('codemirror/mode/python/python');
require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/display/autorefresh');
require('codemirror/mode/pascal/pascal');

const convertMode = {
  C: 'text/x-csrc',
  'C++': 'text/x-c++src',
  Java: 'text/x-java',
  'Node.js 12.19.1': 'javascript',
  Pascal: 'pascal',
  'Python 2': 'python',
  'Python 3': 'python',
  Ruby: 'ruby',
  markdown: 'markdown',
  text: 'text',
  'Pypy 2.7 (7.3.2)': 'python',
  'Pypy 3.6 (7.3.2)': 'python',
};

class CodeMirror extends React.Component {
  constructor(props) {
    super(props);
    const {
      value, mode, theme, tabSize, lineNumbers, readOnly, cursorBlinkRate,
    } = this.props;
    this.state = {
      value: value || '',
      valueIsChanging: false,
      option: {
        mode: convertMode[mode],
        tabSize: tabSize || 2,
        smartIndent: true,
        autoCloseBrackets: true,
        lineNumbers: lineNumbers !== false,
        lineWrapping: true,
        autoRefresh: true,
        readOnly: (readOnly && true) || false,
        theme: theme || 'default',
        cursorBlinkRate: cursorBlinkRate || 530,
      },
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { theme, mode, value } = props;
    const { option, valueIsChanging } = this.state;
    this.setState({ option: { ...option, theme, mode: convertMode[mode] } });
    if (valueIsChanging === false) {
      this.setState({ value });
    }
  }

  editorDidMount = (editor) => {
    this.editor = editor;
    setTimeout(() => editor.refresh(), 1);
  }

  onBeforeChange = (editor, data, value) => {
    this.setState({
      value,
      valueIsChanging: true,
    });
  }

  onValueChange = (editor, data, value) => {
    const { onChange, name } = this.props;
    try {
      this.setState({ value, valueIsChanging: false });
      setTimeout(() => editor.refresh(), 1);
      onChange({
        target: {
          name,
          value,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  }

  onSelection = (editor, data) => {
    const { onSelectionChange } = this.props;
    try {
      onSelectionChange(data);
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    const { value, option } = this.state;
    return (
      <Controlled
        className="h100"
        value={value}
        options={option}
        autoScroll
        onBeforeChange={this.onBeforeChange}
        onChange={this.onValueChange}
        onSelection={this.onSelection}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

CodeMirror.propTypes = {
  theme: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,

  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  tabSize: PropTypes.any,
  lineNumbers: PropTypes.any,
  readOnly: PropTypes.any,
  cursorBlinkRate: PropTypes.any,
  onSelectionChange: PropTypes.any,
};

CodeMirror.defaultProps = {
  value: '',
  onChange: null,
  name: '',
  tabSize: null,
  lineNumbers: null,
  readOnly: null,
  cursorBlinkRate: null,
  onSelectionChange: null,
};

export default CodeMirror;
