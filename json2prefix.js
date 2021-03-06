// Generated by LiveScript 1.5.0
(function(){
  var fs, lang, PUA2UNI, grok, dump, entries, prefix, defs, buckets, i, i$, len$, entry, title, heteronyms, pre, code, post, codepointsOf, trie, abbrevToTitle, lenToTitles, lenToRegex, lens, k, v, prefixLength, ref$, suffix, abbrevIndex, orig, key$, ref1$, len, titles, cur, re, j$, len1$, t, one, two, split$ = ''.split, join$ = [].join;
  fs = require('fs');
  lang = process.argv[2];
  if (lang !== 'p' && lang !== 'm' && lang !== 's') {
    console.log("Please invoke this program with a single-letter argument, one of <[ p m s ]>.");
    process.exit();
  }
  if (!fs.existsSync(lang)) {
    fs.mkdirSync(lang);
  }
  PUA2UNI = {
    '⿰𧾷百': '𬦀',
    '⿸疒哥': '󿗧',
    '⿰亻恩': '𫣆',
    '⿰虫念': '𬠖',
    '⿺皮卜': '󿕅'
  };
  grok = function(it){
    return JSON.parse(fs.readFileSync(it, 'utf8').replace(/[⿰⿸⿺](?:𧾷|.)./g, function(it){
      return PUA2UNI[it];
    }));
  };
  dump = function(file, data){
    console.log("Writing: " + file);
    return fs.writeFileSync(file, JSON.stringify(data));
  };
  entries = (function(){
    switch (lang) {
    case 'p':
      return grok('dict-amis.json');
    case 'm':
      return grok('dict-amis-mp.json');
    case 's':
      return grok('dict-amis-safolu.json');
    }
  }());
  prefix = {};
  defs = {};
  buckets = {};
  i = 0;
  for (i$ = 0, len$ = entries.length; i$ < len$; ++i$) {
    entry = entries[i$], title = entry.title, heteronyms = entry.heteronyms;
    if (/\{\[[0-9a-f]{4}\]\}/.exec(title)) {
      continue;
    }
    if (/\uDB40[\uDD00-\uDD0F]/.exec(title)) {
      continue;
    }
    if (/[⿰⿸⿺]/.exec(title)) {
      continue;
    }
    pre = title.slice(0, 1);
    code = pre.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF) {
      pre = title.slice(0, 2);
      code = pre.charCodeAt(1) - 0xDC00;
      post = title.slice(2);
    } else {
      post = title.slice(1);
    }
    prefix[pre] == null && (prefix[pre] = '');
    if (post.length) {
      prefix[pre] += "|" + post;
    }
    defs[title] = entry;
  }
  fs.writeFileSync('prefix.json', JSON.stringify(prefix));
  codepointsOf = function(it){
    return it.length - it.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g).length + 1;
  };
  trie = prefix;
  abbrevToTitle = {};
  lenToTitles = {};
  lenToRegex = {};
  lens = [];
  for (k in trie) {
    v = trie[k];
    prefixLength = codepointsOf(k);
    for (i$ = 0, len$ = (ref$ = split$.call(v, '|')).length; i$ < len$; ++i$) {
      suffix = ref$[i$];
      abbrevIndex = suffix.indexOf('(');
      if (abbrevIndex >= 0) {
        orig = suffix;
        suffix = suffix.slice(0, abbrevIndex);
        abbrevToTitle[k + "" + suffix] = k + "" + orig;
      }
      ((ref1$ = lenToTitles[key$ = prefixLength + suffix.length]) != null
        ? ref1$
        : lenToTitles[key$] = []).push(k + "" + suffix);
    }
  }
  for (len in lenToTitles) {
    titles = lenToTitles[len];
    lens.push(len);
    titles.sort();
    lenToRegex[len] = (join$.call(titles, '|')).replace(/[-[\]{}()*+?.,\\#\s]/g, "\\$&");
    fs.writeFileSync("lenToRegex." + len + ".json", JSON.stringify((ref$ = {}, ref$[len + ""] = (join$.call(titles, '|')).replace(/[-[\]{}()*+?.,\\#\s]/g, "\\$&"), ref$)));
  }
  lens.sort(function(a, b){
    return b - a;
  });
  for (i$ = 0, len$ = (ref$ = [2, 3, 4]).length; i$ < len$; ++i$) {
    len = ref$[i$];
    if (titles = lenToTitles[len]) {
      cur = '';
      re = '';
      for (j$ = 0, len1$ = titles.length; j$ < len1$; ++j$) {
        t = titles[j$];
        one = t.slice(0, 1);
        two = t.slice(1);
        code = one.charCodeAt(0);
        if (0xD800 <= code && code <= 0xDBFF) {
          one = t.slice(0, 2);
          two = t.slice(2);
        }
        if (one === cur) {
          if (len !== 2) {
            re += "|";
          }
          re += two;
        } else {
          if (len === 2) {
            re += "]|" + one + "[" + two;
          }
          if (len !== 2) {
            re += ")|" + one + "(" + two;
          }
        }
        cur = one;
      }
      if (len === 2) {
        re = re.replace(/\[(.|[\uD800-\uDBFF].)\]/g, '$1');
      }
      if (len !== 2) {
        re = re.replace(/\(([^|]+)\)/g, '$1');
      }
      re = re.slice(2).replace(/[-{}*+?.,\\#\s]/g, "\\$&");
      if (len === 2) {
        re += "]";
      }
      if (len !== 2) {
        re += ")";
      }
      dump(lang + "/lenToRegex." + len + ".json", (ref1$ = {}, ref1$[len + ""] = re, ref1$));
      lenToRegex[len] = re;
    }
  }
  dump(lang + "/precomputed.json", {
    abbrevToTitle: abbrevToTitle
  });
  dump(lang + "/lenToRegex.json", {
    lenToRegex: lenToRegex
  });
}).call(this);
