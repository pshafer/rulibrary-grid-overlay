(function() {

    var gridOverlayBookmarklet = function($) {
        var gridOverlayInitControls = function () {

            var controlsWindowScroll = function () {

            };

            var gridControlMarkup = '<div id="grid-overlay-controls"><div class="control-header"><h4 class="control-title">Grid Overlay</h4><button type="button" class="close" id="grid-overlay-exit-btn" data-dismiss="grid-overlay" aria-label="Close Grid Overlay" title="Close Grid Overlay"><span aria-hidden="true">&times;</span></button></div> <div class="control-content"><div class="form-group"><label for="grid-target-input">Show Grid On</label><select name="grid-target" id="grid-target-input"><option value="body">Page</option><option value="#page-main">Content</option></select></div></div><div class="control-buttons"><button id="grid-build-btn" class="btn btn-default btn-small btn-block">Show Grid</button></div></div>';
            $('body').append(gridControlMarkup);

            var stylesheet = $('<link>');
            stylesheet.attr('rel', 'stylesheet');
            stylesheet.attr('href', 'http://grid-overlay.local/css/rulibrary-grid-overlay.css');

            $('head').append(stylesheet);

            $('#grid-build-btn').click(buildGridOverlay);
            $('#grid-overlay-exit-btn').click(exitGridOverlay);


            $('body').attr('data-grid-overlay-enabled', false);
            $('body').attr('data-grid-overlay-controls', true);
            $('body').attr('data-grid-overlay-scope', '');
        };

        var buildGridOverlay = function() {

            var overlayScope = $("select#grid-target-input").val();
            var currentScope = $('body').data('grid-overlay-scope');
            var overlayEnabled = $('body').data('grid-overlay-enabled');

            console.log($('body').data('grid-overlay-enabled'));

            var overlayContent = getOverlayContent(overlayScope);

            if(overlayEnabled){
                if(overlayScope !== currentScope){
                    $('#grid-overlay').remove();
                    $(overlayScope).append(overlayContent);
                }
            }else{
                $(overlayScope).append(overlayContent);
            }


            $('body').data('grid-overlay-enabled', true);
            $('body').data('grid-overlay-scope', overlayScope);
        };

        var getOverlayContent = function(scope) {

            var gridOverlay = $('<div></div>').attr('id', 'grid-overlay').addClass('grid-container');
            var gridWrapper = $('<div></div>');
            if(scope === 'body'){
                gridWrapper.addClass('container');
            }else{
                gridWrapper.addClass('row');
            }

            for(i=0; i<12; i++){
                var column = $('<div></div>').addClass('grid-column').addClass('col-xs-1');
                var columnContent = $('<div></div>').addClass('grid-show');
                column.append(columnContent);
                gridWrapper.append(column);
            }

            gridOverlay.append(gridWrapper);

            return gridOverlay;
        };

        var exitGridOverlay = function() {
            $('#grid-overlay-controls').remove();
            $('#grid-overlay').remove();
            $('body').removeAttr('grid-overlay-enabled').removeAttr('grid-overlay-scope');
        };
        gridOverlayInitControls();
    };


    if(!window.jQuery){
        var body = document.getElementsByTagName('body')[0];
        var jQueryScript = document.createElement("script");
        jQueryScript.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
        jQueryScript.integrity = "sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa";
        jQueryScript.crossOrigin = "anonynouse";
        jQuery.onload = function() { gridOverlayBookmarklet(window.jQuery); };
        body.appendChild(jQueryScript);
    } else {
        gridOverlayBookmarklet(window.jQuery);
    }


})();