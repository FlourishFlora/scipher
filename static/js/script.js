$(document).ready(function() {
    $(".submit").click(function (e) {
        $.get("/generate", {}, function (response) {
            $("#latest").empty();
            $("#latest").append(response);})
    });
})
