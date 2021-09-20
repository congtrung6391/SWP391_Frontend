import mdit from 'markdown-it';
import mdkatex from 'markdown-it-katex';
import Prism from 'prismjs';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line new-cap
const md = new mdit({
  linkify: true,
  highlight(str, lang) {
    let hl;

    try {
      hl = Prism.highlight(str, Prism.languages[lang]);
    } catch (error) {
      // console.error(error);
      hl = md.utils.escapeHtml(str);
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  },
});
md.use(mdkatex, { throwOnError: false, errorColor: ' #cc0000' });

const MarkdownDisplayer = ({ className, content }) => (
  <div
    className={className}
    contentEditable={false}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: md.render(content),
    }}
  />
);
MarkdownDisplayer.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object,
};
MarkdownDisplayer.defaultProps = {
  className: '',
  content: {},
};

export default MarkdownDisplayer;
