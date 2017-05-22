$(document).ready(function() {
    $(".button").click(function (e) {
        $.get("/generate", {}, function (response) {
            $("#latest").empty();
            $("#latest").append(response);})
    });
})
