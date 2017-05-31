var interval = undefined;
function requestText(arg, callback) {
    $.get("/generate", {arg:arg}, callback);
}
function updateOriginal(newText) {
    $("#orig-text").val(newText);
    console.log(newText);
}
function updateClosestMatch(newText) {
    $("#latest").val(newText);
    console.log(newText);
}
function updateTable(time, score) {
    $('#table').append('<tr><td>time</td><td>score</td></tr>');
}
$(document).ready(function() {
    interval = setInterval(function() {
        requestText($("#secret-message").val(), updateClosestMatch)
    }, 1000);
    $("#secret-message").change(function() {
        var c = $(this);
        $.when(
        c.focusout()).then(function() {
            requestText($("#secret-message").val(), updateOriginal)
        });
    });
})