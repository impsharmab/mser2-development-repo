$(document).ready(function(){
    $('#welecome-action').click(function() {
        $('#jgrowl-position').jGrowl($('#notice-msg').html(), {
            sticky: true,
            closer: false,
            glue: 'before',
            speed: 2000,
            easing: 'easeInOutElastic', // 	easing: 'easeInOutExpo',
            animateOpen: {
                height: "show",
                width: "show"
            },
            animateClose: {
                height: "hide",
                width: "show"
            }
        });

        /*
        $('#jgrowl-position').jGrowl($('#welcome-msg').html(), {
            life: 5000,
            closer: false,
            glue: 'before',
            speed: 2000,
            easing: 'easeInOutElastic', // 	easing: 'easeInOutExpo',
            animateOpen: {
                height: "show",
                width: "show"
            },
            animateClose: {
                height: "hide",
                width: "show"
            }
        });
        */
    });

    // if the cookie is expired, then create the cookie and show the growl message
    var cookieName = 'welcome-displayed';
    if (getCookie(cookieName) == null) {
        setCookie(cookieName, true)
        $('#welecome-action').click();
    }

    $('.showLoading').click(function() {
        $('#simplemodal-content').modal();
        return true;
    });

    $('.showLoadingOnchange').change(function() {
        $('#simplemodal-content').modal();
        this.form.submit();
        return true;
    });

});

window.onbeforeunload = function (e) {
    // this will remove the dialog incase the user clicks the back button
    // just the presence of the method onbeforeunload required
    };