(function($) {
    var defaults = {};
    
    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);

            return this.each(function() {

            });
        }
    }
    $.fn.jetScrollPanel = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);