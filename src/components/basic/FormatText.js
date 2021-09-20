import React from 'react';
import mdit from 'markdown-it';
import mdkatex from 'markdown-it-katex';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-markdown';
import PropTypes from 'prop-types';

// eslint-disable-next-line new-cap
const md = new mdit({
  html: true,
  linkify: true,
  highlight(str, lang) {
    let hl;
    let assignLang = '';
    if (['cpp', 'c'].includes(lang)) {
      assignLang = 'clike';
    }
    try {
      hl = Prism.highlight(str, Prism.languages[assignLang]);
    } catch (error) {
      hl = md.utils.escapeHtml(str);
    }

    return `<pre class="language-${assignLang}"><code class="language-${assignLang}">${hl}</code></pre>`;
  },
});
md.use(mdkatex, { throwOnError: false, errorColor: ' #cc0000' });

const stripScripts = (s) => {
  const div = document.createElement('div');
  div.innerHTML = s;
  const scripts = div.getElementsByTagName('script');
  let i = scripts.length;
  // eslint-disable-next-line no-plusplus
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  return div.innerHTML;
};

const FormatText = ({ value }) => (
  <div
    className="m-0 p-0 text-justify"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: stripScripts(md.render(value || '')),
    }}
  />
);
FormatText.propTypes = {
  value: PropTypes.string,
};
FormatText.defaultProps = {
  value: '',
};

export default FormatText;
