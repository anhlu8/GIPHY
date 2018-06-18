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
    $(document).on("click",".gifBtn",function(){
        $("#giphy-here").empty();
        var query = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + query + "&limit=10&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data;
            for (var i = 0; i<results.length; i++){
                var p = $("<p>").text("Rating: " + results[i].rating);
                var newTopicImg = $("<img>");
                newTopicImg.addClass("gifObject");
                newTopicImg.attr("src", results[i].images.fixed_height.url);
                newTopicImg.attr("data-state", "still");
                newTopicImg.attr("data-still", results[i].images.fixed_height_still.url)
                newTopicImg.attr("data-animate",results[i].images.fixed_height.url)
                newTopicImg.append(p);
                $("#giphy-here").prepend(newTopicImg);


    $(".gifObject").on("click", function(){
        var state = $(this).attr("data-state");
        if (state === "still"){
            console.log("it is going to animate", $(this).attr("data-animate"))
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state","animate");
        } else{
            console.log("it is is going to still")
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state","still");
        }

    })
                
            }
        }) 
    })

    // animated: results[i].images.fixed_height.url
    // still: results[i].images.fixed_height_still.url



    renderNewButtons();
    
});