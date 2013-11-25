
!function(a,i,n,o){o=i.length&&typeof require=="function"?function(e,t,n){n=[];for(t=0;t<i.length;t++){n.push(require(i[t]))}return e.apply(null,n)}(n):n();if(typeof module=="object"){module.exports=o}else if(typeof define=="function"){define(a,i,n())}else{this[a]=o}}.call
(this, 'Masonry', ['jquery'], function($) {

    var mi = function( arr ) { 
        return Math.min.apply( window, arr )
    }
    var ma = function(arr) { 
        return Math.max.apply( window, arr ); 
    }

    return function(elem, options) {

        options = $.extend({
            width: 240,
            onbrick: function(){},
            onheight: function(){},
            delay: 0,
            debug: false
        }, options );

        elem = $(elem)

        var layout = function() {
        
            var bricks = elem.children(),
                width = elem.outerWidth(),
                colCount = Math.floor( width / options.width ),
                colHeight = [],
                i,
                thisCol,
                sz,
                mH,
                css = {
                    'float': 'none',
                    position: 'absolute',
                    display: /^(?!.*chrome).*safari/i.test(navigator.userAgent) ? 'inline-block' : 'block'
                };
        
            if ( !bricks.length ) {
                return;
            }
        
            for ( i = 0; i < colCount; i++ ) {
                colHeight[ i ] = 0;
            }
        
            elem.css( 'position', 'relative' );
        
            bricks.css( css ).each( function( j, brick ) {
        
                brick = $( brick );
        
                for ( i = colCount-1; i > -1; i-- ) {
                    if ( colHeight[ i ] === mi( colHeight ) ) {
                        thisCol = i;
                    }
                }
        
                sz = {
                    top: colHeight[ thisCol ],
                    left: options.width * thisCol
                };
        
                if ( typeof sz.top !== 'number' || typeof sz.left !== 'number' ) {
                    return;
                }
        
                brick.css( sz );
                options.onbrick.call( brick );
        
                if ( !brick.data( 'height' ) ) {
                    brick.data( 'height', brick.outerHeight( true ) );
                }
        
                colHeight[ thisCol ] += brick.data('height');
        
            });
        
            mH = ma( colHeight );
        
            if (mH < 0) {
                return;
            }
        
            if (typeof mH !== 'number') {
                return;
            }
        
            elem.height( mH );
            options.onheight.call( elem );
        }

        return {
            layout: layout,
            options: options,
            element: elem
        }
    };
});  