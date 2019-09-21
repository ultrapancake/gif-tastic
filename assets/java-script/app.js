// array of animals; Will push user input to this array with on click function
var arr = ["monkey", "donkey", "cat", "dog", "chicken", "cow", "pig"]

// on click function for submit button to push user input to array
$("#submit-button").on("click", function () {
    var input = $("#search-term").val();
    arr.push(input);
    console.log(arr);
    // INSERT function that populates buttons from array
})