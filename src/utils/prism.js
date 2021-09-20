/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
/* eslint-disable no-inner-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable block-scoped-var */
/* eslint-disable no-continue */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-void */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-return-assign */
/* eslint-disable no-sparse-arrays */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-cond-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+c+cpp+ruby+java+pascal+python */
const _self = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {}; const Prism = (function (u) {
  const c = /\blang(?:uage)?-([\w-]+)\b/i; let a = 0; var _ = {
    manual: u.Prism && u.Prism.manual,
    disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
    util: {
      encode(e) { return e instanceof L ? new L(e.type, _.util.encode(e.content), e.alias) : Array.isArray(e) ? e.map(_.util.encode) : e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' '); }, type(e) { return Object.prototype.toString.call(e).slice(8, -1); }, objId(e) { return e.__id || Object.defineProperty(e, '__id', { value: ++a }), e.__id; }, clone: function n(e, r) { let t; let a; const i = _.util.type(e); switch (r = r || {}, i) { case 'Object': if (a = _.util.objId(e), r[a]) return r[a]; for (const o in t = {}, r[a] = t, e)e.hasOwnProperty(o) && (t[o] = n(e[o], r)); return t; case 'Array': return a = _.util.objId(e), r[a] ? r[a] : (t = [], r[a] = t, e.forEach((e, a) => { t[a] = n(e, r); }), t); default: return e; } },
    },
    languages: { extend(e, a) { const n = _.util.clone(_.languages[e]); for (const r in a)n[r] = a[r]; return n; }, insertBefore(n, e, a, r) { const t = (r = r || _.languages)[n]; const i = {}; for (const o in t) if (t.hasOwnProperty(o)) { if (o == e) for (const l in a)a.hasOwnProperty(l) && (i[l] = a[l]); a.hasOwnProperty(o) || (i[o] = t[o]); } const s = r[n]; return r[n] = i, _.languages.DFS(_.languages, function (e, a) { a === s && e !== n && (this[e] = i); }), i; }, DFS: function e(a, n, r, t) { t = t || {}; const i = _.util.objId; for (const o in a) if (a.hasOwnProperty(o)) { n.call(a, o, a[o], r || o); const l = a[o]; const s = _.util.type(l); s !== 'Object' || t[i(l)] ? s !== 'Array' || t[i(l)] || (t[i(l)] = !0, e(l, n, o, t)) : (t[i(l)] = !0, e(l, n, null, t)); } } },
    plugins: {},
    highlightAll(e, a) { _.highlightAllUnder(document, e, a); },
    highlightAllUnder(e, a, n) { const r = { callback: n, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' }; _.hooks.run('before-highlightall', r); for (var t, i = e.querySelectorAll(r.selector), o = 0; t = i[o++];)_.highlightElement(t, !0 === a, r.callback); },
    highlightElement(e, a, n) {
      const r = (function (e) { for (;e && !c.test(e.className);)e = e.parentNode; return e ? (e.className.match(c) || [, 'none'])[1].toLowerCase() : 'none'; }(e)); const t = _.languages[r]; e.className = `${e.className.replace(c, '').replace(/\s+/g, ' ')} language-${r}`; const i = e.parentNode; i && i.nodeName.toLowerCase() === 'pre' && (i.className = `${i.className.replace(c, '').replace(/\s+/g, ' ')} language-${r}`); const o = {
        element: e, language: r, grammar: t, code: e.textContent,
      }; function l(e) { o.highlightedCode = e, _.hooks.run('before-insert', o), o.element.innerHTML = o.highlightedCode, _.hooks.run('after-highlight', o), _.hooks.run('complete', o), n && n.call(o.element); } if (_.hooks.run('before-sanity-check', o), !o.code) return _.hooks.run('complete', o), void (n && n.call(o.element)); if (_.hooks.run('before-highlight', o), o.grammar) if (a && u.Worker) { const s = new Worker(_.filename); s.onmessage = function (e) { l(e.data); }, s.postMessage(JSON.stringify({ language: o.language, code: o.code, immediateClose: !0 })); } else l(_.highlight(o.code, o.grammar, o.language)); else l(_.util.encode(o.code));
    },
    highlight(e, a, n) { const r = { code: e, grammar: a, language: n }; return _.hooks.run('before-tokenize', r), r.tokens = _.tokenize(r.code, r.grammar), _.hooks.run('after-tokenize', r), L.stringify(_.util.encode(r.tokens), r.language); },
    matchGrammar(e, a, n, r, t, i, o) { for (const l in n) if (n.hasOwnProperty(l) && n[l]) { let s = n[l]; s = Array.isArray(s) ? s : [s]; for (let u = 0; u < s.length; ++u) { if (o && o == `${l},${u}`) return; let c = s[u]; const g = c.inside; const f = !!c.lookbehind; const h = !!c.greedy; let d = 0; const m = c.alias; if (h && !c.pattern.global) { const p = c.pattern.toString().match(/[imsuy]*$/)[0]; c.pattern = RegExp(c.pattern.source, `${p}g`); }c = c.pattern || c; for (let y = r, v = t; y < a.length; v += a[y].length, ++y) { let k = a[y]; if (a.length > e.length) return; if (!(k instanceof L)) { if (h && y != a.length - 1) { if (c.lastIndex = v, !(x = c.exec(e))) break; for (var b = x.index + (f && x[1] ? x[1].length : 0), w = x.index + x[0].length, A = y, P = v, O = a.length; A < O && (P < w || !a[A].type && !a[A - 1].greedy); ++A)(P += a[A].length) <= b && (++y, v = P); if (a[y] instanceof L) continue; j = A - y, k = e.slice(v, P), x.index -= v; } else { c.lastIndex = 0; var x = c.exec(k); var j = 1; } if (x) { f && (d = x[1] ? x[1].length : 0); w = (b = x.index + d) + (x = x[0].slice(d)).length; const N = k.slice(0, b); const S = k.slice(w); const C = [y, j]; N && (++y, v += N.length, C.push(N)); const E = new L(l, g ? _.tokenize(x, g) : x, m, x, h); if (C.push(E), S && C.push(S), Array.prototype.splice.apply(a, C), j != 1 && _.matchGrammar(e, a, n, y, v, !0, `${l},${u}`), i) break; } else if (i) break; } } } } },
    tokenize(e, a) { const n = [e]; const r = a.rest; if (r) { for (const t in r)a[t] = r[t]; delete a.rest; } return _.matchGrammar(e, n, a, 0, 0, !1), n; },
    hooks: { all: {}, add(e, a) { const n = _.hooks.all; n[e] = n[e] || [], n[e].push(a); }, run(e, a) { const n = _.hooks.all[e]; if (n && n.length) for (var r, t = 0; r = n[t++];)r(a); } },
    Token: L,
  }; function L(e, a, n, r, t) { this.type = e, this.content = a, this.alias = n, this.length = 0 | (r || '').length, this.greedy = !!t; } if (u.Prism = _, L.stringify = function (e, a) {
    if (typeof e === 'string') return e; if (Array.isArray(e)) return e.map((e) => L.stringify(e, a)).join(''); const n = {
      type: e.type, content: L.stringify(e.content, a), tag: 'span', classes: ['token', e.type], attributes: {}, language: a,
    }; if (e.alias) { const r = Array.isArray(e.alias) ? e.alias : [e.alias]; Array.prototype.push.apply(n.classes, r); }_.hooks.run('wrap', n); const t = Object.keys(n.attributes).map((e) => `${e}="${(n.attributes[e] || '').replace(/"/g, '&quot;')}"`).join(' '); return `<${n.tag} class="${n.classes.join(' ')}"${t ? ` ${t}` : ''}>${n.content}</${n.tag}>`;
  }, !u.document) return u.addEventListener && (_.disableWorkerMessageHandler || u.addEventListener('message', (e) => { const a = JSON.parse(e.data); const n = a.language; const r = a.code; const t = a.immediateClose; u.postMessage(_.highlight(r, _.languages[n], n)), t && u.close(); }, !1)), _; const e = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop(); if (e && (_.filename = e.src, e.hasAttribute('data-manual') && (_.manual = !0)), !_.manual) { function n() { _.manual || _.highlightAll(); }document.readyState !== 'loading' ? window.requestAnimationFrame ? window.requestAnimationFrame(n) : window.setTimeout(n, 16) : document.addEventListener('DOMContentLoaded', n); } return _;
}(_self)); typeof module !== 'undefined' && module.exports && (module.exports = Prism), typeof global !== 'undefined' && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, 'attr-value': { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i, inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] } }, punctuation: /\/?>/, 'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}, Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity, Prism.hooks.add('wrap', (a) => { a.type === 'entity' && (a.attributes.title = a.content.replace(/&amp;/, '&')); }), Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  value(a, e) {
    const s = {}; s[`language-${e}`] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }, s.cdata = /^<!\[CDATA\[|\]\]>$/i; const n = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } }; n[`language-${e}`] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }; const i = {}; i[a] = {
      pattern: RegExp('(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(/__/g, a), 'i'), lookbehind: !0, greedy: !0, inside: n,
    }, Prism.languages.insertBefore('markup', 'cdata', i);
  },
}), Prism.languages.xml = Prism.languages.extend('markup', {}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
!(function (s) {
  const t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/; s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: { rule: /@[\w-]+/ } }, url: { pattern: RegExp(`url\\((?:${t.source}|[^\n\r()]*)\\)`, 'i'), inside: { function: /^url/i, punctuation: /^\(|\)$/ } }, selector: RegExp(`[^{}\\s](?:[^{};"']|${t.source})*?(?=\\s*\\{)`), string: { pattern: t, greedy: !0 }, property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i, important: /!important\b/i, function: /[-a-z0-9]+(?=\()/i, punctuation: /[(){};:,]/,
  }, s.languages.css.atrule.inside.rest = s.languages.css; const e = s.languages.markup; e && (e.tag.addInlined('style', 'css'), s.languages.insertBefore('inside', 'attr-value', { 'style-attr': { pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i, inside: { 'attr-name': { pattern: /^\s*style/i, inside: e.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, 'attr-value': { pattern: /.+/i, inside: s.languages.css } }, alias: 'language-css' } }, e.tag));
}(Prism));
Prism.languages.clike = {
  comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, 'class-name': { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/,
};
Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: !0 }], keyword: [{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 }, { pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 }], number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
}), Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore('javascript', 'keyword', {
  regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: !0, greedy: !0 }, 'function-variable': { pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: 'function' }, parameter: [{ pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: Prism.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/, lookbehind: !0, inside: Prism.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
}), Prism.languages.insertBefore('javascript', 'string', { 'template-string': { pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/, greedy: !0, inside: { 'template-punctuation': { pattern: /^`|`$/, alias: 'string' }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/, lookbehind: !0, inside: { 'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } } }), Prism.languages.markup && Prism.languages.markup.tag.addInlined('script', 'javascript'), Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend('clike', {
  'class-name': { pattern: /(\b(?:enum|struct)\s+)\w+/, lookbehind: !0 }, keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/, operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/, number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
}), Prism.languages.insertBefore('c', 'string', {
  macro: {
    pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im, lookbehind: !0, alias: 'property', inside: { string: { pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/, lookbehind: !0 }, directive: { pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/, lookbehind: !0, alias: 'keyword' } },
  },
  constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
}), delete Prism.languages.c.boolean;
Prism.languages.cpp = Prism.languages.extend('c', {
  'class-name': { pattern: /(\b(?:class|enum|struct)\s+)\w+/, lookbehind: !0 }, keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, number: { pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i, greedy: !0 }, operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/, boolean: /\b(?:true|false)\b/,
}), Prism.languages.insertBefore('cpp', 'string', { 'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 } });
!(function (e) {
  e.languages.ruby = e.languages.extend('clike', { comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }], keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/ }); const n = { pattern: /#\{[^}]+\}/, inside: { delimiter: { pattern: /^#\{|\}$/, alias: 'tag' }, rest: e.languages.ruby } }; delete e.languages.ruby.function, e.languages.insertBefore('ruby', 'keyword', {
    regex: [{ pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/, greedy: !0, inside: { interpolation: n } }, { pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/, greedy: !0, inside: { interpolation: n } }, { pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/, greedy: !0, inside: { interpolation: n } }, { pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/, greedy: !0, inside: { interpolation: n } }, { pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/, greedy: !0, inside: { interpolation: n } }, { pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/, lookbehind: !0, greedy: !0 }], variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/, symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 }, 'method-definition': { pattern: /(\bdef\s+)[\w.]+/, lookbehind: !0, inside: { function: /\w+$/, rest: e.languages.ruby } },
  }), e.languages.insertBefore('ruby', 'number', { builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/, constant: /\b[A-Z]\w*(?:[?!]|\b)/ }), e.languages.ruby.string = [{ pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0, inside: { interpolation: n } }, { pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0, inside: { interpolation: n } }, { pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/, greedy: !0, inside: { interpolation: n } }, { pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/, greedy: !0, inside: { interpolation: n } }, { pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0, inside: { interpolation: n } }, { pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0, inside: { interpolation: n } }], e.languages.rb = e.languages.ruby;
}(Prism));
!(function (e) {
  const t = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/; const a = /\b[A-Z](?:\w*[a-z]\w*)?\b/; e.languages.java = e.languages.extend('clike', {
    'class-name': [a, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/], keyword: t, function: [e.languages.clike.function, { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 }], number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i, operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 },
  }), e.languages.insertBefore('java', 'class-name', {
    annotation: { alias: 'punctuation', pattern: /(^|[^.])@\w+/, lookbehind: !0 },
    namespace: { pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/, lookbehind: !0, inside: { punctuation: /\./ } },
    generics: {
      pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
      inside: {
        'class-name': a, keyword: t, punctuation: /[<>(),.:]/, operator: /[?&|]/,
      },
    },
  });
}(Prism));
Prism.languages.pascal = {
  comment: [/\(\*[\s\S]+?\*\)/, /\{[\s\S]+?\}/, /\/\/.*/], string: { pattern: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i, greedy: !0 }, keyword: [{ pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i, lookbehind: !0 }, { pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i, lookbehind: !0 }, { pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i, lookbehind: !0 }, { pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i, lookbehind: !0 }], number: [/(?:[&%]\d+|\$[a-f\d]+)/i, /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i], operator: [/\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i, { pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/, lookbehind: !0 }], punctuation: /\(\.|\.\)|[()\[\]:;,.]/,
}, Prism.languages.objectpascal = Prism.languages.pascal;
Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  'string-interpolation': { pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i, greedy: !0, inside: { interpolation: { pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/, lookbehind: !0, inside: { 'format-spec': { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 }, 'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' }, rest: null } }, string: /[\s\S]+/ } },
  'triple-quoted-string': { pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i, greedy: !0, alias: 'string' },
  string: { pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
  function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
  'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im, lookbehind: !0, alias: ['annotation', 'punctuation'], inside: { punctuation: /\./ },
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}, Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python;
