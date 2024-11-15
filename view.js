(function(){
  var Links, Nav, UserPref, DotSlash, React, isMoedictDesktop, $body, ref$, p, i, a, b, form, h1, div, main, span, br, h3, h4, button, label, table, nav, tr, td, th, input, hr, meta, ul, ol, li, small, any, map, createClass, withProperties, divInline, h1Name, nbsp, CurrentId, Result, Term, HASHOF, XREFLABELOF, XRefs, Star, Heteronym, DefinitionList, Definition, List, untag, groupBy, keyMap, decodeLangPart, slice$ = [].slice, replace$ = ''.replace, join$ = [].join, split$ = ''.split, this$ = this;
  Links = require('./scripts/Links.jsx');
  Nav = require('./scripts/Nav.jsx');
  UserPref = require('./scripts/UserPref.jsx');
  DotSlash = !(typeof document != 'undefined' && document !== null) || /^https?:/.exec(typeof document != 'undefined' && document !== null ? document.URL : void 8) ? "./" : "";
  React = require('react');
  if ((typeof window != 'undefined' && window !== null) && window.moedictDesktop) {
    window.isMoedictDesktop = isMoedictDesktop = true;
  }
  $body = (typeof window != 'undefined' && window !== null ? window.$('body') : void 8) || {
    hasClass: function(){
      return false;
    }
  };
  $('body').on('click', '#new-site a', function(){
    var hash = window.location.hash,
        match = hash.match(/[#][!|:|~]('?[\w]+)/);

    if (match) {
      window.open('https://new-amis.moedict.tw/terms/' + match[1]);
    } else {
      window.open('https://new-amis.moedict.tw/');
    }

    return false;
  });
  ref$ = React.DOM, p = ref$.p, i = ref$.i, a = ref$.a, b = ref$.b, form = ref$.form, h1 = ref$.h1, div = ref$.div, main = ref$.main, span = ref$.span, br = ref$.br, h3 = ref$.h3, h4 = ref$.h4, button = ref$.button, label = ref$.label, table = ref$.table, nav = ref$.nav, tr = ref$.tr, td = ref$.td, th = ref$.th, input = ref$.input, hr = ref$.hr, meta = ref$.meta, ul = ref$.ul, ol = ref$.ol, li = ref$.li, small = ref$.small;
  ref$ = require('prelude-ls'), any = ref$.any, map = ref$.map;
  createClass = compose$(React.createClass, React.createFactory);
  withProperties = function(tag, defProps){
    defProps == null && (defProps = {});
    return function(props){
      var args, res$, i$, to$;
      props == null && (props = {});
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return tag.apply(null, [import$(import$({}, defProps), props)].concat(slice$.call(args)));
    };
  };
  divInline = withProperties(div, {
    style: {
      display: 'inline'
    }
  });
  h1Name = withProperties(h1, {
    itemProp: 'name'
  });
  nbsp = '\u00A0';
  CurrentId = null;
  Result = createClass({
    render: function(){
      var ref$;
      switch ((ref$ = this.props) != null && ref$.type) {
      case 'term':
        return Term(this.props);
      case 'list':
        return List(this.props);
      case 'spin':
        return divInline({
          id: 'loading',
          style: {
            marginTop: '19px',
            marginLeft: '1px'
          }
        }, h1({}, this.props.id));
      case 'html':
        return divInline({
          dangerouslySetInnerHTML: {
            __html: this.props.html
          }
        });
      case 'not-found':
        return divInline(
          {},
          h1({ className: 'title' }, this.props.id),
          div({ className: 'entry' }, p({}, '找不到這個詞喔'))
        );
      default:
        return div({});
      }
    }
  });
  Term = createClass({
    render: function(){
      var ref$, LANG, H, ref1$, title, heteronyms, xrefs, tag, stem, aStroke, $char, list, res$, i$, len$, key, props;
      ref$ = this.props, LANG = ref$.LANG, H = (ref1$ = ref$.H) != null
        ? ref1$
        : HASHOF[LANG], heteronyms = ref$.heteronyms, xrefs = ref$.xrefs, tag = ref$.tag, stem = ref$.stem;
      H = replace$.call(H, /^#/, '');
      H = DotSlash + "#" + H;
      CurrentId = this.props.id;
      if (tag != null) {
        aStroke = span({
          className: 'part-of-speech'
        }, tag);
      } else {
        aStroke = '';
      }
      $char = div({ className: 'radical' }, aStroke);
      res$ = [];
      for (i$ = 0, len$ = heteronyms.length; i$ < len$; ++i$) {
        key = i$;
        props = heteronyms[i$];
        if (props['name'] !== undefined) {
          title = props['name'];
        } else {
          title = ref$.title;
        }
        res$.push(Heteronym(import$({
          key: key,
          $char: $char,
          H: H,
          LANG: LANG,
          title: title,
          CurrentId: CurrentId,
          stem: stem
        }, props)));
      }
      list = res$;
      if (xrefs != null && xrefs.length) {
        list = list.concat(XRefs({
          LANG: LANG,
          xrefs: xrefs
        }));
      }
      return divInline.apply(null, [{}].concat(slice$.call(list)));
    }
  });
  HASHOF = {
    p: '#~',
    m: "#!",
    s: '#:'
  };
  XREFLABELOF = {
    p: '方',
    m: '潘',
    s: '蔡'
  };
  XRefs = createClass({
    render: function(){
      var ref$, LANG, xrefs, lang, words, H, word;
      ref$ = this.props, LANG = ref$.LANG, xrefs = ref$.xrefs;
      return div.apply(null, [{
        className: 'xrefs'
      }].concat((function(){
        var i$, ref$, len$, ref1$, results$ = [];
        for (i$ = 0, len$ = (ref$ = xrefs).length; i$ < len$; ++i$) {
          ref1$ = ref$[i$], lang = ref1$.lang, words = ref1$.words;
          H = DotSlash + "" + HASHOF[lang];
          results$.push(div({
            key: lang,
            className: 'xref-line'
          }, span({
            className: 'xref part-of-speech',
            style: {
              marginRight: '5px'
            }
          }, XREFLABELOF[LANG + "" + lang] || XREFLABELOF[lang]), span.apply(null, [{
            className: 'xref',
            itemProp: 'citation'
          }].concat(slice$.call(intersperse('、', (fn$())))))));
        }
        return results$;
        function fn$(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = words).length; i$ < len$; ++i$) {
            word = ref$[i$];
            word = replace$.call(word, /[`~]/g, '');
            results$.push(a({
              key: word,
              className: 'xref',
              href: H + "" + word
            }, word));
          }
          return results$;
        }
      }())));
    }
  });
  Star = createClass({
    render: function(){
      var ref$, CurrentId, LANG, STARRED;
      ref$ = this.props, CurrentId = ref$.CurrentId, LANG = ref$.LANG;
      STARRED = (typeof window != 'undefined' && window !== null ? window.STARRED : void 8) || {};
      if (STARRED[LANG] && ~STARRED[LANG].indexOf("\"" + CurrentId + "\"")) {
        return i({
          className: "star iconic-color icon-bookmark",
          title: '已加入記錄簿'
        });
      }
      return i({
        className: "star iconic-color icon-bookmark-empty",
        title: '加入字詞記錄簿'
      });
    }
  });
  Heteronym = createClass({
    render: function(){
      var ref$, CurrentId, key, $char, H, LANG, title, id, ref1$, definitions, alternatives, references, stem, re, t, mp3, __html, titleRuby, youyin, list, basename, defs;
      ref$         = this.props,
      CurrentId    = ref$.CurrentId,
      key          = ref$.key,
      $char        = ref$.$char,
      H            = ref$.H,
      LANG         = ref$.LANG,
      title        = ref$.title,
      id           = ref$.id,
      definitions  = (ref1$ = ref$.definitions) != null ? ref1$ : [],
      alternatives = ref$.alternatives,
      references   = ref$.references,
      stem         = ref$.stem;

      t = untag(h(title));
      list = [
        span({ dangerouslySetInnerHTML: { __html: title } })
      ];
      if (stem != null) {
        list = list.concat(small({
          className: 'youyin'
        }, a({
          key: stem,
          className: 'xref',
          href: H + "" + stem
        }, "(詞幹:" + stem + ")")));
      }
      if (youyin) {
        list = list.concat(small({
          className: 'youyin'
        }, youyin));
      }
      mp3 = `https://hts.ithuan.tw/%E6%96%87%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%90%88%E6%88%90?%E6%9F%A5%E8%A9%A2%E8%85%94%E5%8F%A3=Pangcah&%E6%9F%A5%E8%A9%A2%E8%AA%9E%E5%8F%A5=${t}`;
      if (mp3) {
        list = list.concat(i({
          itemType: 'http://schema.org/AudioObject',
          className: 'icon-play playAudio'
        }, meta({
          itemProp: 'name',
          content: t + ".wav"
        }), meta({
          itemProp: 'contentURL',
          content: mp3
        })));
      }
      return divInline({}, meta({
        itemProp: 'image',
        content: encodeURIComponent(t) + ".png"
      }), meta({
        itemProp: 'name',
        content: t
      }), (key != null ? key : 0) === 0 ? Star({
        CurrentId: CurrentId,
        LANG: LANG
      }) : void 8, $char, h1.apply(null, [{
        className: 'title',
        'data-title': t
      }].concat(slice$.call(list))), div.apply(null, [{
        className: 'entry',
        itemProp: 'articleBody'
      }].concat((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = groupBy('type', definitions.slice())).length; i$ < len$; ++i$) {
          key = i$;
          defs = ref$[i$];
          results$.push(DefinitionList({
            key: key,
            LANG: LANG,
            H: H,
            defs: defs,
            alternatives: alternatives,
            references: references
          }));
        }
        return results$;
      }()))));
    }
  });
  DefinitionList = createClass({
    render: function(){
      var ref$, H, LANG, defs, list, key, t, d;
      ref$ = this.props, H = ref$.H, LANG = ref$.LANG, defs = ref$.defs;
      list = [];
      if ((ref$ = defs[0]) != null && ref$.type) {
        list = list.concat(intersperse(nbsp, (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = defs[0].type.split(',')).length; i$ < len$; ++i$) {
            key = i$;
            t = ref$[i$];
            results$.push(span({
              key: key,
              className: 'part-of-speech'
            }, untag(t)));
          }
          return results$;
        }())));
      }
      list = list.concat(ol.apply(null, [{}].concat((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = defs).length; i$ < len$; ++i$) {
          key = i$;
          d = ref$[i$];
          results$.push(Definition(import$({
            key: key,
            H: H,
            LANG: LANG,
            defs: defs
          }, d)));
        }
        return results$;
      }()))));
      list = list.concat(decorateNyms(this.props));
      return div.apply(null, [{
        className: 'entry-item'
      }].concat(slice$.call(list)));
    }
  });
  function decorateNyms(props){
    var list, key, ref$, val, __html;
    list = [];

    for (key in ref$ = {
      alternatives: '同'
    }) {
      val = ref$[key];
      if (props[key]) {
        list = list.concat(span.apply(null, [
          {
            key: key,
            className: key
          }, span({
            className: 'part-of-speech',
            style: {
              marginRight: '5px'
            }
          }, val)
        ].concat(slice$.call(intersperse('、', (fn$()))))));
      }
    }

    for (key in ref$ = {
      references: '參見'
    }) {
      val = ref$[key];
      if (props[key]) {
        list = list.concat(span.apply(null, [
          {
            key: key,
            className: key
          }, span({
            className: 'part-of-speech',
            style: {
              marginRight: '5px'
            }
          }, val)
        ].concat(slice$.call(intersperse('、', (fn$()))))));
      }
    }

    return list;
    function fn$(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = split$.call(props[key], /,+/)).length; i$ < len$; ++i$) {
        __html = ref$[i$];
        results$.push(span({
          dangerouslySetInnerHTML: {
            __html: __html
          }
        }));
      }
      return results$;
    }
  }
  Definition = createClass({
    render: function(it){
      var ref$, LANG, type, def, defs, alternatives, references, $afterDef, defString, list, res$, i$, len$, key, style, wrapper, this$ = this;
      ref$         = this.props,
      LANG         = ref$.LANG,
      type         = ref$.type,
      def          = ref$.def,
      defs         = ref$.defs,
      alternatives = ref$.alternatives,
      references   = ref$.references;

      if (/∥/.exec(def)) {
        $afterDef = div({
          style: {
            margin: "0 0 22px -44px"
          },
          dangerouslySetInnerHTML: {
            __html: h(replace$.call(def, /^[^∥]+/, ''))
          }
        });
        def = replace$.call(def, /∥.*/, '');
      }
      defString = h(expandDef(def)).replace(/([：。」])([\u278A-\u2793\u24eb-\u24f4])/g, '$1\uFFFC$2');
      res$ = [];
      for (i$ = 0, len$ = (ref$ = defString.split('\uFFFC')).length; i$ < len$; ++i$) {
        key = i$;
        it = ref$[i$];
        res$.push(span({
          key: key,
          className: 'def',
          dangerouslySetInnerHTML: {
            __html: h(it)
          }
        }));
      }
      list = res$;
      for (i$ = 0, len$ = (ref$ = ['example']).length; i$ < len$; ++i$) {
        if (this.props[ref$[i$]]) {
          (fn$.call(this, ref$[i$]));
        }
      }
      list = list.concat(decorateNyms(this.props));
      if ($afterDef) {
        list = list.concat($afterDef);
      }
      style = {};
      wrapper = /^\s*\(\d+\)/.exec(def)
        ? function(it){
          return it;
        }
        : function(it){
          return li({}, it);
        };
      return wrapper(p.apply(null, [{
        className: 'definition',
        style: style
      }].concat(slice$.call(list))));
      function fn$(key){
        var idx, it, __html, $, title;
        list = list.concat((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = this.props[key]).length; i$ < len$; ++i$) {
            idx = i$;
            it = ref$[i$];
            __html = h(it);
            results$.push(span({
              key: key + "." + idx,
              className: key,
              dangerouslySetInnerHTML: {
                __html: __html
              }
            }));
          }
          return results$;
        }.call(this)));
      }
    }
  });
  List = createClass({
    render: function(it){
      var ref$, terms, id, H, LRU, list, btn, re, t;
      ref$ = this.props, terms = ref$.terms, id = ref$.id, H = ref$.H, LRU = ref$.LRU;
      if (!terms) {
        return div({});
      }
      H = replace$.call(H, /^#/, '');
      H = DotSlash + "#" + H;
      id = replace$.call(id, /^[@=]/, '');
      terms = replace$.call(terms, /^[^"]*/, '');
      list = [h1Name({}, id)];
      if (id === '字詞紀錄簿' && !terms) {
        btn = i({
          className: 'icon-bookmark-empty'
        });
        list = list.concat(p({
          className: 'bg-info'
        }, "（請按詞條右方的 ", btn, " 按鈕，即可將字詞加到這裡。）"));
      }
      function strToList(str){
        var re, t, it, results$ = [];
        re = /"([^"]+)"[^"]*/g;
        while (t = re.exec(str)) {
          it = t[1];
          results$.push(span({
            style: {
              clear: 'both',
              display: 'block'
            }
          }, '\u00B7', a({
            href: H + "" + it
          }, it)));
        }
        return results$;
      }
      if (/^";/.exec(terms)) {
        re = /";([^;"]+);([^;"]+)"[^"]*/g;
        list = list.concat(table.apply(null, [
          {}, tr.apply(null, [{}].concat((function(){
            var i$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = ['臺', '陸']).length; i$ < len$; ++i$) {
              it = ref$[i$];
              results$.push(th({
                width: 200
              }, span({
                className: 'part-of-speech'
              }, it)));
            }
            return results$;
          }())))
        ].concat((function(){
          var results$ = [];
          while (t = re.exec(terms)) {
            results$.push(tr.apply(null, [{
              style: {
                borderTop: '1px solid #ccc'
              }
            }].concat((fn$()))));
          }
          return results$;
          function fn$(){
            var i$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = [t[1], t[2]]).length; i$ < len$; ++i$) {
              it = ref$[i$];
              results$.push(td({}, a({
                href: H + "" + it
              }, it)));
            }
            return results$;
          }
        }()))));
      } else {
        list = list.concat(strToList(terms));
      }
      if (id === '字詞紀錄簿' && LRU) {
        re = /"([^"]+)"[^"]*/g;
        list = list.concat((br({}), h3({
          id: 'lru'
        }, '最近查閱過的字詞', input({
          id: 'btn-clear-lru',
          type: 'button',
          className: 'btn-default btn btn-tiny',
          value: '清除',
          style: {
            marginLeft: '10px'
          }
        }))));
        list = list.concat(strToList(LRU));
      }
      return divInline.apply(null, [{}].concat(slice$.call(list)));
    }
  });
  function h(it){
    var id, res;
    id = CurrentId;
    if (/\uFFF9/.exec(it)) {
      it += '</span></span></span></span>';
    }
    res = it.replace(/[\uFF0E\u2022]/g, '\u00B7').replace(/\u223C/g, '\uFF0D').replace(/\u0358/g, '\u030d').replace(/(.)\u20DD/g, "<span class='regional part-of-speech'>$1</span> ").replace(/(.)\u20DE/g, "</span><span class='part-of-speech'>$1</span><span>").replace(/(.)\u20DF/g, "<span class='specific'>$1</span>").replace(RegExp('<a([^<]+)>' + id + '<\\/a>', 'g'), "<a class='mark'$1>" + id + "</a>").replace(RegExp('(>[^<]*)' + id + '(?!</(?:h1|rb)>)<', 'g'), "$1<b>" + id + "</b><");
    if (typeof $ == 'function' && $('body').hasClass('lang-p')) {
      if (res.indexOf('\uFFF9\uFFFA') >= 0) {
        res = res.replace(/\uFFF9/g, '')
                 .replace(/\uFFFA/g, '<span class="amisenglish">')
                 .replace(/\uFFFB/g, '</span><br><span class="amismandarin">');
      } else {
        res = res.replace(/\uFFF9/g, '<span class="part-of-speech">例</span>&nbsp;<span class="amisnative">')
                 .replace(/\uFFFA/g, '</span><br><span class="amisenglish">')
                 .replace(/\uFFFB/g, '</span><br><span class="amismandarin">');
      }
    } else if (typeof $ == 'function' && $('body').hasClass('lang-m')) {
      res = res.replace(/\uFFF9/g, '<span class="example-amis">')
               .replace(/\uFFFB/g, '</span><span class="example-fr">');
    } else if (typeof $ == 'function' && $('body').hasClass('lang-s')) {
      res = res.replace(/\uFFF9\uFFFA\uFFFB/g, '')
               .replace(/\uFFF9/g, '<span class="amisnative">')
               .replace(/\uFFFA/g, '')
               .replace(/\uFFFB/g, '</span><br><span class="amismandarin">');
    }
    return res;
  }
  untag = (function(it){
    return replace$.call(it, /<[^>]*>/g, '');
  });
  groupBy = function(prop, xs){
    var x, pre, y;
    if (xs.length <= 1) {
      return [xs];
    }
    x = xs.shift();
    x[prop] == null && (x[prop] = '');
    pre = [x];
    while (xs.length) {
      y = xs[0];
      y[prop] == null && (y[prop] = '');
      if (x[prop] !== y[prop]) {
        break;
      }
      pre.push(xs.shift());
    }
    if (!xs.length) {
      return [pre];
    }
    return [pre].concat(slice$.call(groupBy(prop, xs)));
  };
  function expandDef(def){
    return def.replace(/<(\d)>/g, function(_, num){
      return String.fromCharCode(0x327F + parseInt(num));
    }).replace(/\{(\d)\}/g, function(_, num){
      return String.fromCharCode(0x2775 + parseInt(num));
    }).replace(/[（(](\d)[)）]/g, function(_, num){
      return String.fromCharCode(0x2789 + parseInt(num)) + ' ';
    }).replace(/\(/g, '（').replace(/\)/g, '）');
  }
  function intersperse(elm, xs){
    var list, i$, len$, x;
    list = [];
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (list.length) {
        list.push(elm);
      }
      list.push(x);
    }
    return list;
  }
  keyMap = {
    h: '"heteronyms"',
    d: '"definitions"',
    f: '"def"',
    t: '"title"',
    e: '"example"',
    s: '"alternatives"',
    r: '"references"'
  };
  decodeLangPart = function(LANGORH, part){
    var H;
    part == null && (part = '');
    while (/"`辨~\u20DE&nbsp`似~\u20DE"[^}]*},{"f":"([^（]+)[^"]*"/.exec(part)) {
      part = part.replace(/"`辨~\u20DE&nbsp`似~\u20DE"[^}]*},{"f":"([^（]+)[^"]*"/, '"辨\u20DE 似\u20DE $1"');
    }
    part = part.replace(/"`(.)~\u20DE"[^}]*},{"f":"([^（]+)[^"]*"/g, '"$1\u20DE $2"');

    var regex = new RegExp(`"([${Object.keys(keyMap).join("")}])":`, "g");
    part = part.replace(regex, function(arg$, k){
      return keyMap[k] + ':';
    });

    H = DotSlash + "" + (HASHOF[LANGORH] || LANGORH);
    part = part.replace(/([「【『（《])`([^~]+)~([。，、；：？！─…．·－」』》〉]+)/g, function(arg$, pre, word, post){
      return "<span class=\\\"punct\\\">" + pre + "<a href=\\\"" + H + word + "\\\">" + word + "</a>" + post + "</span>";
    });
    part = part.replace(/([「【『（《])`([^~]+)~/g, function(arg$, pre, word){
      return "<span class=\\\"punct\\\">" + pre + "<a href=\\\"" + H + word + "\\\">" + word + "</a></span>";
    });
    part = part.replace(/`([^~]+)~([。，、；：？！─…．·－」』》〉]+)/g, function(arg$, word, post){
      return "<span class=\\\"punct\\\"><a href=\\\"" + H + word + "\\\">" + word + "</a>" + post + "</span>";
    });
    part = part.replace(/`([^~]+)~/g, function(arg$, word){
      return "<a href=\\\"" + H + word + "\\\">" + word + "</a>";
    });
    part = part.replace(/([)）])/g, "$1\u200B");
    return part;
  };
  module.exports = {
    UserPref: UserPref,
    Result: Result,
    Nav: Nav,
    Links: Links,
    decodeLangPart: decodeLangPart
  };
  function compose$() {
    var functions = arguments;
    return function() {
      var i, result;
      result = functions[0].apply(this, arguments);
      for (i = 1; i < functions.length; ++i) {
        result = functions[i](result);
      }
      return result;
    };
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
