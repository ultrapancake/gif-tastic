// array of animals; Will push user input to this array with on click function
var topics = ["monkey", "donkey", "cat", "dog", "chicken", "cow", "pig"]

// populate starting topics on load
buttonDiv();

// function to populate topics  array into buttons and append them to the button-div
function buttonDiv(){
    $("#button-div").empty()
    for(var i = 0; i < topics.length; i++){
        var button = $("<button>");
        button.addClass('gif-button');
        button.attr('data-id', topics[i]);
        button.text(topics[i]);
        $("#button-div").append(button);
    }
}

// on click function for submit button to push user input to array
$("#submit-button").on("click", function () {
    event.preventDefault();
    // creates user input value into a variable; replaces any spaces with an underscore
    var input = $("#search-term").val().replace(/ /g, "_");
    // push the input variable to the array
    topics.push(input);
    // console log the array to check user input at end of array
    console.log(topics);
    // --------- INSERT function that populates buttons from array -------
    buttonDiv();
})