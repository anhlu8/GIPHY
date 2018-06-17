$(document).ready(function(){
    // Initial array of topics:
    var topics = ["Cats are jerks", "Galaxy far far away", "Messi"];

    // Create new Buttons:
    function renderNewButtons(){
        $("#topicBtn").empty();
        for (var i = 0; i < topics.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("gifBtn");
            newBtn.attr("data-topic", topics[i]);
            newBtn.text(topics[i]);
            $("#topicBtn").append(newBtn);
        }
    }

    // Capture user's input:
    $("#btn").on("click", function (event) {
        event.preventDefault();
        // Push new topic value into the array
        var newTopic = $("#gif-input").val().trim();
        topics.push(newTopic);
        renderNewButtons();
    })

    // Grab & store data-topic from the topic buttons:
    $(".gifBtn").on("click",function(){
        var query = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AktckZuloeaWMmGyQdCJI6s5gGFcnrLw&q=" + query + "&limit=10&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        }) 
    })






    renderNewButtons();
    
});