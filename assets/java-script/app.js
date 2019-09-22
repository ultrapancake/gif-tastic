$(document).ready(function () {
    // array of animals; Will push user input to this array with on click function
    var topics = ["monkey", "donkey", "cat", "dog", "chicken", "cow", "pig"]

    // populate starting topics on load
    buttonDiv();

    // function to populate topics  array into buttons and append them to the button-div
    function buttonDiv() {
        $("#button-div").empty()
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass('gif-button m-1');
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

    $(document).on("click", ".gif-button", function () {
        // clear HTML div
        $("#gif-div").empty()

        // grab id of the button
        var thisButton = $(this).attr('data-id');
        // console.log(thisButton);
        // insert id into the queryUrl search parameter
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=FOfyGN9BMr6vawWU2dv7rUSHH2nHLt2y&q=" +
            thisButton + "&limit=10&offset=0&rating=G&lang=en";
        // console.log(queryUrl);

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
                img.addClass("gif-img")
                img.attr({ 'src': data[i].images.original_still.url, 'data-state': 'still', 'data-still': data[i].images.original_still.url, 'data-animate': data[i].images.original.url });
                var p = $("<p>").html("Rating: " + data[i].rating + "<br>" + "Title: " + data[i].title);

                // append the elements together
                div.append(img);
                div.append(p);
                // prepend to HTML
                $("#gif-div").prepend(div);
            }
        })
    })

    $(document).on("click", ".gif-img", function () {
        // variable to hold the state of the image
        var state = $(this).attr("data-state");
        // console.log(state);

        var animate = $(this).attr("data-animate");
        // console.log(animate);

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            var still = $(this).attr("data-still");
            // console.log(still)
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    })
})