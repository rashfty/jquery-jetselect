(function($) {
    var defaults = {};
    
    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);

            $("html").bind("click", function(e) {
                $(".jetselect ul").addClass("closed");
                var js = $(e.target).parents(".jetselect");
                if (js.size() && js.find("ul").hasClass("closed")) {
                    $(js).find("ul").removeClass("closed");
                }
            });

            return this.each(function() {
                var c = $(this).attr("class");
                c = (c === undefined ? "jetselect" : "jetselect " + c);
                var el = $(this).wrap("<div class='" + c + "'/>").parent();

                $(el).append("<div class='value'></div><ul class='closed'></ul>");

                var l = $(el).find("ul");
                $.each($(el).find("select option"), function(i, val) {
                    var html = $(val).attr("label");

                    if (html === undefined || html === "") {
                        html = $(val).text();
                    }

                    $(l).append($("<li/>").html(html).bind("click", function() {
                        $(this).jetSelect('select', i + 1);
                        l.addClass("closed");
                        return false;
                    }));

                    if ($(val).is(":selected")) {
                        $(this).jetSelect('select', i + 1);
                    }
                });

                $(el).find(".value").click(function() {
                    if (l.hasClass("closed")) {
                        l.removeClass("closed");
                    } else {
                        l.addClass("closed");
                        return false;
                    }
                });

            });
        },
        select: function(index) {
            var el = this.closest('.jetselect');

            $(el).find("li").removeClass("selected");

            var li = $(el).find("li:nth-child(" + index + ")");

            li.addClass("selected");
            $(el).find(".value").html(li.html());

            $(el).find("option").removeAttr("selected");

            $(el).find("option:nth-child(" + index + ")").attr("selected", "selected");

            $(el).find("select").trigger('change');
        }
    }
    $.fn.jetSelect = function(method){
        if ( methods[method] ) {
            return methods[ method ].apply(this, Array.prototype.slice.call( arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);