(function($) {
    var defaults = {};
    
    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);

            $("html").bind("click", function(e) {
                $(".jetselect .jetselectdropdown").addClass("closed");
                var js = $(e.target).closest(".jetselect");
                if (js.size() && js.find(".jetselectdropdown").hasClass("closed")) {
                    $(js).find(".jetselectdropdown").removeClass("closed");
                }
            });

            return this.each(function() {
                var c = "jetselect";
                if ($(this).attr("class") !== undefined) {
                    c += " " + $(this).attr("class");
                }
                var el = $(this).wrap("<div class='" + c + "'/>").parent(),
                    dd = el.append("<div class='jetselectvalue'></div><ul class='jetselectdropdown closed'></ul>")
                            .find(".jetselectdropdown");

                $.each(el.find("select option"), function(i, val) {
                    var html = $(val).attr("label");

                    if (html === undefined || html === "") {
                        html = $(val).text();
                    }
                    dd.append($("<li/>").html(html));
                });
                el.closest(".jetselect").jetSelect('select', el.find("select option:selected").index());

                $(".jetselect > ul > li").bind("click", function() {
                    el.closest(".jetselect").jetSelect('select', $(this).index());
                    $(this).parent().addClass("closed");
                    return false;
                });

                el.find(".jetselectvalue").click(function() {
                    if (dd.hasClass("closed")) {
                        dd.removeClass("closed");
                    } else {
                        dd.addClass("closed");
                        return false;
                    }
                });

            });
        },
        select: function(index) {
            var el = this,
                li = el.find("li").removeClass("selected").eq(index).addClass("selected");
            el.find(".jetselectvalue").html(li.html());
            el.find("option").removeAttr("selected");
            el.find("option").eq(index).attr("selected", "selected");
            el.find("select").trigger('change');
        }
    };
    $.fn.jetSelect = function(method){
        if ( methods[method] ) {
            return methods[ method ].apply(this, Array.prototype.slice.call( arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);