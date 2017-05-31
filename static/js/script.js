var interval = undefined;
function requestText(arg, callback) {
    $.get("/generate", {arg:arg}, callback);
}

function requestComparedText(arg, callback){
	$.get("/compare", {arg:arg}, callback);
}
function updateOriginal(newText) {
    $("#orig-text").val(newText);
    console.log(newText);
}
function updateClosestMatch(response) {
	//response = JSON.parse(response);
	//console.log(response);
	newText = response.data;
    if (response.new_high_score)
    {
        updateTable(response.score);
        $("#latest").val(newText);
    }
    else
    {
        console.log(newText);
        console.log(response.score);
    }
}
function updateTable(score) {
    var time = getFormattedDate();
    $('#table').append('<tr><td>' + time + '</td><td>' + score+ '</td></tr>');
}
function getFormattedDate(){
	var date = new Date();
	return ""+(date.getUTCHours()+8)+":"+date.getUTCMinutes()+":"+date.getUTCSeconds();
}
$(document).ready(function() {
    $('#start-generation').click(function(){
		clearInterval(interval);
		$("#monkey").html("Monkeys are typing... please be patient!");
		interval = setInterval(function() {
			requestComparedText($("#secret-message").val(), updateClosestMatch)
		}, $("#frequency").val());
	});
    $("#secret-message").change(function() {
        var c = $(this);
        $.when(
        c.focusout()).then(function() {
            requestText($("#secret-message").val(), updateOriginal)
        });
    });
})