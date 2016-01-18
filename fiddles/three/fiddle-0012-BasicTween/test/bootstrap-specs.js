

var House = House || {};


//<editor-fold desc="Boot">
/*
 * @class House.Boot
 * @singleton
 */
House.Boot = House.Boot || (function (emptyFn) {

    var doc = document,
        _emptyArray = [],
        _config = {
            disableCaching: true,
            disableCachingParam: '_dc',
            loadDelay: false,
            preserveScripts: true,
            charset: undefined
        },

        cssRe = /\.css(?:\?|$)/i,
        resolverEl = doc.createElement('a'),
        isBrowser = typeof window !== 'undefined',
        _environment = {
            browser: isBrowser,
            node: !isBrowser && (typeof require === 'function'),
            phantom: (window && (window._phantom || window.callPhantom)) || /PhantomJS/.test(window.navigator.userAgent)
        },
        _tags = (House.platformTags = {}),

        _debug = function (message) {
            console.log(message);
        },
        _apply = function (object, config, defaults) {
            if (defaults) {
                _apply(object, defaults);
            }
            if (object && config && typeof config === 'object') {
                for (var i in config) {
                    object[i] = config[i];
                }
            }
            return object;
        },
        Boot = {
            loading: 0,
            loaded: 0,
            apply: _apply,
            env: _environment,
            config: _config,

            scripts: {
            },

            currentFile: null,
            suspendedQueue: [],
            currentRequest: null,
            syncMode: false,
            debug: _debug,
            useElements: true,
            listeners: [],
            Request: Request,
            Entry: Entry,
            detectPlatformTags: function () {
                var ua = navigator.userAgent,
                    isMobile = _tags.isMobile = /Mobile(\/|\s)/.test(ua),
                    isPhone, isDesktop, isTablet, touchSupported, isIE10, isBlackberry,
                    element = document.createElement('div'),
                    uaTagChecks = [
                        'iPhone',
                        'iPod',
                        'Android',
                        'Silk',
                        'Android 2',
                        'BlackBerry',
                        'BB',
                        'iPad',
                        'RIM Tablet OS',
                        'MSIE 10',
                        'Trident',
                        'Chrome',
                        'Tizen',
                        'Firefox',
                        'Safari',
                        'Windows Phone'
                    ],
                    isEventSupported = function(name, tag) {
                        if (tag === undefined) {
                            tag = window;
                        }

                        var eventName = 'on' + name.toLowerCase(),
                            isSupported = (eventName in element);

                        if (!isSupported) {
                            if (element.setAttribute && element.removeAttribute) {
                                element.setAttribute(eventName, '');
                                isSupported = typeof element[eventName] === 'function';

                                if (typeof element[eventName] !== 'undefined') {
                                    element[eventName] = undefined;
                                }

                                element.removeAttribute(eventName);
                            }
                        }

                        return isSupported;
                    },
                    uaTags = {},
                    len = uaTagChecks.length, check, c;

                for (c = 0; c < len; c++) {
                    check = uaTagChecks[c];
                    uaTags[check] = new RegExp(check).test(ua);
                }

                isPhone =
                    (uaTags.iPhone || uaTags.iPod) ||
                    (!uaTags.Silk && (uaTags.Android && (uaTags['Android 2'] || isMobile))) ||
                    ((uaTags.BlackBerry || uaTags.BB) && uaTags.isMobile) ||
                    (uaTags['Windows Phone']);

                isTablet =
                    (!_tags.isPhone) && (
                    uaTags.iPad ||
                    uaTags.Android ||
                    uaTags.Silk ||
                    uaTags['RIM Tablet OS'] ||
                    (uaTags['MSIE 10'] && /; Touch/.test(ua))
                    );

                touchSupported =
                    // if the browser has touch events we can be reasonably sure the device has
                    // a touch screen
                    isEventSupported('touchend') ||
                        // browsers that use pointer event have maxTouchPoints > 0 if the
                        // device supports touch input
                        // http://www.w3.org/TR/pointerevents/#widl-Navigator-maxTouchPoints
                    navigator.maxTouchPoints ||
                        // IE10 uses a vendor-prefixed maxTouchPoints property
                    navigator.msMaxTouchPoints;

                isDesktop = !isPhone && !isTablet;
                isIE10 = uaTags['MSIE 10'];
                isBlackberry = uaTags.Blackberry || uaTags.BB;

                _apply(_tags, Boot.loadPlatformsParam(), {
                    phone: isPhone,
                    tablet: isTablet,
                    desktop: isDesktop,
                    touch: touchSupported,
                    ios: (uaTags.iPad || uaTags.iPhone || uaTags.iPod),
                    android: uaTags.Android || uaTags.Silk,
                    blackberry: isBlackberry,
                    safari: uaTags.Safari && !isBlackberry,
                    chrome: uaTags.Chrome,
                    ie10: isIE10,
                    windows: isIE10 || uaTags.Trident,
                    tizen: uaTags.Tizen,
                    firefox: uaTags.Firefox
                });
            },
            loadPlatformsParam: function () {
                var paramsString = window.location.search.substr(1),
                    paramsArray = paramsString.split("&"),
                    params = {}, i,
                    platforms = {},
                    tmpArray, tmplen, platform, name, enabled;

                for (i = 0; i < paramsArray.length; i++) {
                    tmpArray = paramsArray[i].split("=");
                    params[tmpArray[0]] = tmpArray[1];
                }

                if (params.platformTags) {
                    tmpArray = params.platformTags.split(",");
                    for (tmplen = tmpArray.length, i = 0; i < tmplen; i++) {
                        platform = tmpArray[i].split(":");
                        name = platform[0];
                        enabled=true;
                        if (platform.length > 1) {
                            enabled = platform[1];
                            if (enabled === 'false' || enabled === '0') {
                                enabled = false;
                            }
                        }
                        platforms[name] = enabled;
                    }
                }
                return platforms;
            },
            filterPlatform: function (platform, excludes) {
                platform = _emptyArray.concat(platform || _emptyArray);
                excludes = _emptyArray.concat(excludes || _emptyArray);

                var plen = platform.length,
                    elen = excludes.length,
                    include = (!plen && elen),
                    i, tag;

                for (i = 0; i < plen && !include; i++) {
                    tag = platform[i];
                    include = !!_tags[tag];
                }

                for (i = 0; i < elen && include; i++) {
                    tag = excludes[i];
                    include = !_tags[tag];
                }

                return include;
            },
            init: function () {
                var scriptEls = doc.getElementsByTagName('script'),
                    len = scriptEls.length,
                    re = /\/ext(\-[a-z\-]+)?\.js$/,
                    entry, script, src, state, baseUrl, key, n, origin;
                for (n = 0; n < len; n++) {
                    src = (script = scriptEls[n]).src;
                    if (!src) {
                        continue;
                    }
                    state = script.readyState || null;
                    if (!baseUrl) {
                        if (re.test(src)) {
                            Boot.hasReadyState = ("readyState" in script);
                            Boot.hasAsync = ("async" in script) || !Boot.hasReadyState;
                            baseUrl = src;
                        }
                    }

                    if (!Boot.scripts[key = Boot.canonicalUrl(src)]) {
                        //<debug>
                        _debug("creating entry " + key + " in Boot.init");
                        //</debug>
                        entry = new Entry({
                            key: key,
                            url: src,
                            done: state === null ||  // non-IE
                            state === 'loaded' || state === 'complete', // IE only
                            el: script,
                            prop: 'src'
                        });
                    }
                }

                if (!baseUrl) {
                    script = scriptEls[scriptEls.length - 1];
                    baseUrl = script.src;
                    Boot.hasReadyState = ('readyState' in script);
                    Boot.hasAsync = ("async" in script) || !Boot.hasReadyState;
                }

                Boot.baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
                origin = window.location.origin ||
                window.location.protocol +
                "//" +
                window.location.hostname +
                (window.location.port ? ':' + window.location.port: '');
                Boot.origin = origin;

                Boot.detectPlatformTags();
                House.filterPlatform = Boot.filterPlatform;
            },
            canonicalUrl: function (url) {
                resolverEl.href = url;

                var ret = resolverEl.href,
                    dc = _config.disableCachingParam,
                    pos = dc ? ret.indexOf(dc + '=') : -1,
                    c, end;

                if (pos > 0 && ((c = ret.charAt(pos - 1)) === '?' || c === '&')) {
                    end = ret.indexOf('&', pos);
                    end = (end < 0) ? '' : ret.substring(end);
                    if (end && c === '?') {
                        ++pos; // keep the '?'
                        end = end.substring(1); // remove the '&'
                    }
                    ret = ret.substring(0, pos - 1) + end;
                }

                return ret;
            },
            getConfig: function (name) {
                return name ? Boot.config[name] : Boot.config;
            },
            setConfig: function (name, value) {
                if (typeof name === 'string') {
                    Boot.config[name] = value;
                } else {
                    for (var s in name) {
                        Boot.setConfig(s, name[s]);
                    }
                }
                return Boot;
            },
            getHead: function () {
                return Boot.docHead ||
                    (Boot.docHead = doc.head ||
                    doc.getElementsByTagName('head')[0]);
            },
            create: function (url, key, cfg) {
                var config = cfg || {};
                config.url = url;
                config.key = key;
                return Boot.scripts[key] = new Entry(config);
            },
            getEntry: function (url, cfg) {
                var key = Boot.canonicalUrl(url),
                    entry = Boot.scripts[key];
                if (!entry) {
                    entry = Boot.create(url, key, cfg);
                }
                return entry;
            },
            registerContent: function (url, type, content) {
                var cfg = {
                    content: content,
                    loaded: true,
                    css: type === 'css'
                };

                return Boot.getEntry(url, cfg);
            },
            processRequest: function(request, sync) {
                request.loadEntries(sync);
            },
            load: function (request) {
                _debug("Boot.load called");
                var request = new Request(request);

                if (request.sync || Boot.syncMode) {
                    return Boot.loadSync(request);
                }

                if (Boot.currentRequest) {
                    _debug("current active request, suspending this request");
                    request.getEntries();
                    Boot.suspendedQueue.push(request);
                } else {
                    Boot.currentRequest = request;
                    Boot.processRequest(request, false);
                }
                return Boot;
            },
            loadSync: function (request) {
                _debug("Boot.loadSync called");
                var request = new Request(request);
                Boot.syncMode++;
                Boot.processRequest(request, true);
                Boot.syncMode--;
                return Boot;
            },
            loadBasePrefix: function(request) {
                request = new Request(request);
                request.prependBaseUrl = true;
                return Boot.load(request);
            },
            loadSyncBasePrefix: function(request) {
                request = new Request(request);
                request.prependBaseUrl = true;
                return Boot.loadSync(request);
            },
            requestComplete: function(request) {
                var next;

                if (Boot.currentRequest === request) {
                    Boot.currentRequest = null;
                    while(Boot.suspendedQueue.length > 0) {
                        next = Boot.suspendedQueue.shift();
                        if(!next.done) {
                            //<debug>
                            _debug("resuming suspended request");
                            //</debug>
                            Boot.load(next);
                            break;
                        }
                    }
                }
                if (!Boot.currentRequest && Boot.suspendedQueue.length == 0) {
                    Boot.fireListeners();
                }
            },
            isLoading: function () {
                return !Boot.currentRequest && Boot.suspendedQueue.length == 0;
            },
            fireListeners: function () {
                var listener;
                while (Boot.isLoading() && (listener = Boot.listeners.shift())) {
                    listener();
                }
            },
            onBootReady: function (listener) {
                if (!Boot.isLoading()) {
                    listener();
                } else {
                    Boot.listeners.push(listener);
                }
            },
            getPathsFromIndexes: function (indexMap, loadOrder) {
                return Request.prototype.getPathsFromIndexes(indexMap, loadOrder);
            },
            createLoadOrderMap: function(loadOrder) {
                return Request.prototype.createLoadOrderMap(loadOrder);
            },
            fetch: function(url, complete, scope, async) {
                async = (async === undefined) ? !!complete : async;

                var xhr = new XMLHttpRequest(),
                    result, status, content, exception = false,
                    readyStateChange = function () {
                        if (xhr && xhr.readyState == 4) {
                            status = (xhr.status === 1223) ? 204 :
                                (xhr.status === 0 && ((self.location || {}).protocol === 'file:' ||
                                (self.location || {}).protocol === 'ionp:')) ? 200 : xhr.status;
                            content = xhr.responseText;
                            result = {
                                content: content,
                                status: status,
                                exception: exception
                            };
                            if (complete) {
                                complete.call(scope, result);
                            }
                            xhr = null;
                        }
                    };

                if (async) {
                    xhr.onreadystatechange = readyStateChange;
                }

                try {
                    //<debug>
                    _debug("fetching " + url + " " + (async ? "async" : "sync"));
                    //</debug>
                    xhr.open('GET', url, async);
                    xhr.send(null);
                } catch (err) {
                    exception = err;
                    readyStateChange();
                    return result;
                }

                if (!async) {
                    readyStateChange();
                }

                return result;
            },
            notifyAll: function(entry) {
                entry.notifyRequests();
            }
        };
    function Request(cfg) {
        if(cfg.$isRequest) {
            return cfg;
        }

        var cfg = cfg.url ? cfg : {url: cfg},
            url = cfg.url,
            urls = url.charAt ? [ url ] : url,
            charset = cfg.charset || Boot.config.charset;

        _apply(cfg, {
            urls: urls,
            charset: charset
        });
        _apply(this, cfg);
    };
    Request.prototype = {
        $isRequest: true,
        createLoadOrderMap: function (loadOrder) {
            var len = loadOrder.length,
                loadOrderMap = {},
                i, element;

            for (i = 0; i < len; i++) {
                element = loadOrder[i];
                loadOrderMap[element.path] = element;
            }

            return loadOrderMap;
        },
        getLoadIndexes: function (index, indexMap, loadOrder, includeUses, skipLoaded) {
            var item = loadOrder[index],
                len, i, reqs, entry, stop, added, idx, ridx, url;

            if (indexMap[index]) {
                // prevent cycles
                return indexMap;
            }

            indexMap[index] = true;

            stop = false;
            while (!stop) {
                added = false;
                for (idx in indexMap) {
                    if (indexMap.hasOwnProperty(idx)) {
                        item = loadOrder[idx];
                        if (!item) {
                            continue;
                        }
                        url = this.prepareUrl(item.path);
                        entry = Boot.getEntry(url);
                        if (!skipLoaded || !entry || !entry.done) {
                            reqs = item.requires;
                            if (includeUses && item.uses) {
                                reqs = reqs.concat(item.uses);
                            }
                            for (len = reqs.length, i = 0; i < len; i++) {
                                ridx = reqs[i];
                                if (!indexMap[ridx]) {
                                    indexMap[ridx] = true;
                                    added = true;
                                }
                            }
                        }
                    }
                }
                if (!added) {
                    stop = true;
                }
            }
            return indexMap;
        },
        getPathsFromIndexes: function (indexMap, loadOrder) {
            var indexes = [],
                paths = [],
                index, len, i;

            for (index in indexMap) {
                if (indexMap.hasOwnProperty(index) && indexMap[index]) {
                    indexes.push(index);
                }
            }

            indexes.sort(function (a, b) {
                return a - b;
            });

            // convert indexes back into load paths
            for (len = indexes.length, i = 0; i < len; i++) {
                paths.push(loadOrder[indexes[i]].path);
            }

            return paths;
        },

        expandUrl: function (url, indexMap, includeUses, skipLoaded) {
            if (typeof url == 'string') {
                url = [url];
            }

            var me = this,
                loadOrder = me.loadOrder,
                loadOrderMap = me.loadOrderMap;

            if (loadOrder) {
                loadOrderMap = loadOrderMap || me.createLoadOrderMap(loadOrder);
                me.loadOrderMap = loadOrderMap;
                indexMap = indexMap || {};
                var len = url.length,
                    unmapped = [],
                    i, item;

                for (i = 0; i < len; i++) {
                    item = loadOrderMap[url[i]];
                    if (item) {
                        me.getLoadIndexes(item.idx, indexMap, loadOrder, includeUses, skipLoaded);
                    } else {
                        unmapped.push(url[i]);
                    }
                }


                return me.getPathsFromIndexes(indexMap, loadOrder).concat(unmapped);
            }
            return url;
        },

        expandUrls: function (urls, includeUses) {
            if (typeof urls == "string") {
                urls = [urls];
            }

            var expanded = [],
                expandMap = {},
                tmpExpanded,
                len = urls.length,
                i, t, tlen, tUrl;

            for (i = 0; i < len; i++) {
                tmpExpanded = this.expandUrl(urls[i], {}, includeUses, true);
                for (t = 0, tlen = tmpExpanded.length; t < tlen; t++) {
                    tUrl = tmpExpanded[t];
                    if (!expandMap[tUrl]) {
                        expandMap[tUrl] = true;
                        expanded.push(tUrl);
                    }
                }
            }

            if (expanded.length == 0) {
                expanded = urls;
            }

            return expanded;
        },
        expandLoadOrder: function () {
            var me = this,
                urls = me.urls,
                expanded;

            if (!me.expanded) {
                expanded = this.expandUrls(urls, true);
                me.expanded = true;
            } else {
                expanded = urls;
            }

            me.urls = expanded;

            if (urls.length != expanded.length) {
                me.sequential = true;
            }

            return me;
        },
        getUrls: function () {
            this.expandLoadOrder();
            return this.urls;
        },
        prepareUrl: function(url) {
            if(this.prependBaseUrl) {
                return Boot.baseUrl + url;
            }
            return url;
        },
        getEntries: function () {
            var me = this,
                entries = me.entries,
                i, entry, urls, url;
            if (!entries) {
                entries = [];
                urls = me.getUrls();
                for (i = 0; i < urls.length; i++) {
                    url = me.prepareUrl(urls[i]);
                    entry = Boot.getEntry(url, {
                        buster: me.buster,
                        charset: me.charset
                    });
                    entry.requests.push(me);
                    entries.push(entry);
                }
                me.entries = entries;
            }
            return entries;
        },
        loadEntries: function(sync) {
            var me = this,
                entries = me.getEntries(),
                len = entries.length,
                start = me.loadStart || 0,
                continueLoad, entry, i;

            if(sync !== undefined) {
                me.sync = sync;
            }

            me.loaded = me.loaded || 0;
            me.loading = me.loading || len;

            for(i = start; i < len; i++) {
                entry = entries[i];
                if(!entry.loaded) {
                    continueLoad = entries[i].load(me.sync);
                } else {
                    continueLoad = true;
                }
                if(!continueLoad) {
                    me.loadStart = i;
                    entry.onDone(function(){
                        me.loadEntries(sync);
                    });
                    break;
                }
            }
            me.processLoadedEntries();
        },
        processLoadedEntries: function () {
            var me = this,
                entries = me.getEntries(),
                len = entries.length,
                start = me.startIndex || 0,
                i, entry;

            if (!me.done) {
                for (i = start; i < len; i++) {
                    entry = entries[i];

                    if (!entry.loaded) {
                        me.startIndex = i;
                        return;
                    }

                    if (!entry.evaluated) {
                        entry.evaluate();
                    }

                    if (entry.error) {
                        me.error = true;
                    }
                }
                me.notify();
            }
        },
        notify: function () {
            var me = this;
            if (!me.done) {
                var error = me.error,
                    fn = me[error ? 'failure' : 'success'],
                    delay = ('delay' in me)
                        ? me.delay
                        : (error ? 1 : Boot.config.chainDelay),
                    scope = me.scope || me;
                me.done = true;
                if (fn) {
                    if (delay === 0 || delay > 0) {
                        setTimeout(function () {
                            fn.call(scope, me);
                        }, delay);
                    } else {
                        fn.call(scope, me);
                    }
                }
                me.fireListeners();
                Boot.requestComplete(me);
            }
        },
        onDone: function(listener) {
            var me = this,
                listeners = me.listeners || (me.listeners = []);
            if(me.done) {
                listener(me);
            } else {
                listeners.push(listener);
            }
        },
        fireListeners: function() {
            var listeners = this.listeners,
                listener;
            if(listeners) {
                _debug("firing request listeners");
                while((listener = listeners.shift())) {
                    listener(this);
                }
            }
        }
    };
   function Entry(cfg) {
        if(cfg.$isEntry) {
            return cfg;
        }

        _debug("creating entry for " + cfg.url);

        var charset = cfg.charset || Boot.config.charset,
            manifest = House.manifest,
            loader = manifest && manifest.loader,
            cache = (cfg.cache !== undefined) ? cfg.cache : (loader && loader.cache),
            buster, busterParam;

        if (Boot.config.disableCaching) {
            if (cache === undefined) {
                cache = !Boot.config.disableCaching;
            }

            if (cache === false) {
                buster = '';
            } else if (cache !== true) {
                buster = cache;
            }

            if (buster) {
                busterParam = (loader && loader.cacheParam) || Boot.config.disableCachingParam;
                buster = busterParam + "=" + buster;
            }
        }

        _apply(cfg, {
            charset: charset,
            buster: buster,
            requests: []
        });
        _apply(this, cfg);
    };
    Entry.prototype = {
        $isEntry: true,
        done: false,
        evaluated: false,
        loaded: false,

        isCrossDomain: function() {
            var me = this;
            if(me.crossDomain === undefined) {
                //<debug>
                _debug("checking " + me.getLoadUrl() + " for prefix " + Boot.origin);
                //</debug>
                me.crossDomain = (me.getLoadUrl().indexOf(Boot.origin) !== 0);
            }
            return me.crossDomain;
        },

        isCss: function () {
            var me = this;
            if (me.css === undefined) {
                me.css = me.url && cssRe.test(me.url);
            }
            return this.css;
        },

        getElement: function (tag) {
            var me = this,
                el = me.el;
            if (!el) {
                //<debug>
                _debug("creating element for " + me.url);
                //</debug>
                if (me.isCss()) {
                    tag = tag || "link";
                    el = doc.createElement(tag);
                    if(tag == "link") {
                        el.rel = 'stylesheet';
                        me.prop = 'href';
                    } else {
                        me.prop="textContent";
                    }
                    el.type = "text/css";
                } else {
                    tag = tag || "script";
                    el = doc.createElement(tag);
                    el.type = 'text/javascript';
                    me.prop = 'src';
                    if (Boot.hasAsync) {
                        el.async = false;
                    }
                }
                me.el = el;
            }
            return el;
        },

        getLoadUrl: function () {
            var me = this,
                url = Boot.canonicalUrl(me.url);
            if (!me.loadUrl) {
                me.loadUrl = !!me.buster
                    ? (url + (url.indexOf('?') === -1 ? '?' : '&') + me.buster)
                    : url;
            }
            return me.loadUrl;
        },

        fetch: function (req) {
            var url = this.getLoadUrl(),
                async = !!req.async,
                complete = req.complete;

            Boot.fetch(url, complete, this, async);
        },

        onContentLoaded: function (response) {
            var me = this,
                status = response.status,
                content = response.content,
                exception = response.exception,
                url = this.getLoadUrl();
            me.loaded = true;
            if ((exception || status === 0) && !_environment.phantom) {
                me.error =
                    //<debug>
                    ("Failed loading synchronously via XHR: '" + url +
                    "'. It's likely that the file is either being loaded from a " +
                    "different domain or from the local file system where cross " +
                    "origin requests are not allowed for security reasons. Try " +
                    "asynchronous loading instead.") ||
                        //</debug>
                    true;
                me.evaluated = true;
            }
            else if ((status >= 200 && status < 300) || status === 304
                || _environment.phantom
                || (status === 0 && content.length > 0)
            ) {
                me.content = content;
            }
            else {
                me.error =
                    //<debug>
                    ("Failed loading synchronously via XHR: '" + url +
                    "'. Please verify that the file exists. XHR status code: " +
                    status) ||
                        //</debug>
                    true;
                me.evaluated = true;
            }
        },

        createLoadElement: function(callback) {
            var me = this,
                el = me.getElement(),
                readyStateChange = function(){
                    if (this.readyState === 'loaded' || this.readyState === 'complete') {
                        if(callback) {
                            callback();
                        }
                    }
                },
                errorFn = function() {
                    me.error = true;
                    if(callback) {
                        callback();
                    }
                };
            me.preserve = true;
            el.onerror = errorFn;
            if(Boot.hasReadyState) {
                el.onreadystatechange = readyStateChange;
            } else {
                el.onload = callback;
            }
            // IE starts loading here
            el[me.prop] = me.getLoadUrl();
        },

        onLoadElementReady: function() {
            Boot.getHead().appendChild(this.getElement());
            this.evaluated = true;
        },

        inject: function (content, asset) {
            //<debug>
            _debug("injecting content for " + this.url);
            //</debug>
            var me = this,
                head = Boot.getHead(),
                url = me.url,
                key = me.key,
                base, el, ieMode, basePath;

            if (me.isCss()) {
                me.preserve = true;
                basePath = key.substring(0, key.lastIndexOf("/") + 1);
                base = doc.createElement('base');
                base.href = basePath;
                if(head.firstChild) {
                    head.insertBefore(base, head.firstChild);
                } else {
                    head.appendChild(base);
                }
                // reset the href attribute to cuase IE to pick up the change
                base.href = base.href;

                if (url) {
                    content += "\n/*# sourceURL=" + key + " */";
                }

                // create element after setting base
                el = me.getElement("style");

                ieMode = ('styleSheet' in el);

                head.appendChild(base);
                if(ieMode) {
                    head.appendChild(el);
                    el.styleSheet.cssText = content;
                } else {
                    el.textContent = content;
                    head.appendChild(el);
                }
                head.removeChild(base);

            } else {
                // Debugger friendly, file names are still shown even though they're
                // eval'ed code. Breakpoints work on both Firebug and Chrome's Web
                // Inspector.
                if (url) {
                    content += "\n//# sourceURL=" + key;
                }
                House.globalEval(content);
            }
            return me;
        },

        loadCrossDomain: function() {
            var me = this,
                complete = function(){
                    me.loaded = me.evaluated = me.done = true;
                    me.notifyRequests();
                };
            if(me.isCss()) {
                me.createLoadElement();
                me.evaluateLoadElement();
                complete();
            } else {
                me.createLoadElement(function(){
                    complete();
                });
                me.evaluateLoadElement();
                // at this point, we need sequential evaluation,
                // which means we can't advance the load until
                // this entry has fully completed
                return false;
            }
            return true;
        },

        loadElement: function() {
            var me = this,
                complete = function(){
                    me.loaded = me.evaluated = me.done = true;
                    me.notifyRequests();
                };
            if(me.isCss()) {
                return me.loadCrossDomain();
            } else {
                me.createLoadElement(function(){
                    complete();
                });
                me.evaluateLoadElement();
            }
            return true;
        },

        loadSync: function() {
            var me = this;
            me.fetch({
                async: false,
                complete: function (response) {
                    me.onContentLoaded(response);
                }
            });
            me.evaluate();
            me.notifyRequests();
        },

        load: function (sync) {
            var me = this;
            if (!me.loaded) {
                if(me.loading) {
                    // if we're calling back through load and we're loading but haven't
                    // yet loaded, then we should be in a sequential, cross domain
                    // load scenario which means we can't continue the load on the
                    // request until this entry has fully evaluated, which will mean
                    // loaded = evaluated = done = true in one step.  For css files, this
                    // will happen immediately upon <link> element creation / insertion,
                    // but <script> elements will set this upon load notification
                    return false;
                }
                me.loading = true;

                // for async modes, we have some options
                if (!sync) {
                    // if cross domain, just inject the script tag and let the onload
                    // events drive the progression
                    if(me.isCrossDomain()) {
                        return me.loadCrossDomain();
                    }
                    // for IE, use the readyStateChange allows us to load scripts in parallel
                    // but serialize the evaluation by appending the script node to the
                    // document
                    else if(!me.isCss() && Boot.hasReadyState) {
                        me.createLoadElement(function () {
                            me.loaded = true;
                            me.notifyRequests();
                        });
                    }

                    else if(Boot.useElements) {
                        return me.loadElement();
                    }
                    // for other browsers, just ajax the content down in parallel, and use
                    // globalEval to serialize evaluation
                    else {
                        me.fetch({
                            async: !sync,
                            complete: function (response) {
                                me.onContentLoaded(response);
                                me.notifyRequests();
                            }
                        });
                    }
                }

                // for sync mode in js, global eval FTW.  IE won't honor the comment
                // paths in the debugger, so eventually we need a sync mode for IE that
                // uses the readyStateChange mechanism
                else {
                    me.loadSync();
                }
            }
            // signal that the load process can continue
            return true;
        },

        evaluateContent: function () {
            this.inject(this.content);
            this.content = null;
        },

        evaluateLoadElement: function() {
            Boot.getHead().appendChild(this.getElement());
        },

        evaluate: function () {
            var me = this;
            if(!me.evaluated) {
                if(me.evaluating) {
                    return;
                }
                me.evaluating = true;
                if(me.content !== undefined) {
                    me.evaluateContent();
                } else if(!me.error) {
                    me.evaluateLoadElement();
                }
                me.evaluated = me.done = true;
                me.cleanup();
            }
        },

        /*
         * @private
         */
        cleanup: function () {
            var me = this,
                el = me.el,
                prop;

            if (!el) {
                return;
            }

            if (!me.preserve) {
                me.el = null;

                el.parentNode.removeChild(el); // Remove, since its useless now

                for (prop in el) {
                    try {
                        if (prop !== me.prop) {
                            // If we set the src property to null IE
                            // will try and request a script at './null'
                            el[prop] = null;
                        }
                        delete el[prop];      // and prepare for GC
                    } catch (cleanEx) {
                        //ignore
                    }
                }
            }

            // Setting to null can cause exceptions if IE ever needs to call these
            // again (like onreadystatechange). This emptyFn has nothing locked in
            // closure scope so it is about as safe as null for memory leaks.
            el.onload = el.onerror = el.onreadystatechange = emptyFn;
        },

        notifyRequests: function () {
            var requests = this.requests,
                len = requests.length,
                i, request;
            for (i = 0; i < len; i++) {
                request = requests[i];
                request.processLoadedEntries();
            }
            if(this.done) {
                this.fireListeners();
            }
        },

        onDone: function(listener) {
            var me = this,
                listeners = me.listeners || (me.listeners = []);
            if(me.done) {
                listener(me);
            } else {
                listeners.push(listener);
            }
        },

        fireListeners: function() {
            var listeners = this.listeners,
                listener;
            if(listeners && listeners.length > 0) {
                //<debug>
                _debug("firing event listeners for url " + this.url);
                //</debug>
                while((listener = listeners.shift())) {
                    listener(this);
                }
            }
        }
    };

    House.disableCacheBuster = function (disable, path) {
        var date = new Date();
        date.setTime(date.getTime() + (disable ? 10 * 365 : -1) * 24 * 60 * 60 * 1000);
        date = date.toGMTString();
        doc.cookie = 'ext-cache=1; expires=' + date + '; path=' + (path || '/');
    };
    if (_environment.node) {
        Boot.prototype.load = Boot.prototype.loadSync = function (request) {
            // @TODO
            require(filePath);
            onLoad.call(scope);
        };
        Boot.prototype.init = emptyFn;
    }

    Boot.init();
    return Boot;

}(function () {
}));//(eval("/*@cc_on!@*/!1"));

House.globalEval = House.globalEval || (this.execScript
    ? function (code) { execScript(code); }
    : function ($$code) { eval.call(window, $$code); });

if (!Function.prototype.bind) {
    (function () {
        var slice = Array.prototype.slice,
            bind = function (me) {
                var args = slice.call(arguments, 1),
                    method = this;

                if (args.length) {
                    return function () {
                        var t = arguments;
                        return method.apply(me, t.length ? args.concat(slice.call(t)) : args);
                    };
                }
                args = null;
                return function () {
                    return method.apply(me, arguments);
                };
            };
        Function.prototype.bind = bind;
    }());
}
House.Boot.load({
    charset: "UTF-8",
    url: [
        '../libs/Three.js',
        '../app.js',
        'jasmine.js',
        'json2.js',
        'spec/Template.js'
    ],
    success: function() {
        var env = jasmine.getEnv();

        if (!/local\-reporter=false/i.test(top.location.search)) {
            env.addReporter(parent.Test.SandBox.reporter);
        }

        if (/disableTryCatch=true/i.test(top.location.search)) {
            this.jasmine.CATCH_EXCEPTIONS = false;
        }

        console.log(env);

        if (window.Cmd) {
            console.log(window.Cmd);
            top.Cmd = Cmd;
            env.addReporter(new Cmd.jasmine.Reporter());
            Cmd.native.click(top.document.getElementById('collapseAll'));

            Cmd.native.switchTo({frame: 'sandbox'}, function() {
                env.execute();
            });
        } else {
            env.execute();
        }
    }
});



