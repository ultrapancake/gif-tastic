// array of animals; Will push user input to this array with on click function
var topics = ["monkey", "donkey", "cat", "dog", "chicken", "cow", "pig"]

// populate starting topics on load
buttonDiv();

// function to populate topics  array into buttons and append them to the button-div
function buttonDiv() {
    $("#button-div").empty()
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass('gif-button mr-1');
        button.attr('data-id', topics[i]);
        button.text(topics[i]);
        $("#button-div").append(button);
    }
}

// on click function for submit button to push user input to array
$("#submit-button").on("click", function () {
    event.preventDefault();
    // creates user input value into a variable; replaces any spaces with an underscore
    var input = $("#search-term").val().trim().replace(/ /g, "_");
    // push the input variable to the array
    topics.push(input);
    // console log the array to check user input at end of array
    console.log(topics);
    // --------- INSERT function that populates buttons from array -------
    buttonDiv(); //Running this function breaks the .gif button on click function
})

$(".gif-button").on("click", function () {
    // clear HTML div
    $("gif-div").empty()
    
    // grab id of the button
    var thisButton = $(this).attr('data-id');
    console.log(thisButton);
    // insert id into the queryUrl search parameter
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=FOfyGN9BMr6vawWU2dv7rUSHH2nHLt2y&q=" +
        thisButton + "&limit=10&offset=0&rating=G&lang=en";
    console.log(queryUrl);

    // ajax to grab the response object
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // variable to short hand useful information
        var data = response.data;

        // for loop to append gif to HTML
        for (var i = 0; i < data.length; i++) {
            var div = $("<div>");
            div.addClass("gif-div")
            var img = $("<img>");
            img.attr('src', data[i].images.fixed_height.url);
            var p = $("<p>").text("Rating: " + data[i].rating);

            // append the elements together
            div.append(img);
            div.append(p);
            // prepend to HTML
            $("#gif-div").prepend(div);
        }
    })
})