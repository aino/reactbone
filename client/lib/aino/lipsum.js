var words = 'lorem ipsum dolor sit amet consectetur adipiscing elit ut eget turpis dolor id elementum urna sed arcu magna accumsan volutpat tristique eu rhoncus at lectus quisque lacus ante semper in feugiat vitae commodo non mauris quisque vel sem sem maecenas pellentesque ultrices tristique fusce nibh enim porta in convallis id consequat quis purus fusce iaculis enim id mauris mollis id accumsan ipsum sagittis quisque in pharetra magna integer a mattis mauris nulla condimentum molestie massa a malesuada diam rutrum vel suspendisse fermentum lacus id erat volutpat cursus donec at felis ante eget cursus risus nunc in odio nec mi gravida rutrum nec pulvinar turpis quisque id tellus sem nunc sed dui quis mi tristique viverra'.split(' ');

var endings = "................................??!";

var rand = function( len ) {
        return Math.floor( Math.random() * len );
    },
    range = function( from, to ) {
        return rand( to - from + 1 ) + from;
    },
    capitalize = function( word ) {
        return word.substr(0,1).toUpperCase() + word.substr(1);
    },
    word = function() {
        return words[rand(words.length)];
    },
    ending = function() {
        var i = rand(endings.length);
        return endings.substring(i, i+1);
    };

var Lipsum = {

    words: function( no, to, cap ) {
        no = no || 1;
        if ( no < 1 ) {
            return '';
        }
        if ( to === true ) {
            cap = true;
            to = undefined;
        }
        if ( typeof to == 'number' ) {
            no = range(no, to);
        }

        var text = cap ? capitalize(word()) : word();

        while( no-- ) {
            text += word() + ' ';
        }
        return text.replace(/^\s+|\s+$/g, '');
    },

    sentence: function( no, to ) {
        no = no || 8;
        if ( no < 1 ) {
            return '';
        }
        if ( typeof to == 'number' ) {
            no = range(no, to);
        }
        var text = capitalize( word() ),
            comma = rand(2) ? rand( no-1 ) : false;

        while( no-- ) {
            text += word() + (( comma && comma === no ) ? ', ' : ' ');
        }

        return text.replace(/\s+/,' ').substr(0, text.length-2) + '.';
    },

    paragraph: function( no, to ) {
        no = no || 40;
        if ( no < 1 ) {
            return '';
        }
        if ( no < 8 ) {
            return Lipsum.sentence( no );
        }
        if ( typeof to == 'number' ) {
            no = range(no, to);
        }
        var sentences = Math.floor(no/8),
            rest = no - (sentences * 8),
            text = '';

        while( sentences-- ) {
            text += Lipsum.sentence( 8 ) + ' ';
        }
        if ( rest ) {
            return text + Lipsum.sentence(rest);
        } else {
            return text.substr(0, text.length-2);
        }
    }
}

module.exports = Lipsum

