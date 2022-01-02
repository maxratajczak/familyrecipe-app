$(function() {
	FastClick.attach(document.body);
});

// Mobile Menu
$("#hamburger-button").click(() => {
    $("#mobile-navbar-links").toggle()
    //$("#mobile-navbar-links").toggle().addClass("animate__animated animate__fadeIn");
    if ($("#mobile-nav").hasClass("nav-blurred")) {
        removeClasses();
    }
    else {
        addClasses();
    }
})

// Desktop Menu
$("#recipe-dropdown-btn").on("click", () => {
    $("#recipe-dropdown-links").toggle();
})

$("#account-dropdown-btn").on("click", () => {
    $("#account-dropdown-links").toggle();
})

// Outside Clicking
$('html').on('click', function(e) {
    if($(e.target).closest('#recipe-dropdown').length === 0) {
        $('#recipe-dropdown-links').hide();
    }
});
$('html').on('click', function(e) {
    if($(e.target).closest('#account-dropdown').length === 0) {
        $('#account-dropdown-links').hide();
    }
});

$('html').on('click', function(e) {
    if($(e.target).closest('#mobile-nav').length === 0) {
        $('#mobile-navbar-links').hide();
        removeClasses();
    }
});

window.onresize = () => {
    if(window.innerWidth > 900) {
        $('#mobile-navbar-links').hide();
        removeClasses();
    }
    if($("body").hasClass("noScroll") && $("body").hasClass("noScroll")) {
    }
}


function addClasses() {
    $("#mobile-nav").addClass("nav-blurred")
    // $("body").addClass("noScroll")
    // $("html").addClass("noScroll")
    // $(".bodyUnfocused").addClass("bodyDisabled")
    $("#hamburger-button i").removeClass("fa-bars");
    $("#hamburger-button i").addClass("fa-times");
}

function removeClasses() {
    $("#mobile-nav").removeClass("nav-blurred")
    // $("body").removeClass("noScroll")
    // $("html").removeClass("noScroll")
    // $(".bodyUnfocused").removeClass("bodyDisabled")
    $("#hamburger-button i").addClass("fa-bars");
    $("#hamburger-button i").removeClass("fa-times");
}