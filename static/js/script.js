var interval = undefined;
function requestText(arg) {
    $.get("/generate", {arg:arg}, updateOriginal);
}
function updateOriginal(newText) {
    $("#orig-text").val(newText);
    console.log(newText);
}
function updateClosestMatch(newText) {
    $("#latest").val(newText);
    console.log(newText);
}
$(document).ready(function() {
    $(".submit").click(function (e) {
        $.get("/generate", {}, function (response) {
            $("#latest").empty();
            $("#latest").append(response);})
    });
    $("#secret-message").change(function() {
        var c = $(this);
        $.when(
        c.focusout()).then(function() {
            requestText($("#secret-message").val());
        });
    });
})