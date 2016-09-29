/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            background_color: {r: 0, g: 1, b: 0}, // FIXME default value is not enforced
            name: 'Maël Nison', // FIXME default value is not enforced
            job: 'Frontend Developer', // FIXME default value is not enforced
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:background_color', this.onBackgroundColorChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackgroundColorChange( );
            this.onNameChange( );
            this.onJobChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackgroundColorChange : function ( ) {
            var rgb = this.model.get( 'background_color');
            var colorStr = 'rgb('+ Math.round(rgb.r * 255) +','+ Math.round(rgb.g * 255) +','+ Math.round(rgb.b * 255) +')';
            this.$el.css( 'background-color', colorStr );
        },

        onNameChange : function ( ) {
            this.$el.find('.name').text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$el.find('.job').text( this.model.get( 'job' ) );
        },

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var content = editor.createWidget( 'Group', {
        label : 'Card Content'
    } );

    content.createWidget( 'Name', 'Text', {
        model : card,
        name  : 'name'
    } );

    content.createWidget( 'Job', 'Text', {
        model : card,
        name  : 'job'
    } );


    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'background_color'
    } );

} );
