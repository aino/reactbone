(function() {

/*

Polyfills

*/

// Add ajax transport method for cross domain requests when using IE 8 and 9
// http://stackoverflow.com/a/16857936
if('XDomainRequest' in window && window.XDomainRequest !== null) {
   $.ajaxTransport("+*", function( options, originalOptions, jqXHR ) {
       // verify if we need to do a cross domain request
       // if not return so we don't break same domain requests
       if (typeof options.crossDomain === 'undefined' || !options.crossDomain) {
           return;
       }

        var xdr;

        return {
            send: function( headers, completeCallback ) {
                // Use Microsoft XDR
                xdr = new XDomainRequest();
                xdr.open("get", options.url); // NOTE: make sure protocols are the same otherwise this will fail silently
                xdr.onload = function() {
                    if(this.contentType.match(/\/xml/)){
                        var dom = new ActiveXObject("Microsoft.XMLDOM");
                        dom.async = false;
                        dom.loadXML(this.responseText);
                        completeCallback(200, "success", [dom]);
                    } else {
                        completeCallback(200, "success", [this.responseText]);
                    }
                };

                xdr.onprogress = function() {};

                xdr.ontimeout = function(){
                    completeCallback(408, "error", ["The request timed out."]);
                };

                xdr.onerror = function(){
                    completeCallback(404, "error", ["The requested resource could not be found."]);
                };

                xdr.send();
            },
            abort: function() {
                if(xdr) xdr.abort();
            }
        };
    });
}

/*

Easing

*/

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});


/*

jQuery extends

*/

(function($) {

    // monkeys

    (function($each) {
        $.each = function() {
            if ( typeof arguments[0] == 'number' ) {
                arguments[0] = new Array(arguments[0])
            }
            return $each.apply($, arguments);
        }
    }($.each))

    var _getPath = function() {

            var src = $('script:last').attr('src');

            if(!src) {
                return '/';
            }

            var slices = src.split('/');
            if (slices.length == 1) {
                return '';
            }
            slices.pop();
            return slices.join('/') + '/';
        },
        _path = _getPath();

    // extra support

    var ua = navigator.userAgent.toLowerCase(),
        isWebkit = ua.indexOf( "applewebkit" ) > -1,
        platform = navigator.platform;

    $.extend($.support, {

        touch: !!('ontouchstart' in document),

        canvas: !!( 'getContext' in document.createElement('canvas') ),

        ie: (function() {
            var v = 3,
                div = document.createElement( 'div' ),
                all = div.getElementsByTagName( 'i' );
            do {
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
            } while ( all[0] );
            return v > 4 ? v : undefined;
        }()),

        iphone: isWebkit && /iPhone/.test( platform ),
        ipad:  isWebkit && /iPad/.test( platform ),
        ipod:  isWebkit && /iPod/.test( platform ),
        ios: isWebkit && /iPhone|iPad|iPod/.test( platform ),
        safari: !!(/safari/.test(ua) && !(/chrome/.test(ua))),
        chrome: /chrome/.test(ua),
        mac: platform.toUpperCase().indexOf('MAC')>=0,
        translate3d: (function() {

            var el = document.createElement('p'), 
                has3d,
                transforms = {
                    'webkitTransform':'-webkit-transform',
                    'OTransform':'-o-transform',
                    'msTransform':'-ms-transform',
                    'MozTransform':'-moz-transform',
                    'transform':'transform'
                };
        
            // Add it to the body to get the computed style.
            document.documentElement.insertBefore(el, null);
        
            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = "translate3d(1px,1px,1px)";
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }
        
            document.documentElement.removeChild(el);
        
            return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }())
    });

    // custom events

    $.extend( $.event.special, {
        inputchange : {
            setup: function() {
                var self = this, val;
                $.data(this, 'timer', window.setInterval(function() {
                    val = $( self ).val();
                    if ( $.data( self, 'cache').toLowerCase() != val.toLowerCase() && !($.support.ie && $(self).hasClass('placeholder')) ) {
                        $.data( self, 'cache', val );
                        $( self ).trigger( 'inputchange' );
                    }
                }, 20));
            },
            teardown: function() {
                window.clearInterval( $.data(this, 'timer') );
            },
            add: function() {
                $.data(this, 'cache', $(this).val());
            }
        },
        tap: {
            setup: function() {
                $(this).bind('touchstart.tap', $.event.special.tap.touchstart)
            },
            teardown: function() {
                $(this).unbind('touchstart.tab touchend.tap touchmove.tap');
            },
            touchstart: function(e) {

                var $elem = $(this)

                clearTimeout($elem.data('tap_time'))

                $elem.bind('touchmove.tap', function(e) {
                    $elem.unbind('touchend.tap')
                }).bind('touchend.tap', $.event.special.tap.touchend)
            },
            touchend: function(e) {

                var $elem = $(this)

                clearTimeout($elem.data('tap_time'))
                $elem.data('tap_time', setTimeout(function() {
                    $elem.trigger('tap')
                }, 501))
                $elem.unbind('touchmove.tap touchend.tap')
            }
        },
        dbltap: {
            setup: function() {
                $(this).bind('touchstart.dbltap', $.event.special.dbltap.touchstart);
            },
            teardown: function(namespaces) {
                $(this).unbind('touchstart.dbltap');
            },
            touchstart: function(e) {
                var $elem = $(this)
                $elem.bind('touchmove.dbltap', function(e) {
                    $elem.unbind('touchend.dbltap')
                }).bind('touchend.dbltap', $.event.special.dbltap.touchend)
            },
            touchend: function(e) {
                var $elem = $(this),
                    lastTouch = $elem.data('lastTouch') || 0,
                    now = +new Date();

                var delta = now - lastTouch;
                if(delta > 20 && delta < 500){
                    $elem.data('lastTouch', 0);
                    setTimeout(function() { clearTimeout($elem.data('tap_time')) },1)
                    $elem.trigger('dbltap');
                } else {
                    $elem.data('lastTouch', now);
                }
                $elem.unbind('touchmove.dbltap touchend.dbltap')
            }
        }
    });

    // create special shortcuts

    $.each( ['inputchange','tap','dbltap'], function(i, type) {
        $.fn[type] = function() {
            return $.fn.bind.apply( this, [type].concat( $.makeArray( arguments ) ) );
        };
    });

    // native fullscreen handler
    (function() {

        var fs = {
            support: (function() {
                var html = document.documentElement;
                return !!(html.requestFullscreen || html.mozRequestFullScreen || html.webkitRequestFullScreen);
            }()),

            isFullscreen: false,

            elem: null,

            enter: function(elem) {

                fs.elem = elem = elem || document.documentElement;
                if ( elem.requestFullscreen ) {
                    elem.requestFullscreen();
                }
                else if ( elem.mozRequestFullScreen ) {
                    elem.mozRequestFullScreen();
                }
                else if ( elem.webkitRequestFullScreen ) {
                    elem.webkitRequestFullScreen();
                }
            },

            exit: function(elem) {

                if ( document.exitFullscreen ) {
                    document.exitFullscreen();
                }
                else if ( document.mozCancelFullScreen ) {
                    document.mozCancelFullScreen();
                }
                else if ( document.webkitCancelFullScreen ) {
                    document.webkitCancelFullScreen();
                }
            },

            isFullscreen: function() {
                return !!(document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen)
            }
        }

        var isFullscreen = fs.isFullscreen()

        if ( fs.support ) {
            var handler = function() {
                if ( fs.isFullscreen() ) {
                    $(document).trigger('fsnativeenter')
                    isFullscreen = true
                } else {
                    $(document).trigger('fsnativeexit')
                    if ( fs.elem ) {
                        $(fs.elem).removeClass('fs')
                    }
                    isFullscreen = false
                }
            };
            document.addEventListener( 'fullscreenchange', handler, false );
            document.addEventListener( 'mozfullscreenchange', handler, false );
            document.addEventListener( 'webkitfullscreenchange', handler, false );
        }

        $.fn.fullscreen = function( inbrowser ) {
            return this.each(function() {
                var $elem = $(this).eq(0)
                if ( !isFullscreen ) {
                    $(document).trigger({
                        type:'fsenter',
                        target: this,
                        isnative: !!( fs.support && !inbrowser )
                    })
                } else {
                    $(document).trigger({
                        type:'fsexit',
                        target: this
                    })
                }
                isFullscreen = !isFullscreen
            })
        }

        $(document).bind('fsenter', function(e) {

            $(e.target).addClass('fs')

            if ( e.isnative ) {
                fs.enter(e.target)
            } else {
                $('html, body').addTempStyles({
                    margin:0,
                    padding:0,
                    overflow: 'hidden'
                })
                $(e.target).addTempStyles({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 999999
                })
                $.disableScroll()
            }
        });

        $(document).bind('fsexit', function(e) {

            $(e.target).removeClass('fs')

            if ( fs.support && fs.isFullscreen() ) {
                fs.exit()
            } else {
                $('html, body').add(e.target).removeTempStyles();
                $.enableScroll()
            }
        })

        if ( isFullscreen ) {
            $(document).trigger('fsenter')
        }

    }())

    $.extend($, {

        objLength: function(obj) {
            var i = 0;
            for( var j in obj) {
                obj.hasOwnProperty(j) && i++;
            }
            return i;
        },

        add: function() {
            var arr = Array.prototype.slice.call(arguments);
            return $.fn.add.apply( $(arr.shift()), arr);r
        },

        trimArray: function(arr) {
            return arr.map(function(a) {
                return $.trim(a);
            });
        },

        capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.substr(1);
        },

        cookie: function (key, value, options) {
            // key and at least value given, set cookie...
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                options = jQuery.extend({}, options);

                if (value === null || value === undefined) {
                    options.expires = -1;
                }

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }

                value = String(value);

                return (document.cookie = [
                    encodeURIComponent(key), '=',
                    options.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }

            // key and possibly options given, get cookie...
            options = value || {};
            var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
        },

        getScriptPath: _getPath,

        timestamp: function() {
            return new Date().getTime();
        },

        create: function( selector, type, content, handler ) {

            if( /^[a-z]{1}/i.test(selector) ) {
                type = selector;
                selector = null;
                content = type;
                handler = content;
            }

            var elem = $(document.createElement( type || 'div')),
                idreg = /^\#/, clreg = /^\./

            if ( typeof content == 'function' ) {
                handler = content;
                content = undefined;
            }

            if (selector) {
                if( idreg.test(selector) ) {
                    elem.attr('id', selector.replace(idreg,'') );
                } else if ( clreg.test(selector) ) {
                    elem.addClass(selector.replace(clreg, '') );
                }
            }
            if ( typeof handler == 'function' ) {
                elem.click( function(e) {
                    e.preventDefault();
                    handler.call( elem[0], e );
                });
            }
            if( typeof content == 'string' ) {
                elem.html( content );
            }
            if ( elem.is('a') ) {
                elem.attr('href', '#')
            }
            return elem;
        },

        winOpen: function(url, options) {

            var left = window.screenX || window.screenLeft || 0;
            var top  = window.screenY || window.screenTop || 0;

            options = $.extend({
                left: null,
                top: null,
                width: 800,
                height: 500,
                menubar: 'no',
                scrollbars: 'yes',
                status: 'no',
                location: 'no',
                resizable: 'yes',
                title: '_blank',
                onclose: function(){}
            }, options);

            options.left = Math.round( options.left === null ? left + $(window).width()/2 - options.width/2 : left + options.left );
            options.top  = Math.round( options.top === null ? top + $(window).height()/2 - options.height/2 : top + options.top );

            var opt = [];
            $.each(options, function(k,v) {
                if ( k != 'onclose' && k != 'title' ) {
                    opt.push(k+'='+v);
                }
            })
            var joined = opt.join(',');
            var win = window.open(url, options.title, joined);

            win.focus();
            setTimeout(function() {
                window.onfocus = function() {
                    options.onclose();
                    win.close();
                    window.onfocus = null;
                }
            },4);
        },

        isNumber: function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        },

        stripHtml: function(str) {
            return $('<div>').html(str).text()
        },

        confirm: function(msg, ok, cancel) {
            var conf = window.confirm(msg);
            if ( conf && typeof ok == 'function' ) {
                ok();
            }
            if ( !conf && typeof cancel == 'function' ) {
                cancel();
            }
            return conf;
        },

        input: function(msg, ok, cancel) {
            var title = window.prompt(msg);
            if(title && typeof ok == 'function') {
                ok(title);
            } else if( typeof cancel == 'function' ) {
                cancel();
            }
        },

        preloadImages: function(images, callback, progress, error) {
            var loaded = 0,
                len = images.length;
            if (!len) {
                callback();
            }
            $.each(images, function(i,src) {
                var img = $(new Image);
                img.data('index', i);
                img.load(function(e) {
                    loaded++;
                    if ( typeof progress == 'function' ) {
                        progress(loaded,len);
                    }
                    if (loaded == len && typeof callback == 'function') {
                        callback.call(window);
                    }
                }).error(function() {
                    $(this).trigger('load')
                    $.isFunction(error) && error.call(this, $(this).data('index'));
                }).attr('src',src);
            });
        },

        breakpoints: function(breakpoints, handler) {
            var a = $(window).data('breakpoints') || []
            Array.prototype.push.apply( a, breakpoints || [] );
            $(window).data('breakpoints', a);
            if ( $.isFunction(handler) ) {
                $(window).on('breakpoint', handler);
            }
        },

        animateValue: (function() {
            var queue = {}
            var running = false
            var requestFrame = (function(){
              var r = 'RequestAnimationFrame'
              return window.requestAnimationFrame || 
                     window['webkit'+r] || 
                     window['moz'+r] || 
                     window['o'+r] || 
                     window['ms'+r] || 
                     function( callback ) {
                       window.setTimeout(callback, 1000 / 60)
                     }
            }())
            return function(options) {

                options = $.extend({
                    from: 0,
                    to: 0,
                    threshold: 1,
                    easing: function(x,t,b,c,d) {
                        return -c * ((t=t/d-1)*t*t*t - 1) + b // easeOutQuart
                    },
                    step: function(){},
                    complete: function(){},
                    duration: 400
                }, options)

                var animation = {
                    value: options.from,
                    start: +new Date(),
                    loop: function() {
                        var self = this,
                            distance = options.to - this.value;

                        if ( !this.hasOwnProperty('distance') ) {
                            this.distance = distance
                        }

                        if ( Math.abs( distance ) <= options.threshold ) {
                            return this.stop( true )
                        }

                        this.value = options.easing(null, +new Date() - this.start, options.from, this.distance, options.duration)
                        this.factor = (this.value-options.from)/this.distance;

                        options.step.call(this, this.value, this.factor)
                        if ( !this.canceled ) {
                            requestFrame( function() {
                                animation.loop.call(self)
                            });
                        }
                        return this
                    },
                    canceled: false,
                    stop: function( finish ) {
                        this.canceled = true
                        if ( finish ) {
                            animation.value = options.to
                            options.step.call(this, options.to, 1)
                        }
                        options.complete.call(animation)
                    }
                }
                
                return animation.loop()
            }
        }()),

        loadCSS: function(url) {

            var $link = $('<link>', {
                rel: 'stylesheet',
                href: url
            });

            $(function() {
                $('head').append($link);
            })

        },
        insertStyleTag : function( styles ) {

            var style = document.createElement( 'style' );

            $('head').append( style );

            if ( style.styleSheet ) { // IE
                style.styleSheet.cssText = styles;
            } else {
                var cssText = document.createTextNode( styles );
                style.appendChild( cssText );
            }
        },

        compareArray: function( o, t ) {
            var i = t.length;
            if ( o.length !== i ) {
                return false;
            }
            while(i--) {
                if ( o[i] !== t[i] ) {
                    return false;
                }
            }
            return true;
        },

        bez: function(coOrdArray) {
            var encodedFuncName = "bez_" + jQuery.makeArray(arguments).join("_").replace(/\./g, "p");
            if (typeof jQuery.easing[encodedFuncName] !== "function") {
                var polyBez = function(p1, p2) {
                    var A = [null, null], B = [null, null], C = [null, null],
                        bezCoOrd = function(t, ax) {
                            C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                            return t * (C[ax] + t * (B[ax] + t * A[ax]));
                        },
                        xDeriv = function(t) {
                            return C[0] + t * (2 * B[0] + 3 * A[0] * t);
                        },
                        xForT = function(t) {
                            var x = t, i = 0, z;
                            while (++i < 14) {
                                z = bezCoOrd(x, 0) - t;
                                if (Math.abs(z) < 1e-3) break;
                                x -= z / xDeriv(x);
                            }
                            return x;
                        };
                        return function(t) {
                            return bezCoOrd(xForT(t), 1);
                        }
                };
                jQuery.easing[encodedFuncName] = function(x, t, b, c, d) {
                    return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t/d) + b;
                }
            }
            return encodedFuncName;
        },

        loadScript: function(url, ready) {
            var done = false,
                script = $('<scr'+'ipt>').attr({
                    src: url,
                    async: true
                }).get(0);

            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function() {
               if ( !done && (!this.readyState ||
                   this.readyState === 'loaded' || this.readyState === 'complete') ) {

                   done = true;

                   // Handle memory leak in IE
                   script.onload = script.onreadystatechange = null;

                   if (typeof ready === 'function') {
                       ready.call( this, script );
                   }
               }
            };
            $(function() {
                document.getElementsByTagName('head')[0].appendChild(script);
            });
        },

        createLinks: function(txt, blank) {
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            var target = blank ? ' target="_blank"' :'';
            return txt.replace(exp, '<a href="$1"'+target+'>$1</a>');
        },
        
        slugify: function (s, invalid) {
          s = s.toString()
          invalid = invalid || []
          s = s.toLowerCase();
          // remove accents, swap ñ for n, etc
          var from = "àáäâåèéëêìíïîòóöôùúüûñç·/_,:; ".split(''),
              to   = "aaaaaeeeeiiiioooouuuunc-------".split('')
          for (var i=0, l=from.length ; i<l ; i++) {
            s = s.replace(new RegExp(from[i], 'g'), to[i]);
          }
          s = s.replace(/[^a-z0-9\-]/g, '') // remove invalid chars
               .replace(/-+/g, '-') // collapse dashes
               .replace(/^-|-$/g, '') // trim
          var counter = 1,
              slug = s
          for (var j=0; j < invalid.length; j++) {
            if ( s == invalid[j] ) {
              s = slug + '-' + counter++
              j = 0 // now we need to recheck all
            }
          }
          return s;
        }

    });
    
    // breakpoints
    (function() {
        var $win = $(window), 
            width, 
            br = $win.width(), 
            arr, 
            saved,
            evs;
        var rz = function() {
            arr = $win.data('breakpoints');
            if ( !arr || !arr.length ) {
                return rz;
            }
            width = $win.width()
            $.each(arr, function(i, val) {
                evs = null;
                if(width <= val && br >= val && saved != 'i'+val) {
                    br = val;
                    saved = 'i'+br;
                    evs = [br, 'in']
                }else if ( width >= val && br <= val && saved != 'o'+val) {
                    br = val;
                    saved = 'o'+br
                    evs = [br, 'out']
                }
                evs && $win.trigger('breakpoint', {value: val, breakpoint: evs[0], direction: evs[1]})
            })
        }
        $win.bind('resize orientationchange', rz);

    }());


    (function() {

        var onscroll = function(e) {
            e.preventDefault();
        };

        var onkey = function(e) {
            if ( e.which == (38||40) ) {
                e.preventDefault()
            }
        };

        $.disableScroll = function() {
            $(window).bind('scroll mousewheel', onscroll)
            $(document).keydown(onkey);
        }

        $.enableScroll = function() {
            $(window).unbind('scroll mousewheel', onscroll)
            $(document).unbind('keydown', onkey)
        }
    }())

    // fn(a, b) => fn({a:b})
    var parseArgs = function() {
        var obj;
        if ( typeof arguments[0] == 'string' && typeof arguments[1] == 'string') {
            obj = {};
            obj[arguments[0]] = arguments[1];
        } else if ( $.isPlainObject(arguments[0]) ) {
            obj = $.extend({}, arguments[0]);
        }
        return obj;
    };

    $.extend( $.fn, {

        selectContents: function() {
            return this.each(function() {
                var doc = document,
                    text = this;
                if (doc.body.createTextRange) { // ms
                    var range = doc.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                } else if (window.getSelection) { // moz, opera, webkit
                    var selection = window.getSelection();            
                    var range = doc.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            })
        },

        // line-break titles in responsive
        breakTitle: function(point) {
            return this.each(function() {
                if ( $(this).data('broken') ) {
                    return;
                }
                $(this).data('broken', true)
                $(this).contents().each(function() {
                    if(this.nodeType == 3) {
                        var words = this.nodeValue.split(' ');
                        words = words.map(function(word, j) {
                            if ( word.length > point ) {
                                var i = Math.ceil(word.length/point),
                                    node = ''
                                for(var j=0; j<i; j++) {
                                    node += word.substr((j*point), point)
                                    if ( j < i-1 ) {
                                        node+='<wbr>'
                                    }
                                }
                                word = node;
                            }
                            return word
                        })
                        $(this).replaceWith(words.join(' '))
                    }
                })
            })
        },

        isTarget: function(selector) {
            return this.is(selector) || this.closest(selector).length
        },

        softfocus: function(){
            return this.each(function() {
                var x = window.scrollX, y = window.scrollY;
                this.focus();
                window.scrollTo(x, y);
            });
        },

        removeStyle: function() {

            var args = $.makeArray(arguments);

            return this.each(function() {
                var $this = $(this)
                if (! $this.attr('style') ) {
                    return;
                }
                if ( !args.length ) {
                    return $this.removeAttr('style');
                }
                setTimeout(function() {
                    $.each( args, function(i, prop) {
                        return $this.attr('style', function(i, style) {
                            if ( style ) {
                                return style.replace(new RegExp( prop + '[^;]+;?', 'g'), '');
                            }
                        });
                    })
                    if ( $.trim($this.attr('style')) === '' ) {
                        $this.removeAttr('style');
                    }
                },4);
            });
        },

        createLinks: function(blank) {
            return this.each(function() {
                $(this).html(function(i, html) {
                    return $.createLinks(html, blank);
                });
            });
        },

        addTempStyles: function(key, val) {
            var styles = parseArgs(arguments);
            if ( !styles ) {
                return this;
            }
            var props = [];
            $.each(styles, function(k) {
                props.push(k)
            });
            return this.each(function() {
                var saved = {},
                    elm = this;
                $.each(styles, function(k, v) {
                    if ( elm.style[k] ) {
                        saved[k] = elm.style[k];
                    }
                    $(elm).css(k, v);
                });
                $(this).data({
                    tempprops: props,
                    savedstyles: saved
                });
            });
        },

        removeTempStyles: function(key, val) {
            return this.each(function() {
                var $this = $(this);
                var saved = $this.data('savedstyles'),
                    temp = $this.data('tempprops');
                if ( temp ) {
                    $this.removeStyle.apply( $this, temp ).data('tempprops', null);
                }
                if ( saved ) {
                    $this.css(saved).data('savedstyles', null)
                }
            });
        },

        wait: function( ms, callback ) {
            return this.each(function() {
                window.setTimeout((function( self ) {
                    return function() {
                        callback.call( self );
                    }
                }( this )), ms );
            });
        },

        move: (function() {

            // detect transition
            var transition = (function( style ) {
                var props = 'MozTransition WebkitTransition OTransition transition'.split(' '),
                    i;

                // disable css3 animations in opera until stable
                if ( window.opera ) {
                    return false;
                }

                for ( i = 0; props[i]; i++ ) {
                    if ( typeof style[ props[ i ] ] !== 'undefined' ) {
                        return props[ i ];
                    }
                }
                return false;
            }(( document.body || document.documentElement).style ));

            // map transitionend event
            var endEvent = {
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd',
                WebkitTransition: 'webkitTransitionEnd',
                transition: 'transitionend'
            }[ transition ];

            // map bezier easing conversions
            var easings = $.extend({
                _default: [0.25, 0, 0.25, 1],
                ease: [0.25, 0, 0.25, 1],
                linear: [0.25, 0.25, 0.75, 0.75],
                easeIn: [0.42, 0, 1, 1],
                easeOut: [0, 0, 0.58, 1],
                easeInOut: [0.42, 0, 0.58, 1],
                easeOutQuint: [0.16, 0.84, 0.42, 1],
                easeOutExpo: [0.19, 1, 0.22, 1],
                easeOutQuad: [0.165, 0.84, 0.44, 1]
            });

            // function for setting transition css for all browsers
            var setStyle = function( elem, value, suffix ) {
                var css = {};
                suffix = suffix || 'transition';
                $.each( 'webkit moz ms o'.split(' '), function() {
                    css[ '-' + this + '-' + suffix ] = value;
                });
                elem.css( css );
            };

            // clear styles
            var clearStyle = function( elem ) {
                setStyle( elem, 'none', 'transition' );
                if ( $.support.translate3d ) {
                    setStyle( elem, 'translate3d(0,0,0)', 'transform' );
                    if ( elem.data('revert') ) {
                        elem.css( elem.data('revert') );
                        elem.data('revert', null);
                    }
                }
            };

            // various variables
            var change, strings, easing, syntax, revert, form, css;

            // the actual animation method
            return function( to, options ) {

                return this.each(function() {

                    // extend defaults
                    options = $.extend({
                        duration: 400,
                        complete: function(){},
                        stop: false
                    }, options);

                    // cache jQuery instance
                    var elem = $( this );

                    if ( !options.duration ) {
                        elem.css( to );
                        options.complete.call( elem[0] );
                        return;
                    }

                    // fallback to jQuery's animate if transition is not supported
                    if ( !transition ) {
                        if ( $.isArray( options.easing ) ) {
                            options.easing = $.bez( options.easing );
                        }
                        return elem.animate(to, options); 
                    }

                    // stop
                    if ( options.stop ) {
                        // clear the animation
                        elem.unbind( endEvent );
                        clearStyle( elem );
                    }

                    // see if there is a change
                    change = false;
                    $.each( to, function( key, val ) {
                        css = elem.css( key );
                        if ( $.integer( css ) != $.integer( val ) ) {
                            change = true;
                        }
                        // also add computed styles for FF
                        elem.css( key, css );
                    });
                    if ( !change ) {
                        window.setTimeout( function() {
                            options.complete.call( elem[0] );
                        }, options.duration );
                        return;
                    }

                    // the css strings to be applied
                    strings = [];

                    // the easing bezier
                    if ( $.isArray(options.easing) ) {
                        easing = options.easing;
                    } else {
                        easing = options.easing in easings ? easings[ options.easing ] : easings._default;
                    }

                    // the syntax
                    syntax = ' ' + options.duration + 'ms' + ' cubic-bezier('  + easing.join(',') + ')';

                    // add a tiny timeout so that the browsers catches any css changes before animating
                    window.setTimeout( (function(elem, endEvent, to, syntax) {
                        return function() {
                            // attach the end event
                            elem.one(endEvent, (function( elem ) {
                                return function() {

                                    // clear the animation
                                    clearStyle(elem);

                                    // run the complete method
                                    options.complete.call(elem[0]);
                                };
                            }( elem )));

                            // do the webkit translate3d for better performance on iOS
                            if( $.support.translate3d) {

                                revert = {};
                                form = [0,0,0];

                                $.each( ['left', 'top'], function(i, m) {
                                    if ( m in to ) {
                                        form[ i ] = ( $.integer( to[ m ] ) - $.integer(elem.css( m )) ) + 'px';
                                        revert[ m ] = to[ m ];
                                        delete to[ m ];
                                    }
                                });

                                if ( form[0] || form[1]) {

                                    elem.data('revert', revert);

                                    var vendor = {
                                        MozTransition: '-moz-transform',
                                        OTransition: '-o-transform',
                                        WebkitTransition: '-webkit-transform',
                                        transition: 'transform'
                                    }[transition];

                                    strings.push(vendor + syntax);

                                    // 3d animate
                                    setStyle( elem, 'translate3d(' + form.join(',') + ')', 'transform');
                                }
                            }

                            // push the animation props
                            $.each(to, function( p, val ) {
                                strings.push(p + syntax);
                            });

                            // set the animation styles
                            setStyle( elem, strings.join(',') );

                            // animate
                            elem.css( to );

                        };
                    }(elem, endEvent, to, syntax)), 2);
                });
            };
        }()),

        fadeSlide: function( duration, type, callback ) {

            if ( typeof duration == 'function' ) {
                callback = duration;
                duration = 200;
                type = 'height';
            } else if ( typeof type == 'function' ) {
                callback = type;
                type = 'height';
            }
            duration = typeof duration != 'number' ? 200 : duration;
            type = typeof type != 'string' ? 'height' : type;
            callback = callback || function() {};

            var otype = {};
            otype[type] = 0;

            return this.each(function() {
                $(this).animate({
                    opacity: 0
                }, duration, function() {
                    $(this).animate(otype, duration, callback);
                });
            });
        },

        lazyLoad: function( options ) {

            options = $.extend({
                onload: function(){},
                oncomplete: function(){}
            }, options);

            var $lazies = this.each(function() {
                $(this).data('offset', $(this).offset().top).attr('src', 'data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D');
            });

            var check = function() {
                var y = $(this).height() + $(this).scrollTop() - 50;
                $lazies.each(function() {
                    var $lazy = $(this);
                    if ( !$lazy.data('init') && $lazy.data('offset') <= y ) {
                        $lazy.data('init', true);
                        $(this).css('opacity', 0).imageLoad(function() {
                            $(this).animate({
                                opacity: 1
                            }, 200, function() {
                                $(this).removeStyle('opacity');
                            });
                        }).attr('src', $lazy.data('src'));
                    }
                });
            }

            $(window).bind('resize scroll load', check);
            check();
        },

        imageLoad: function( callback ) {

            callback = callback || function(){};

            var complete = function(event) {
                    if ( !('naturalWidth' in this) ) {
                        this.naturalWidth = this.width;
                        this.naturalHeight = this.height;
                    }
                    $.imageCache.add(this.src);
                    if ( $.support.ipad ) {
                        $(this).css('-webkit-transform', 'translate3d(0,0,0)');
                    }
                    callback.call(this, event);
                },
                ready = function() {
                    return this.complete && this.width && this.height;
                };

            return this.each(function() {

                if ( this.nodeName != 'IMG' ) {
                    $(this).find('img').imageLoad( callback );
                    return;
                }

                if ( !ready.call(this) ) {
                    $(this).load(function(e) {
                        window.setTimeout((function(img) {
                            return function() {
                                if ( !ready.call( img ) && !$(img).data('reload') ) {
                                    $(new Image()).attr('src', img.src).data('reload', true).imageLoad( callback );
                                    return;
                                }
                                $(img).unbind('load');
                                complete.call(img, e);
                            };
                        }(this)),1);
                    });
                } else {
                    setTimeout((function(img) {
                        return function() {
                            complete.call(img, {});
                        };
                    }(this)),1);
                }
            });
        },

        imageScale: function( options ) {

            options = $.extend( {
                crop: false,
                position: '50% 0',
                upscale: false,
                complete: function(){}
            }, options );

            var isNotLoaded = function(img) {
                return ( !img.complete || !img.width || !img.height || 
                  !img.naturalWidth || ( img.naturalWidth && img.naturalWidth<2 ) || 
                  !img.naturalHeight || ( img.naturalHeight && img.naturalHeight<2 ) );
            };

            return this.each(function() {

                var img = this,
                    $img = $(img),
                    rperc = /%/;

                if ( isNotLoaded(this) ) {
                    $img.css('visibility', 'hidden').imageLoad( function() {
                        $(this).imageScale( options );
                    });
                    return;
                }

                $img.hide();

                $.each('minWidth minHeight maxWidth maxHeight'.split(' '), function(i, prop) {
                    $img.css(prop, (/min/.test(prop) ? '0' : 'none'));
                });

                var ow = options.width,
                    oh = options.height,
                    loop = ['width', 'height'],
                    $parent = $img.parent(),
                    nwidth = img.naturalWidth,
                    nheight = img.naturalHeight,
                    ch = 0, cw = 0;

                if ( !ow && !oh ) {
                    $img.show().css('vibility', 'visible');
                    options.complete.call(img);
                    return;
                }

                if ( rperc.test( [ow, oh ].join('')) ) {
                    var $tmf = $parent.data('imagewrapper') ? $parent.parent() : $parent,
                        overflow,
                        $body = $(document.body);

                    // special case, if measured against body we need to remove scrollbars first for webkit
                    if ( $tmf.get(0) === document.body ) {
                        overflow = $body.css('overflow');

                        $body.css({
                            overflow: 'hidden'
                        });

                        cw = $body.width();
                        ch = $(window).height(); // window.height is most like what we want here

                    } else {
                        cw = $tmf.width();
                        ch = $tmf.height();
                    }

                    if ( overflow ) {
                        $body.css('overflow', overflow);
                    }

                    ow = rperc.test(ow) ? (parseInt(ow,10)/100)*cw : ow;
                    oh = rperc.test(oh) ? (parseInt(oh,10)/100)*ch : oh;
                }

                ow = ow || img.naturalWidth * ( oh / img.naturalHeight );
                oh = oh || img.naturalHeight * ( ow / img.naturalWidth );
                var parent = $parent.get(0),
                    $wrap = $parent.data('imagewrapper') ? $parent : $('<span>').css({
                        visibility: 'hidden',
                        overflow: options.crop === false ? 'visible' : 'hidden',
                        display: 'block'
                    }).addClass('imagescale').data('imagewrapper', true),

                    newWidth = ow / nwidth,
                    newHeight = oh / nheight,
                    min = Math.min( newWidth, newHeight ),
                    max = Math.max( newWidth, newHeight ),
                    cropMap = {
                        'true'  : max,
                        'width' : newWidth,
                        'height': newHeight,
                        'false' : min,
                        'landscape': nwidth > nheight ? max : min,
                        'portrait': nwidth < nheight ? max : min
                    },
                    ratio = cropMap[ options.crop.toString() ];

                if ( !options.upscale ) {
                    ratio = Math.min(1, ratio);
                }

                newHeight = Math.ceil(nheight * ratio);
                newWidth = Math.ceil(nwidth * ratio);

                $(this).width( newWidth ).height( newHeight );

                $wrap.css({
                    width:  ow,
                    height: oh,
                    position: 'relative',
                    visibility: 'visible'
                });

                // calculate image_position
                var pos = {},
                    mix = {},
                    getPosition = function(value, measure, margin) {
                        var result = 0;
                        if (/\%/.test(value)) {
                            var flt = parseInt( value, 10 ) / 100,
                                m = /width/i.test(measure) ? newWidth : newHeight;

                            result = Math.ceil( m * -1 * flt + margin * flt );
                        } else {
                            result = parseInt( value, 10 );
                        }
                        return result;
                    },
                    positionMap = {
                        'top': { top: 0 },
                        'left': { left: 0 },
                        'right': { left: '100%' },
                        'bottom': { top: '100%' }
                    };

                $.each( options.position.toLowerCase().split(' '), function( i, value ) {
                    if ( value === 'center' ) {
                        value = '50%';
                    }
                    pos[i ? 'top' : 'left'] = value;
                });

                $.each( pos, function( i, value ) {
                    if ( positionMap.hasOwnProperty( value ) ) {
                        $.extend( mix, positionMap[ value ] );
                    }
                });

                pos = pos.top ? $.extend( pos, mix ) : mix;

                pos = $.extend({
                    top: '50%',
                    left: '50%'
                }, pos);

                // apply position
                $(this).css({
                    position : 'absolute',
                    top :  getPosition(pos.top, 'height', oh),
                    left : getPosition(pos.left, 'width', ow)
                });

                $wrap.css('visibility', 'visible');

                if ( parent && !$(parent).data('imagewrapper') ) {
                    $(parent.insertBefore($wrap.get(0), img)).append(img);
                }

                $img.show().css('visibility', 'visible');

                options.complete.call(img, $wrap.get(0));

            });

        },

        hoverClick: function( handler ) {
            return this.each(function() {
                $(this).hover(function() {
                    $(this).addClass('hover');
                }, function() {
                    $(this).removeClass('hover');
                });
                if ( typeof handler == 'function' ) {
                    $(this).click(function(e) {
                        e.preventDefault();
                        handler.call(this,e);
                    });
                }
            });
        },

        disableSelection: function() {
            return this.each(function() {
                $(this).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false)
            })
        },

        traverse: function(fn) {
            return (fn||function(){}).call(this);
        },

        simulateClick: function() {
            return this.each(function() {
                if('createEvent' in document) {
                    var doc = this.ownerDocument,
                        evt = doc.createEvent('MouseEvents');
                    evt.initMouseEvent('click', true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                    this.dispatchEvent(evt);
                } else {
                    this.click(); // IE
                }
            });
        },

        activate: function( fn ) {
            return this.each(function() {
                $(this).addClass('active').traverse(fn || function() {
                    return $(this).siblings();
                }).removeClass('active');
            });
        }
    })

}(jQuery));

/*

Remove dotted borders on mouse interaction

*/

(function($) {
    $(document).on('mousedown mouseup', 'a', function(e) {
        if ('hideFocus' in this) { // IE
            this.hideFocus = e.type == 'mousedown';
        }
        this.blur();
    });
}(jQuery));


/*

A fix for the iOS orientationchange zoom bug.
Script by @scottjehl, rebound by @wilto.
MIT License.

*/

(function(w){

    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if( !$.support.ios ){
        return;
    }

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );
        z = Math.abs( aig.z );

        // If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
            if( enabled ){
                disableZoom();
            }
        }
        else if( !enabled ){
            restoreZoom();
        }
    }

    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

})( this );


/* Aino Path */


(function($) {

    var window = this,

        absUrl = function( url ) {

            var l = window.location, h, p, f, i, n;

            if ( /^\w+:/.test( url ) ) {
                return url.toString();
            }

            h = l.protocol + '//' + l.host;
            if ( url.indexOf( '/' ) === 0 ) {
                return h + url.toString();
            }

            p = l.pathname.replace( /\/[^\/]*$/, '' );
            f = url.match(/\.\.\//g);

            if ( f ) {
                n = url.substring(f.length * 3);
                for ( i = f.length; i--; ) {
                    p = p.substring(0, p.lastIndexOf('/'));
                }
            } else {
                n = url.toString();
            }
            return h + p + '/' + n;

        },

        compareArray = function( o, t ) {

            var i;

            if ( o.length !== t.length ) {
                return false;
            }

            for ( i = 0; i < t.length; i++ ) {
                if ( o[i] !== t[i] ) {
                    return false;
                }
            }
            return true;
        },

        trim = function( url ) {
            return url.replace(/#/,'').replace(/\?.*/,'').replace(/\/$/,'');
        },

        location = function() {
          return trim( window.location.href ).split('/');
        },

        isAnchor = function( elem ) {
            return !!( ( elem.href || $(elem).data('href') ) && elem.nodeName.toUpperCase() === 'A' );
        },

        href = function( elem ) {
            var href = $(elem).data('href') || $(elem).data('path') || elem.href || '';
            return trim( absUrl( href ) ).split('/');
        };

    $.extend( $.expr[":"], {

        path : function( elem ) {

            if ( !isAnchor( elem ) || $(elem).attr('href') == '#' ) {
                return false;
            }

            var anchor = href( elem ),
                loc = location();

            // if anchor points to root, activate if arrays are equal
            if ( anchor.length === 3) {
                return compareArray( loc, anchor );
            }

            return ( loc.length < anchor.length ) ? false :
                compareArray( loc.slice( 0, anchor.length ), anchor );

        },

        current: function( elem ) {

            if ( !isAnchor( elem ) || $(elem).attr('href') == '#' ) {
                return false;
            }

            var anchor = href( elem );

            return compareArray( location(), anchor );

        }
    });

}( jQuery ));

}());