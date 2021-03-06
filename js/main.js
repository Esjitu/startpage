window.cfg = [];
window.cfg_bool = [];

$.getJSON("config.json", function(data) {
    window.cfg = [
        data.style.heading_font,
        data.style.link_font,
        data.style.heading_font_size,
        data.style.link_font_size,
        data.style.background,
        data.style.foreground,
        data.style.heading_color,
        data.style.link_color,
        data.style.border_color,
        data.style.border_width,
        data.style.search_color,
        data.style.search_bg_color,
		data.style.link_hover_color,
        data.ext.ref,
        data.ext.bottom,
        data.ext.right,
        data.ext.height,
        data.ext.width,
        data.ext.opacity
    ];

    window.cfg_bool = [
        data.bool.borders,
        data.bool.simplesearch,
        data.bool.alwaysopen,
        data.bool.mascot
    ];

    $("span").css({
        "fontFamily": cfg[0],
        "fontSize": cfg[2],
        "color": cfg[6]
    });

    $("a").css({
        "fontFamily": cfg[1],
        "fontSize": cfg[3],
        "color": cfg[7]
    });

	$("a").hover(
		function() {
			$(this).css({
				"color": cfg[12],
				"fontWeight": "bold"
			});
		},
		function() {
			$(this).css({
				"color": cfg[7],
				"fontWeight": "normal"
			});
		}
	);

    $("body").css({
        "backgroundColor": cfg[4]
    });

    $(".sqr").css({
        "backgroundColor": cfg[5],
        "borderTop": "0 solid " + cfg[8],
        "borderBottom": "0 solid " + cfg[8]
    });

    $("#searchinput").css({
        "color": cfg[10],
        "backgroundColor": cfg[11]
    });

    if (window.cfg_bool[3]) {
        $("#bgimg").css({
            "backgroundImage": "url('" + cfg[13] + "')",
            "bottom": cfg[14],
            "right": cfg[15],
            "height": cfg[16],
            "width": cfg[17],
            "opacity": cfg[18]
        });
    }
    else {
        $("#bgimg").css({
            "backgroundImage": ""
        });
    }
});

function evenContainerHeight() {
	if (window.innerHeight % 2 == 0) {
		document.getElementById("container").style.height = window.innerHeight;
	}
    else {
		document.getElementById("container").style.height = window.innerHeight - 1;
	}
}

window.onresize = function() {
	evenContainerHeight();
};

document.addEventListener("DOMContentLoaded", function() {
	evenContainerHeight();
    document.getElementById("searchinput").addEventListener("keypress", function search(a) {
        var key = a.keyCode;

        if (key == 13) {
            var query = this.value;

            if (!window.cfg_bool[1]) {
                switch(query.substr(0,3)) {
                    default:
                        window.location = "https://www.google.com/#q=" + query.replaceChars(" ", "+");
                        break;
                    case "-i ":
                        query = query.substr(3);
                        window.location="https://www.google.com/search?biw=1280&bih=685&tbm=isch&sa=1&q=" + query.replaceChars(" ", "+");
                        break;
                    case "-w ":
                        query = query.substr(3);
                        window.location="https://en.wikipedia.org/w/index.php?search=" + query.replaceChars(" ", "+");
                        break;
                    case "-d ":
                        query = query.substr(3);
                        window.location="http://www.donmai.us/posts?tags=" + query.replaceChars(" ", "+");
                        break;
                    case "-y ":
                        query = query.substr(3);
                        window.location="https://www.youtube.com/results?search_query=" + query.replaceChars(" ", "+");
                        break;
                    case "-n ":
                        query = query.substr(3);
                        window.location="http://www.nyaa.se/?page=search&cats=1_37&filter=0&term=" + query.replaceChars(" ", "+");
                        break;
                    case "-p ":
                        query = query.substr(3);
                        window.location="http://www.pixiv.net/search.php?s_mode=s_tag&word=" + query.replaceChars(" ", "%20");
                        break;
                }
            }else{
                window.location="https://www.google.com/#q=" + query.replaceChars(" ", "+");
            }
        }
    });

    document.addEventListener("keypress", function search(a) {
        var key = a.keyCode;

        if (key == 9) {
            var search_sqr = document.getElementById("search_sqr");
            search_sqr.style.height = (300 + 37) + "px";
            search_sqr.style.borderTop = cfg[9] + " solid " + cfg[8];
            search_sqr.style.borderBottom = cfg[9] + " solid " + cfg[8];

            document.getElementById("searchinput").focus();
        }

        if ([9].indexOf(key) > -1) {
            a.preventDefault();
        }
    });

    var sqr = document.querySelectorAll(".sqr");
    var i = 0;
    var lenSqr = sqr.length;

    if (!window.cfg_bool[2]) {
        for (i = 0; i < lenSqr; ++i) {
            sqr[i].addEventListener("mouseover", expand, false);
            sqr[i].addEventListener("mouseout", contract, false);
        }
    }
    else {
        for (i = 0; i < lenSqr; ++i) {
            var a = 0;

            for (var x = 0; x < lenSqr; ++x) {
                if (a < sqr[x].getElementsByTagName("a").length) {
                    a = sqr[x].getElementsByTagName("a").length;
                }
            }
            sqr[i].style.height = (225 + 25 * a) + "px";

            if (window.cfg_bool[0]) {
                sqr[i].style.borderTop = cfg[9] + " solid " + cfg[8];
                sqr[i].style.borderBottom = cfg[9] + " solid " + cfg[8];
            }
        }
    }
});

function expand() {
	var acount = this.getElementsByTagName("a").length;
    var icount = this.getElementsByTagName("input").length;

    if (icount >= 1) {
        this.style.height = (300 + 37 * icount) + "px";
    }
    else {
        this.style.height = (300 + 25 * acount) + "px";
    }

    if (window.cfg_bool[0]) {

    // It looks a bit less fancy, but I removed the top borders because they felt weird with the icons.
        // this.style.borderTop = cfg[9] + " solid " + cfg[8];
        this.style.borderBottom = cfg[9] + " solid " + cfg[8];
    }
}
function contract() {
	this.style.height = "150px";
	this.style.borderTop = "0 solid" + cfg[8];
	this.style.borderBottom = "0 solid" + cfg[8];
}

String.prototype.replaceChars = function(character, replacement) {
    var str = this;
    var a;
    var b;
    var strLen = str.length;

    for (var i = 0; i < strLen; i++){
        if (str.charAt(i) == character){
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }

    return str;
};

window.onunload = function() {
    delete window.cfg;
    delete window.cfg_bool;
};
