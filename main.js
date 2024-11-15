(function(){
  var GET_SUCCESS = 'GET_SUCCESS';
  var GET_FAILURE = 'GET_FAILURE';
  var isCordova, isMoedictDesktop, DEBUGGING, ref$, STANDALONE, ref1$, any, map, unique, React, LANG, MOEID, XREFLABELOF, TITLEOF, HASHOF, STARRED, key, LRU, res$, isQuery, isDroidGap, isDeviceReady, isMobile, isApp, isWebKit, isGecko, isChrome, isPrerendered, widthIsXs, entryHistory, INDEX, STEM, CH_STEM_MAPPING, XREF, CACHED, addToLru, Success, Failure, GET, e, playing, player, seq, getEl, callLater, han_amis_lookup, LoadedScripts, split$ = ''.split, replace$ = ''.replace, join$ = [].join;

  window.isCordova = isCordova = !/^https?:/.test(document.URL) && !/^http:\/\/localhost/.test(document.URL);

  if (window.moedictDesktop) {
    window.isMoedictDesktop = isMoedictDesktop = true;
  }

  DEBUGGING    = !isCordova && !!((ref$ = window.cordova) != null && ref$.require);
  STANDALONE   = window.STANDALONE;
  ref1$        = require('prelude-ls'), any = ref1$.any, map = ref1$.map, unique = ref1$.unique;
  window.$     = window.jQuery = require('jquery');
  React        = require('react');
  React.View   = require('./view');
  window.React = React;

  if (!window.PRERENDER_LANG) {
    $(function(){
      return React.View.result = React.render(React.View.Result(), $('#result')[0]);
    });
  }

  LANG = STANDALONE || window.PRERENDER_LANG || getPref('lang') || 's';

  MOEID = getPref('prev-id') || {
    p: 'ci\'im',
    m: 'aag',
    s: 'co\'ong'
  }[LANG];

  $(function(){
    $('body').addClass("lang-" + LANG);
    React.render(React.createElement(React.View.Links), $('#links')[0]);
    React.render(React.createElement(React.View.UserPref), $('#user-pref')[0]);
    return React.render(React.createElement(React.View.Nav, {
      STANDALONE: STANDALONE
    }), $('#nav')[0], function(){
      $('.lang-active').text($(".lang-option." + LANG + ":first").text());
      if (/MSIE|Trident/.exec(navigator.userAgent)) {
        return $('form[id=lookback]').remove();
      } else {
        $('form[id=lookback]').attr('accept-charset', 'big5');
        if (window.PRERENDER_ID) {
          $('form[id=lookback] input[id=cond]').val("^" + window.PRERENDER_ID + "$");
          return $('#query').val(window.PRERENDER_ID);
        }
      }
    });
  });

  XREFLABELOF = {
    p: '方',
    m: '潘',
    s: '蔡'
  };

  TITLEOF = {
    p: '方敏英',
    m: '潘世光',
    s: '蔡中涵'
  };

  HASHOF = {
    p: '#~',
    m: "#!",
    s: '#:'
  };

  if ((isCordova || DEBUGGING) && !window.ALL_LANGUAGES) {
    if (STANDALONE) {
      HASHOF = (ref1$ = {}, ref1$[STANDALONE + ""] = HASHOF[STANDALONE], ref1$);
    } else {
      delete HASHOF.c;
    }
  }

  window.STARRED = STARRED = (function(){
    var resultObj$ = {};
    for (key in HASHOF) {
      resultObj$[key] = getPref("starred-" + key) || "";
    }
    return resultObj$;
  }());

  res$ = {};
  for (key in HASHOF) {
    res$[key] = getPref("lru-" + key) || "";
  }
  LRU = res$;

  isQuery = /^\?q=/.exec(location.search);
  isDroidGap = isCordova && /android_asset/.exec(location.href);
  isDeviceReady = !isCordova;
  if (DEBUGGING) { isCordova = true; }

  isMobile = isCordova || 'ontouchstart' in window || 'onmsgesturechange' in window;

  if (isCordova || (function(){
    var ref$;
    try {
      return ((ref$ = window.locationbar) != null ? ref$.visible : void 8) === false;
    } catch (e$) {}
  }())) {
    isApp = true;
  }

  isWebKit = /WebKit/.exec(navigator.userAgent);
  isGecko  = /\bGecko\/\b/.exec(navigator.userAgent);
  isChrome = /\bChrome\/\b/.exec(navigator.userAgent);
  isPrerendered = window.PRERENDER_LANG;
  entryHistory = [];

  widthIsXs = function(){
    return $('body').width() < 768;
  };

  INDEX = {
    p: '',
    m: '',
    s: ''
  };

  STEM = {
    p: '',
    m: '',
    s: ''
  };

  CH_STEM_MAPPING = {
    p: '',
    m: '',
    s: ''
  };

  XREF = {
    p: {
      m: "aag",
      s: 'co\'ong'
    },
    m: {
      p: "ci'im",
      s: 'co\'ong'
    },
    s: {
      p: "ci'im",
      m: 'aag'
    }
  };

  function xrefOf(id, srcLang, tgtLangOnly){
    var rv, parsed, i$, ref$, len$, chunk, ref1$, tgtLang, words, idx, part, x;
    srcLang == null && (srcLang = LANG);
    rv = {};
    if (typeof XREF[srcLang] === 'string') {
      parsed = {};
      for (i$ = 0, len$ = (ref$ = XREF[srcLang].split('}')).length; i$ < len$; ++i$) {
        chunk = ref$[i$];
        ref1$ = chunk.split('":{'), tgtLang = ref1$[0], words = ref1$[1];
        if (words) {
          parsed[tgtLang.slice(-1)] = words;
        }
      }
      XREF[srcLang] = parsed;
    }
    for (tgtLang in ref$ = XREF[srcLang]) {
      words = ref$[tgtLang];
      if (tgtLangOnly && tgtLang !== tgtLangOnly) {
        continue;
      }
      idx = words.indexOf('"' + id + '":');
      rv[tgtLang] = idx < 0
        ? []
        : (part = words.slice(idx + id.length + 4), idx = part.indexOf('"'), part = part.slice(0, idx), (fn$()));
      if (tgtLangOnly) {
        return rv[tgtLang];
      }
    }
    return rv;
    function fn$(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = split$.call(part, /,+/)).length; i$ < len$; ++i$) {
        x = ref$[i$];
        results$.push(x || id);
      }
      return results$;
    }
  }

  CACHED = {};
  addToLru = function(it){
    var key, lru;
    key = "\"" + it + "\"\n";
    LRU[LANG] = key + (LRU[LANG] = replace$.call(LRU[LANG], key + "", ''));
    lru = split$.call(LRU[LANG], '\n');
    if (lru.length > 5000) {
      if (!isCordova) {
        rmPref("GET " + LANG + "/" + encodeURIComponent(lru.pop().slice(1, -1)) + ".json");
      }
      LRU[LANG] = join$.call(lru, '\n') + '\n';
    }
    return setPref("lru-" + LANG, LRU[LANG]);
  };

  Success = function(value) {
    return { status: GET_SUCCESS, value: value };
  };

  Failure = function(message) {
    return { status: GET_FAILURE, value: undefined, message: message };
  };

  GET = function(url, data, onResult, dataType){
    var ref$, that, success, error, beforeSend;
    if (LANG === 'p' || LANG === 'm' || LANG === 's') {
      url = url.toLowerCase();
    }
    if (data instanceof Function) {
      ref$ = [null, onResult, data], data = ref$[0], dataType = ref$[1], onResult = ref$[2];
    }
    if (that = CACHED[url]) {
      return onResult(Success(that));
    }
    dataType == null && (dataType = 'text');
    success = function(it){
      var that;

      if (/^[a-z]\/([^-a-z@=].+)\.json$/.exec(url)) {
        addToLru(decodeURIComponent(RegExp.$1));
        if (!isCordova) {
          setPref("GET " + url, it);
        }
      }

      if (it.search(/^\<\!DOCTYPE html\>/) !== -1) {
        return onResult(Failure('Not Found'));
      }

      return onResult(Success(CACHED[url] = it));
    };
    error = function(_, __, statusText){
      var that;
      if (that = getPref("GET " + url)) {
        return onResult(Success(CACHED[url] = that));
      } else {
        return onResult(Failure(statusText));
      }
    };
    beforeSend = function(it){
      if (dataType === 'text') {
        return it.overrideMimeType('text/plain; charset=UTF-8');
      }
    };
    return $.ajax({
      url: url,
      data: data,
      dataType: dataType,
      success: success,
      error: error,
      beforeSend: beforeSend
    });
  };

  try {
    if (!(isCordova && !DEBUGGING)) {
      throw null;
    }
    document.addEventListener('deviceready', function(){
      isDeviceReady = true;
      $('body').on('click', 'a[target]', function(){
        var href;
        href = $(this).attr('href');
        window.open(href, '_system');
        return false;
      });
      return window.doLoad();
    }, false);
    document.addEventListener('pause', function(){
      return stopAudio();
    }, false);
  } catch (e$) {
    e = e$;
    $(function(){
      var url;
      $('#F9868').html('&#xF9868;');
      $('#loading').text('載入中，請稍候……');
      if (/^http:\/\/(?:www.)?moedict.tw/i.exec(document.URL)) {
        url = "https://amis.moedict.tw/";
        if (/^#./.exec(location.hash)) {
          url += location.hash;
        }
        return location.replace(url);
      } else {
        if (/MSIE\s+[678]/.exec(navigator.userAgent)) {
          $('.navbar, .query-box').hide();
          $('#result').css('margin-top', '50px');
        }
        return window.doLoad();
      }
    });
  }

  function setPref(k, v){
    try {
      return typeof localStorage != 'undefined' && localStorage !== null ? localStorage.setItem(k, typeof JSON != 'undefined' && JSON !== null ? JSON.stringify(v) : void 8) : void 8;
    } catch (e$) {}
  }

  function getPref(k){
    var ref$;
    try {
      return $.parseJSON((ref$ = typeof localStorage != 'undefined' && localStorage !== null ? localStorage.getItem(k) : void 8) != null ? ref$ : 'null');
    } catch (e$) {}
  }

  function rmPref(k){
    try {
      return typeof localStorage != 'undefined' && localStorage !== null ? localStorage.removeItem(k) : void 8;
    } catch (e$) {}
  }

  seq = 0;
  getEl = function(){
    return $("#player-" + seq);
  };

  window.stopAudio = function(){
    var $el;
    $el = getEl();
    if ($el.length) {
      $el.parent('.audioBlock').removeClass('playing');
      $el.removeClass('icon-stop').removeClass('icon-spinner').show();
      $el.addClass('icon-play');
    }
    if (player != null) {
      player.unload();
    }
    player = null;
    return playing = null;
  };

  window.playAudio = function(el, url){
    var done, play;
    done = function(){
      return stopAudio();
    };
    play = function(){
      var $el, urls, audio;
      $el = getEl();
      if (playing === url) {
        if ($el.hasClass('icon-stop')) {
          stopAudio();
          done();
        }
        return;
      }
      stopAudio();
      seq++;
      $(el).attr('id', "player-" + seq);
      $el = getEl();
      playing = url;
      $('#result .playAudio').show();
      $('.audioBlock').removeClass('playing');
      $el.removeClass('icon-play').addClass('icon-spinner');
      $el.parent('.audioBlock').addClass('playing');
      urls = [url];
      if (/(ogg|opus)$/.exec(url) && canPlayMp3()) {
        urls.unshift(url.replace(/(ogg|opus)$/, 'mp3'));
      }
      audio = new window.Howl({
        buffer: true,
        html5: true,
        src: urls,
        urls: urls,
        onend: done,
        format: ['wav'],
        onloaderror: done,
        onplay: function(){
          return $el.removeClass('icon-play').removeClass('icon-spinner').addClass('icon-stop').show();
        }
      });
      audio.play();
      return player = audio;
    };
    if (window.Howl) {
      return play();
    }
    return getScript('js/howler.js', function(){
      return play();
    });
  };

  window.showInfo = function(){
    var ref, onStop, onExit;
    ref = window.open('about.html', '_blank', 'location=no');
    onStop = function(arg$){
      var url;
      url = arg$.url;
      if (/quit\.html/.exec(url)) {
        return ref.close();
      }
    };
    onExit = function(){
      ref.removeEventListener('loadstop', onStop);
      return ref.removeEventListener('exit', onExit);
    };
    ref.addEventListener('loadstop', onStop);
    return ref.addEventListener('exit', onExit);
  };

  callLater = function(it){
    return setTimeout(it, isMobile ? 10 : 1);
  };

  window.doLoad = function(){
    var fontSize, saveFontSize, cacheLoading, pressAbout, pressErase, pressBack, init, grokVal, grokHash, fillQuery, prevId, prevVal, bucketOf, lookup, doLookup, htmlCache, res$, key, fetch, loadJson, bindHtmlActions, fillNotFound, fillJson, fillBucket, i$, ref$, results$ = [];

    if (!isDeviceReady)           { return; }
    if (isCordova)                { $('body').addClass('cordova'); }
    if (isApp)                    { $('body').addClass('app'); }
    if (!isApp)                   { $('body').addClass('web'); }
    if (isCordova && !isDroidGap) { $('body').addClass('ios'); }
    if (!(isMobile || isApp))     { $('body').addClass('desktop'); }
    if (isDroidGap)               { $('body').addClass('android'); }

    if (!(STANDALONE && isDroidGap)) {
      window.IS_GOOGLE_AFS_IFRAME_ = true;
      setTimeout(function(){
        var cx, gcse, s, pollGsc;
        cx = '007966820757635393756:sasf0rnevk4';
        gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + "//www.google.com/cse/cse.js?cx=" + cx;
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
        pollGsc = function(){
          if (!$('.gsc-input').length) {
            return setTimeout(pollGsc, 500);
          }
          $('.gsc-input').attr('placeholder', 'Search');
          return isQuery = false;
        };
        return setTimeout(pollGsc, 500);
      }, 1);
    }

    if (!(isApp || widthIsXs())) {
      setTimeout(function(){
        return !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");;
      }, 1);
    }

    if (/Android\s*[12]\./.exec(navigator.userAgent)) {
      $('body').addClass('overflow-scrolling-false');
      $('body').addClass("prefer-down-false");
    } else {
      $('body').addClass('overflow-scrolling-true');
      $('body').addClass("prefer-down-false");
    }
    fontSize = getPref('font-size') || 14;

    $('body').bind('pinch', function(arg$, arg1$){
      var scale;
      scale = arg1$.scale;
      return $('body').css('font-size', Math.max(10, Math.min(42, scale * fontSize)) + 'pt');
    });

    saveFontSize = function(arg$, arg1$){
      var scale;
      scale = arg1$.scale;
      setPref('font-size', fontSize = Math.max(10, Math.min(42, scale * fontSize)));
      return $('body').css('font-size', fontSize + 'pt');
    };

    $('body').bind('pinchclose', saveFontSize);
    $('body').bind('pinchopen', saveFontSize);

    window.adjustFontSize = function(offset){
      setPref('font-size', fontSize = Math.max(10, Math.min(42, fontSize + offset)));
      return $('body').css('font-size', fontSize + 'pt');
    };
    window.adjustFontSize(0);
    cacheLoading = false;

    if (isCordova) {
      window.pressAbout = pressAbout = function(){
        return window.open('about.html', '_blank');
      };
    } else {
      window.pressAbout = pressAbout = function(){
        return location.href = 'about.html';
      };
    }

    window.pressErase = pressErase = function(){
      $('#query').val('').focus();
      return $('.erase-box').hide();
    };

    window.pressBack = pressBack = function(){
      var cur, token;
      stopAudio();
      if (isDroidGap && !$('.ui-autocomplete').hasClass('invisible') && widthIsXs()) {
        try {
          $('#query').autocomplete('close');
        } catch (e$) {}
        return;
      }
      if (cacheLoading) {
        return;
      }
      if (isDroidGap && entryHistory.length <= 1) {
        window.pressQuit();
      }
      cur = entryHistory[entryHistory.length - 1];
      while (entryHistory[entryHistory.length - 1] === cur) {
        entryHistory.pop();
        if (isDroidGap && entryHistory.length < 1) {
          window.pressQuit();
        }
      }
      token = Math.random();
      cacheLoading = token;
      setTimeout(function(){
        if (cacheLoading === token) {
          return cacheLoading = false;
        }
      }, 10000);
      callLater(function(){
        var id;
        id = entryHistory.length ? entryHistory[entryHistory.length - 1] : MOEID;
        return window.grokVal(id);
      });
      return false;
    };

    try {
      document.addEventListener('backbutton', function(){
        if (entryHistory.length <= 1) {
          window.pressQuit();
        } else {
          window.pressBack();
        }
      }, false);
    } catch (e$) {}

    window.pressQuit = function(){
      stopAudio();
      return navigator.app.exitApp();
    };

    init = function(){
      var onFollow;
      $('#query').keyup(lookup).change(lookup).keypress(lookup).keydown(lookup).on('input', lookup);
      $('#query').on('focus', function(){
        return this.select();
      });
      $('#query').on('click', function(){
        try {
          if ($('#query').val()) {
            return $('#query').autocomplete('search');
          }
        } catch (e$) {}
      });
      $('#query').show();
      if (!isCordova) {
        $('#query').focus();
      }
      $('body').on('dblclick', '.entry', function(){
        return;
        $(this).css({
          borderRadius: '10px',
          background: '#eeeeff'
        }).attr('contentEditable', true);
        return $('#sendback').fadeIn();
      });
      $('body').on('shown.bs.dropdown', '.navbar', function(){
        if (widthIsXs()) {
          $(this).css('position', 'absolute');
          $(this).hide();
          return $(this).fadeIn(0);
        }
      });
      $('body').on('hidden.bs.dropdown', '.navbar', function(){
        return $(this).css('position', 'fixed');
      });
      if (isApp) {
        $('body').on('touchstart', '#gcse a.gs-title', function(){
          var val, url;
          $(this).removeAttr('href');
          val = $('#gcse input:visible').val();
          url = $(this).data('ctorig') || replace$.call($(this).attr('href'), /^.*?q=/, '').replace(/&.*$/, '');
          setTimeout(function(){
            $('#gcse input:visible').val(val);
            return grokVal(decodeHash(url = replace$.call(url, /^.*\//, '')));
          }, 1);
          $('.gsc-results-close-btn').click();
          return false;
        });
      }
      $('body').on('click', 'li.dropdown-submenu > a', function(){
        if (widthIsXs()) {
          $(this).next('ul').slideToggle('fast');
        }
        return false;
      });
      $('body').on('click', '#btn-starred', function(){
        if ($('#query').val() === '=*') {
          window.pressBack();
        } else {
          grokVal((HASHOF[LANG] + "=*").replace(/^#/, ''));
        }
        return false;
      }).on('click', '#btn-pref', function(e){
        e.preventDefault();
        return $('#user-pref').slideToggle();
      }).on('click', '#user-pref .btn-close', function(){
        return $('#user-pref').slideUp();
      }).on('click', 'a[for="starred-record--history"]', function(){
        $('.result nav li.active').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.starred-record--fav').hide();
        return $('.starred-record--history').show();
      }).on('click', 'a[for="starred-record--fav"]', function(){
        $('.result nav li.active').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.starred-record--fav').show();
        return $('.starred-record--history').hide();
      });
      if (!('onhashchange' in window)) {
        $('body').on('click', 'a', function(){});
      }
      $('body').on('click', '#btn-clear-lru', function(){
        var lru, i$, len$, word;
        if (!confirm("確定要清除瀏覽紀錄？")) {
          return;
        }
        $('#lru').prevAll('br').remove();
        $('#lru').nextAll().remove();
        $('#lru').fadeOut('fast');
        if (!isCordova) {
          lru = split$.call(LRU[LANG], '\n');
          for (i$ = 0, len$ = lru.length; i$ < len$; ++i$) {
            word = lru[i$];
            rmPref("GET " + LANG + "/" + encodeURIComponent(word.slice(1, -1)) + ".json");
          }
        }
        LRU[LANG] = [];
        return setPref("lru-" + LANG, '');
      });
      onFollow = function(it){
        var val;
        if (it.metaKey || it.ctrlKey) {
          return;
        }
        val = $(this).attr('href');
        if (val === '#' || val === '#~') {
          return true;
        }
        if ($('.dropdown.open').length) {
          $('.navbar').css('position', 'fixed');
          $('.dropdown.open').removeClass('open');
        }
        if (val) {
          val = replace$.call(val, /[^#]*(\.\/|\#)+/, '');
        }
        val || (val = $(this).text());
        window.grokVal(val);
        return false;
      };
      if (isCordova || !'onhashchange' in window) {
        $('#result, .dropdown-menu').on('click', 'a[href^="#"]:not(.mark)', onFollow);
      } else {
        $('#result, .dropdown-menu').on('click', 'a[href^="./"]:not([href^="#"]):not(.mark)', onFollow);
      }
      if (!isDroidGap) {
        window.onpopstate = function(){
          var state;
          if (isDroidGap) {
            return window.pressBack();
          }
          state = decodeURIComponent((location.pathname + "").slice(1));
          if (!/\S/.test(state)) {
            return grokHash();
          }
          return grokVal(state);
        };
      }
      if (isPrerendered) {
        return;
      }
      if (window.grokHash()) {
        return;
      }
      if (isCordova) {
        fillQuery(MOEID);
        return $('#query').val('');
      } else if (!/^#./.test(location.hash)) {
        return fetch(MOEID);
      }
    };

    window.grokVal = grokVal = function(val){
      var lang;
      stopAudio();
      val = replace$.call(val, /[\\"]/g, '');
      val = val.replace(/`(.+)~$/, '$1');
      if (/</.exec(val) || /^\s+$/.exec(val) || /index.html/.exec(val)) {
        return;
      }
      if (/^~/.exec(val + "")) {
        lang = 'p';
        val = val.substr(1);
      }
      if (/^!/.exec(val + "")) {
        lang = 'm';
        val = val.substr(1);
      }
      if (/^:/.exec(val + "")) {
        lang = 's';
        val = val.substr(1);
      }
      $('.lang-active').text($(".lang-option." + lang + ":first").text());
      if (lang !== LANG) {
        return setTimeout(function(){
          return window.pressLang(lang, val);
        }, 1);
      }
      val = val.toLowerCase();
      if (val === prevVal) {
        return true;
      }
      $('#query').show();
      fillQuery(val);
      fetch(val);
      if (val === prevVal) {
        return true;
      }
      return false;
    };

    window.decodeHash = function(it){
      if (/%/.exec(it)) {
        it = decodeURIComponent(it);
      }
      if (/%[A-Fa-f]/.exec(escape(it))) {
        it = decodeURIComponent(escape(it));
      }
      return it;
    };

    window.grokHash = grokHash = function(){
      if (!/^#./.test(location.hash)) {
        return false;
      }
      try {
        grokVal(decodeHash((location.hash + "").replace(/^#+/, '')));
        return true;
      } catch (e$) {}
      return false;
    };

    window.fillQuery = fillQuery = function(it){
      var title, input;
      title = replace$.call(decodeURIComponent(it), /[（(].*/, '');
      title = replace$.call(title, /^[:!~;\|]/, '');
      if (/^</.exec(title)) {
        return;
      }
      if (/^→/.exec(title)) {
        if (isMobile && widthIsXs()) {
          $('#query').blur();
        }
        setTimeout(function(){
          $('#query').autocomplete('search');
        }, 500);
      }
      $('#query').val(title);
      if (!isCordova) {
        $('form[id=lookback] input[id=cond]').val("^" + title + "$");
      }
      input = $('#query').get(0);
      if (isMobile) {
        try {
          $('#query').autocomplete('close');
        } catch (e$) {}
        try {
          if (widthIsXs) {
            $('#query').blur();
          }
        } catch (e$) {}
      } else {
        input.focus();
        try {
          input.select();
        } catch (e$) {}
      }
      lookup(title);
      return true;
    };

    prevId = prevVal = window.PRERENDER_ID;

    window.pressLang = function(lang, id){
      var i$, ref$, ref1$, len$, ref2$, words;
      lang == null && (lang = '');
      id == null && (id = '');
      id = replace$.call(id, /#/g, '');
      if (STANDALONE) {
        return;
      }
      if (lang === LANG && !id) {
        return;
      }
      prevId = null;
      prevVal = null;
      LANG = lang || (function(){
        switch (LANG) {
        case 'p':
          return 'm';
        case 'm':
          return 's';
        case 's':
          return 'p';
        }
      }());
      $('#query').val('');
      $('.ui-autocomplete li').remove();
      $('iframe').fadeIn('fast');
      $('.lang-active').text($(".lang-option." + LANG + ":first").text());
      setPref('lang', LANG);
      for (i$ = 0, len$ = (ref$ = ((ref1$ = React.View.result) != null ? ref1$.props.xrefs : void 8) || []).length; i$ < len$; ++i$) {
        ref2$ = ref$[i$], lang = ref2$.lang, words = ref2$.words;
        if (lang === LANG) {
          id || (id = words[0]);
        }
      }
      id || (id = (ref$ = LRU[LANG]) != null ? ref$.replace(/[\\\n][\d\D]*/, '') : void 8);
      id || (id = {
        p: 'ci\'im',
        m: 'aag',
        s: 'co\'ong'
      }[LANG]);
      id = replace$.call(id, /[\\"~`]/g, '');
      if (!isCordova) {
        GET(LANG + "/index.json", function(it){
          if (it.status === GET_FAILURE) return;
          return INDEX[LANG] = it.value;
        }, 'text');
        GET(LANG + "/stem-words.json", function(it){
          if (it.status === GET_FAILURE) return;
          return STEM[LANG] = $.parseJSON(it.value);
        }, 'text');
        GET(LANG + "/ch-mapping.json", function(it){
          if (it.status === GET_FAILURE) return;
          return CH_STEM_MAPPING[LANG] = $.parseJSON(it.value);
        }, 'text');
      }
      $('body').removeClass("lang-a");
      $('body').removeClass("lang-t");
      $('body').removeClass("lang-c");
      $('body').removeClass("lang-h");
      $('body').removeClass("lang-p");
      $('body').removeClass("lang-m");
      $('body').removeClass("lang-s");
      $('body').addClass("lang-" + LANG);
      $('#query').val(id);
      return window.doLookup(id);
    };

    bucketOf = function(it){
      var code;
      if (/^[=@]/.exec(it)) {
        return it[0];
      }
      code = it.charCodeAt(0);
      if (0xD800 <= code && code <= 0xDBFF) {
        code = it.charCodeAt(1) - 0xDC00;
      }
      return code % (LANG === 'a' ? 1024 : 128);
    };

    lookup = function(){
      var that;
      if (that = $('#query').val()) {
        $('.erase-box').show();
        return doLookup(that.toLowerCase());
      }
      return $('.erase-box').hide();
    };

    window.doLookup = doLookup = function(val){
      var title, Index, id, hist;
      title = replace$.call(val, /[（(].*/, '');
      Index = INDEX[LANG];
      if (/^[=@]/.exec(title)) {} else if (isCordova || !Index) {
        if (/object/.exec(title)) {
          return;
        }
        if (LANG === 's') {
          if (Index && Index.indexOf("\"" + title + "\ufffa") === -1) {
            return true;
          }
        } else {
          if (Index && Index.indexOf("\"" + title + "\"") === -1) {
            return true;
          }
        }
      } else {
        if (prevVal === val) {
          return true;
        }
        prevVal = val;
        if (LANG === 's') {
          if (!(Index.indexOf("\"" + title + "\ufffa") >= 0)) {
            return true;
          }
        } else {
          if (!(Index.indexOf("\"" + title + "\"") >= 0)) {
            return true;
          }
        }
      }
      id = title;
      if (prevId === id || replace$.call(id, /\(.*/, '') !== replace$.call(val, /\(.*/, '')) {
        return true;
      }
      if (!isCordova) {
        $('form[id=lookback] input[id=cond]').val("^" + title + "$");
      }
      hist = HASHOF[LANG].slice(1) + "" + title;
      if (!(entryHistory.length && entryHistory[entryHistory.length - 1] === hist)) {
        entryHistory.push(hist);
      }
      if (isApp || LANG !== 'a' || /^[=@]/.exec(title)) {
        $('.back').hide();
      } else {
        $('.back').show();
      }
      fetch(title);
      return true;
    };

    res$ = {};
    for (key in HASHOF) {
      res$[key] = [];
    }
    htmlCache = res$;

    fetch = function(it){
      var hash, page, e, id, ref$, this$ = this;
      if (!it) {
        return;
      }
      if (prevId === it) {
        return;
      }
      prevId = it;
      prevVal = it;
      setPref('prev-id', prevId);
      hash = HASHOF[LANG] + "" + it;
      if (!isQuery) {
        if (isPrerendered || /^https:\/\/(?:www.)?moedict.tw/i.exec(document.URL)) {
          page = hash.slice(1);
          if (decodeURIComponent(location.pathname) + "" !== "/" + page) {
            if (history.replaceState) {
              if ((location.hash + "").length > 1) {
                history.replaceState(null, null, page);
              } else {
                history.pushState(null, null, page);
              }
            } else {
              if ((location.hash + "").replace(/^#/, '') !== page) {
                location.replace(hash);
              }
            }
          }
        } else if (location.hash + "" !== hash) {
          try {
            history.pushState(null, null, hash);
          } catch (e$) {
            e = e$;
            location.replace(hash);
          }
        }
        if (/^\?q=/.exec(location.search)) {
          location.search = '';
        }
      }
      try {
        document.title = it + " - " + TITLEOF[LANG] + "萌典";
      } catch (e$) {}
      $('.share .btn').each(function(){
        return $(this).attr({
          href: $(this).data('href').replace(/__TEXT__/, prevId) + encodeURIComponent(encodeURIComponent(hash.substr(1)))
        });
      });
      id = it;
      if ((ref$ = React.View.result) != null) {
        ref$.replaceProps({
          id: id,
          type: 'spin'
        });
      }
      return setTimeout(function(){
        return loadJson(id);
      }, 1);
    };

    loadJson = function(id, cb){
      var bucket;
      if (/^=\*/.exec(id)) {
        return fillJson("[" + STARRED[LANG] + "]", '字詞紀錄簿', cb);
      }
      if (!isCordova) {
        return GET(LANG + "/" + encodeURIComponent(replace$.call(id, /\(.*/, '')) + ".json", null, function(it){
          if (it.status === GET_FAILURE) {
            return fillNotFound(id, cb);
          };
          return fillJson(it.value, id, cb);
        }, 'text');
      }
      bucket = bucketOf(id);
      return fillBucket(id, bucket, cb);
    };

    window.bindHtmlActions = bindHtmlActions = function(){
      var $result, $h1, $tooltip;
      $result = $('#result');
      $h1 = $result.find('h1, .h1');
      $tooltip = $('.ui-tooltip');
      $tooltip.remove();
      setTimeout(function(){
        $tooltip.remove();
        return setTimeout(function(){
          return $tooltip.remove();
        }, 125);
      }, 125);
      return React.render(React.createElement(React.View.UserPref), $('#user-pref')[0], function(){
        var vclick;
        window.scrollTo(0, 0);
        $h1.css('visibility', 'visible').find('a[word-id]').each(function(){
          var $it, html, ci;
          if (isCordova) {
            return;
          }
          $it = $(this);
          html = this.cloneNode().outerHTML;
          ci = document.createTextNode($it.text());
          $it.closest('ru').wrap(html).end().replaceWith(ci);
        }).end().on('mouseover', 'a[word-id]', function(){
          var $it, i;
          $it = $(this);
          i = $it.attr('word-id');
          $it.parents('h1, .h1').find('a[word-id=' + i + ']').addClass('hovered');
        }).on('mouseout', 'a.hovered', function(){
          $h1.find('a').removeClass('hovered');
        });
        $('#result .part-of-speech a').attr('href', null);
        cacheLoading = false;
        vclick = isMobile ? 'touchstart click' : 'click';
        $('.results .star').on(vclick, function(){
          var $star, key;
          $star = $(this).hide();
          key = "\"" + prevId + "\"\n";
          if ($(this).hasClass('icon-bookmark')) {
            STARRED[LANG] = key + STARRED[LANG];
            $(this).attr('title', '已加入記錄簿');
          } else {
            STARRED[LANG] = replace$.call(STARRED[LANG], key + "", '');
            $(this).attr('title', '加入字詞記錄簿');
          }
          $(this).toggleClass('icon-bookmark-empty').toggleClass('icon-bookmark');
          $('#btn-starred a').fadeOut('fast', function(){
            return $(this).css('background', '#ddd').fadeIn(function(){
              $(this).css('background', 'transparent');
              return $star.fadeIn('fast');
            });
          });
          return setPref("starred-" + LANG, STARRED[LANG]);
        });
        $('.results .playAudio').click(function(){
          return window.playAudio(this, $(this).find("meta[itemprop='contentURL']").attr('content'));
        });
        if (isCordova && !DEBUGGING) {
          try {
            navigator.splashscreen.hide();
          } catch (e$) {}
          $('#result .playAudio').on('touchstart', function(){
            if ($(this).hasClass('icon-play')) {
              return $(this).click();
            }
          });
          return;
        }
        $('#result a[href]:not(.xref)').tooltip({
          disabled: true,
          show: 100,
          hide: 100,
          items: 'a',
          open: function(){
            var id;
            id = $(this).attr('href').replace(/^(\.\/)?#?['!:~;\|]?/, '');
            if (entryHistory.length && entryHistory[entryHistory.length - 1] === id) {
              try {
                $(this).tooltip('close');
              } catch (e$) {}
            }
          },
          content: function(cb){
            var id;
            id = $(this).attr('href').replace(/^(\.\/)?#?['!:~;\|]?/, '');
            if (LANG === 'p' || LANG === 'm' || LANG === 's') {
              id = id.toLowerCase();
            }
            callLater(function(){
              if (htmlCache[LANG][id]) {
                cb(htmlCache[LANG][id]);
                return;
              }
              return loadJson(id, function(it){
                return cb(it);
              });
            });
          }
        });
        return $('#result a[href]:not(.xref)').hoverIntent({
          timeout: 250,
          over: function(){
            var this$ = this;
            return setTimeout(function(){
              $('.ui-tooltip').remove();
              if (!$('#loading').length) {
                try {
                  return $(this$).tooltip('open');
                } catch (e$) {}
              }
            }, 50);
          },
          out: function(){
            try {
              return $(this).tooltip('close');
            } catch (e$) {}
          }
        });
      });
    };

    fillNotFound = function(id, cb){
      var reactProps = { type: 'not-found', id: id };
      if (cb) {
        return cb(React.renderToString(React.View.Result(reactProps)));
      }
      if (React.View.result) {
        return (ref$ = React.View.result) != null ? ref$.replaceProps(reactProps, bindHtmlActions) : void 8;
      }
      return React.View.result = React.render(React.View.Result(reactProps), $('#result')[0], bindHtmlActions);
    };

    fillJson = function(part, id, cb){
      var reactProps, xrefs, res$, lang, ref$, words;
      part = React.View.decodeLangPart(LANG, part);
      reactProps = null;
      if (/^\[/.exec(part)) {
        reactProps = {
          id: id,
          type: 'list',
          terms: part,
          H: HASHOF[LANG],
          LRU: LRU[LANG]
        };
      } else {
        res$ = [];
        for (lang in ref$ = xrefOf(id)) {
          words = ref$[lang];
          if (words.length) {
            res$.push({
              lang: lang,
              words: words
            });
          }
        }
        xrefs = res$;
        reactProps = import$({
          id: id,
          xrefs: xrefs,
          LANG: LANG,
          type: 'term',
          H: HASHOF[LANG]
        }, $.parseJSON(part));
      }
      if (cb) {
        return cb(React.renderToString(React.View.Result(reactProps)));
      }
      if (React.View.result) {
        return (ref$ = React.View.result) != null ? ref$.replaceProps(reactProps, bindHtmlActions) : void 8;
      }
      return React.View.result = React.render(React.View.Result(reactProps), $('#result')[0], bindHtmlActions);
    };

    fillBucket = function(id, bucket, cb){
      return GET("p" + LANG + "ck/" + bucket + ".txt", function(raw){
        if (raw.status === GET_FAILURE) return;
        raw = raw.value;
        var key, idx, part;
        key = escape(id);
        idx = raw.indexOf('"' + key + '":{');
        if (idx === -1) {
          return;
        }
        part = raw.slice(idx + key.length + 3);
        idx = part.indexOf('\n');
        part = part.slice(0, idx);
        addToLru(id);
        return fillJson(part, id, cb);
      });
    };

    GET(LANG + "/index.json", function(it){
      if (it.status === GET_FAILURE) return;
      INDEX[LANG] = it.value;
      init();
      return initAutocomplete();
    }, 'text');

    GET(LANG + "/stem-words.json", function(it){
      if (it.status === GET_FAILURE) return;
      STEM[LANG] = $.parseJSON(it.value);
      return initAutocomplete();
    }, 'text');

    GET(LANG + "/ch-mapping.json", function(it){
      if (it.status === GET_FAILURE) return;
      CH_STEM_MAPPING[LANG] = $.parseJSON(it.value);
      return initAutocomplete();
    }, 'text');
  };

  function renderTaxonomy(lang, taxonomy){
    var $ul, i$, ref$, len$, taxo, label, submenu;
    $ul = $('<ul/>', {
      'class': 'dropdown-menu'
    });
    if (lang === 'c' && !STANDALONE) {
      $ul.css({
        bottom: 0,
        top: 'auto'
      });
    }
    for (i$ = 0, len$ = (ref$ = taxonomy instanceof Array
      ? taxonomy
      : [taxonomy]).length; i$ < len$; ++i$) {
      taxo = ref$[i$];
      if (typeof taxo === 'string') {
        $ul.append($('<li/>', {
          role: 'presentation'
        }).append($('<a/>', {
          'class': "lang-option " + lang,
          href: "./" + HASHOF[lang] + "=" + taxo
        }).text(taxo)));
      } else {
        for (label in taxo) {
          submenu = taxo[label];
          $ul.append($('<li/>', {
            'class': 'dropdown-submenu'
          }).append($('<a/>', {
            href: '#'
          }).text(label)).append(renderTaxonomy(lang, submenu)));
        }
      }
    }
    return $ul;
  }

  function amisOrdering(list, term){
    var filteredList,
        termList = list.map(function(ele) { return ele.split("\ufffa")[0]; });

    list = list.sort();
    if (in$(term, termList)) {
      if (in$(term, Object.keys(STEM[LANG]))) {
        filteredList = list.filter(function(ele){
          var e = ele.split("\ufffa")[0];
          return !deepEq$(e, term, '===');
        });
        filteredList = filteredList.filter(function(ele){
          var e = ele.split("\ufffa")[0];
          return !in$(e, STEM[LANG][term]);
        });
        if (filteredList.length) {
          filteredList = ["以下是模糊搜尋"].concat(filteredList);
        }
        return [term].concat(STEM[LANG][term], filteredList);
      } else {
        filteredList = list.filter(function(ele){
          var e = ele.split("\ufffa")[0];
          return !deepEq$(e, term, '===');
        });
        return [term].concat(filteredList);
      }
    } else {
      return list;
    }
  }

  function initAutocomplete(){
    $.widget("ui.autocomplete", $.ui.autocomplete, {
      _close: function(){
        return this.menu.element.addClass('invisible');
      },
      _resizeMenu: function(){
        var ul;
        ul = this.menu.element;
        ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
        return ul.removeClass('invisible');
      },
      _value: function(it){
        if (it) {
          fillQuery(it);
        }
        return this.valueMethod.apply(this.element, arguments);
      },
      _renderItem: function(ul, item) {
        var array = item.label.split("\ufffa"), term = array[0], desc = '';
        if (array[1] !== undefined) {
          desc = array[1];
        }

        if (term === '舊版無資料，到新版查詢') {
          return $( "<li>" )
                   .append( "<div><a onclick=\"$('#new-site a').trigger('click')\">" + term + "</a></div>" )
                   .appendTo( ul );
        } else {
          return $( "<li>" )
                   .append( "<div>" + term + "<span>" + desc + "</span></div>" )
                   .appendTo( ul );
        }
      }
    });
    return $('#query').autocomplete({
      position: {
        my: "left bottom",
        at: "left top"
      },
      focus: function(e, arg$){
        arg$.item.label = arg$.item.label.split("\ufffa")[0];
        arg$.item.value = arg$.item.value.split("\ufffa")[0];
      },
      select: function(e, arg$){
        var item, val;
        item = arg$.item;
        if (/^\(/.exec(item != null ? item.value : void 8)) {
          return false;
        }
        if (item != null && item.value) {
          fillQuery(item.value);
        }
        return true;
      },
      change: function(e, arg$){
        var item;
        item = arg$.item;
        if ($('#query').data('changing')) {
          return;
        }
        if (/^\(/.exec(item != null ? item.value : void 8)) {
          return false;
        }
        return $('#query').data({
          changing: true
        });
        if (item != null && item.value) {
          fillQuery(item.value);
        }
        return $('#query').data({
          changing: false
        });
        return true;
      },
      source: function(arg$, cb){
        var term, regex, results, i$, ref$, len$, v, MaxResults, more, this$ = this;
        term = arg$.term;
        $('iframe').fadeOut('fast');
        if (!term.length) {
          return cb([]);
        }
        if ((LANG === 'p' || LANG === 'm' || LANG === 's') && !/[\u0000-\u00FF]/.test(term)) {
          return han_amis_lookup(term, cb);
        }
        if (widthIsXs() && !/[「」。，?.*_% ]/.test(term)) {
          return cb(["→列出含有「" + term + "」的詞"]);
        }
        if (/^[@=]/.exec(term)) {
          return doLookup(term);
        }
        term = term.replace(/^→列出含有「/, '');
        term = term.replace(/」的詞$/, '');
        term = term.replace(/\*/g, '%');
        term = term.replace(/[-—]/g, '－');
        term = term.replace(/[,﹐]/g, '，');
        term = term.replace(/[;﹔]/g, '；');
        term = term.replace(/[﹒．]/g, '。');
        regex = term;
        if (/\s$/.exec(term) || /\^/.exec(term)) {
          regex = replace$.call(regex, /\^/g, '');
          regex = replace$.call(regex, /\s*$/g, '');
          regex = '"' + regex;
        } else {
          if (!/[?._%]/.test(term)) {
            regex = '[^"]*' + regex;
          }
        }
        if (/^\s/.exec(term) || /\$/.exec(term)) {
          regex = replace$.call(regex, /\$/g, '');
          regex = replace$.call(regex, /\s*/g, '');
          regex += '"';
        } else {
          if (!/[?._%]/.test(term)) {
            regex = regex + '[^"]*';
          }
        }
        if (/[%?._]/.exec(term)) {
          regex = regex.replace(/[?._]/g, '[^"]');
          regex = regex.replace(/%/g, '[^"]*');
          regex = "\"" + regex + "\"";
        }
        regex = regex.replace(/\(\)/g, '');
        try {
          results = INDEX[LANG].match(RegExp(regex.toLowerCase() + '', 'g'));
        } catch (e$) {}
        if (results !== null) {
          results = amisOrdering(results, term);
        }
        if (!(results != null && results.length)) {
          return cb(['舊版無資料，到新版查詢']);
        }
        if ((results != null) && (results.length === 1)) {
          doLookup(replace$.call(results[0], /"/g, ''));
        }
        MaxResults = widthIsXs() ? 400 : 1024;
        if (results.length > MaxResults) {
          more = "(僅顯示前 " + MaxResults + " 筆)";
          results = results.slice(0, MaxResults);
          results.push(more);
        }
        return cb(map((function(it){
          return replace$.call(it, /"/g, '');
        }), results));
      }
    });
  }

  han_amis_lookup = function(query, cb){
    GET(LANG + '/revdict-amis-def.txt', function(cmn_amis_def){
      if (cmn_amis_def.status === GET_FAILURE) return;
      cmn_amis_def = cmn_amis_def.value;
      return GET(LANG + '/revdict-amis-ex.txt', function(cmn_amis_ex){
        if (cmn_amis_ex.status === GET_FAILURE) return;
        cmn_amis_ex = cmn_amis_ex.value;
        var x, terms, stems, lookup_in, this$ = this;
        x = [];
        terms = query.replace(/^\s+/, "").replace(/\s+$/, "");
        if (in$(terms, Object.keys(CH_STEM_MAPPING[LANG]))) {
          stems = CH_STEM_MAPPING[LANG][terms].split(',').map(function(stem){
            return [stem].concat(STEM[LANG][stem]);
          });
          x = [].concat.apply([], stems);
          x = x.filter(function(item, pos){
            return x.indexOf(item) === pos;
          });
        }

        lookup_in = function(cmn){
          var p, ae, ab, title, results$ = [];
          p = 0;
          for (;;) {
            p = cmn.indexOf(terms, p + 1);
            if (p === -1 || x.length > 20) {
              break;
            }
            ae = cmn.lastIndexOf('\uFFFB', p);
            ab = cmn.lastIndexOf('\uFFFA', ae);
            title = cmn.slice(ab + 1, ae);
            if (!in$(title, x)) {
              results$.push(x.push(title));
            }
          }
          return results$;
        };

        lookup_in(cmn_amis_def);
        lookup_in(cmn_amis_ex);
        x = x.filter(function(ele) { return (ele !== '') });
        x = x.filter(function(ele) { return (ele.indexOf('\ufffa') != -1) });

        if (LANG === 's') {
          x = x.map(function(ele) {
            if (/\ufffa/.test(ele)) return ele;

            var e, r, regex;
            e = ele.split("\ufffa")[0];
            e = e.replace("^", "\\^");
            regex = `"${e}\ufffa.*"`;
            r = INDEX[LANG].match(RegExp(regex.toLowerCase() + '', 'g'));
            if (r !== undefined) return r[0].replace(/"/g, '');
          });
        }

        if (x.length === 0) {
          return cb(["舊版無資料，到新版查詢"]);
        } else {
          return cb(x);
        }
      });
    });
  };

  function canPlayMp3(){
    var a;
    if (CACHED.canPlayMp3 != null) {
      return CACHED.canPlayMp3;
    }
    a = document.createElement('audio');
    return CACHED.canPlayMp3 = !!(replace$.call(typeof a.canPlayType == 'function' ? a.canPlayType('audio/mpeg;') : void 8, /^no$/, ''));
  }

  window.canPlayOgg = (function(){
    function canPlayOgg(){
      var a;
      if (CACHED.canPlayOgg != null) {
        return CACHED.canPlayOgg;
      }
      a = document.createElement('audio');
      return CACHED.canPlayOgg = !!(replace$.call(typeof a.canPlayType == 'function' ? a.canPlayType('audio/ogg; codecs="vorbis"') : void 8, /^no$/, ''));
    }
    return canPlayOgg;
  }());

  function canPlayOpus(){
    var a;
    if (CACHED.canPlayOpus != null) {
      return CACHED.canPlayOpus;
    }
    a = document.createElement('audio');
    return CACHED.canPlayOpus = !!(replace$.call(typeof a.canPlayType == 'function' ? a.canPlayType('audio/ogg; codecs="opus"') : void 8, /^no$/, ''));
  }

  LoadedScripts = {};
  function getScript(src, cb){
    if (LoadedScripts[src]) {
      return cb();
    }
    LoadedScripts[src] = true;
    return $.ajax({
      type: 'GET',
      url: src,
      dataType: 'script',
      cache: true,
      crossDomain: true,
      complete: cb
    });
  }

  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }

  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }

  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
