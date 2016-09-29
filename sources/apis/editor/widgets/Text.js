define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget text-widget">',
            '          <div class="widget-wrapper">',
            '              <input class="value" />',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .value:input': 'changeEvent',
            'keyup .value:input': 'changeEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( '' );

        },

        render: function () {

            var $valueElement = this.$( '.value' );

            var value = this.get();

            $valueElement.text( value );

        },

        fixValue: function ( value ) {

            return value.trim();

        },

        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val();
            value = this.fixValue( value );

            // This force the update
            this.set( !value );
            this.change( value );

        },

    } );

} );
