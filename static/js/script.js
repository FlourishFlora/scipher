var interval = undefined;
function requestText(arg, callback) {
    $.get("/generate", {arg:arg}, callback);
}
function request
function updateOriginal(newText) {
    $("#orig-text").val(newText);
    console.log(newText);
}
function updateClosestMatch(newText) {
    $("#latest").val(newText);
    console.log(newText);
}
function updateTable(time, score) {
    $('#myTable').append('<tr><td>time</td><td>score</td></tr>');
}
$(document).ready(function() {
    interval = setInterval(function() {
        requestText($("#secret-message").val(), updateClosestMatch)
    }, 5000);
    $(".submit").click(function (e) {
        $.get("/generate", {}, function (response) {
            $("#latest").empty();
            $("#latest").append(response);})
    });
    $("#secret-message").change(function() {
        var c = $(this);
        $.when(
        c.focusout()).then(function() {
            requestText($("#secret-message").val(), updateOriginal)
        });
    });
})