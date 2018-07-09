var myButtons = [
  "Its Always Sunny In Philadelphia",
  "Simpsons",
  "Nathan For You",
  "Super Bad",
  "Family Guy",
  "Futurama",
  "Good The Bad and The Ugly",
  "Star Wars"
];

//adding buttons to array myButtons
function renderButtons() {
  //stops dogs and cat buttons from repeating
  $("#myTarget").empty();
  for (var i = 0; i < myButtons.length; i++) {
    $("#myTarget").append(
      "<button class='user-button'>" + myButtons[i] + "</button>"
    );
    console.log(myButtons);
  }
}

$("form").on("submit", function(event) {
  event.preventDefault();
  console.log($("#user-input").val());
  myButtons.push($("#user-input").val().trim());
  renderButtons();
});
var animal;
$(document).on("click", ".user-button", function() {
  $("#gifs-appear-here").empty();
  console.log($(this).text());
  animal = $(this).text();
 
  

  //url variable
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=sWsnA7UXhW7EQhC9uPHFvYAxl9Jo6GMF&limit=10";
  console.log("app.js");
  // var person = $(this).attr("data-person");
  //ajax request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var results = response.data;
      console.log(response);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        /////////////////
        personImage.attr(
          "data-still",
          response.data[i].images.fixed_height_still.url
        );
        personImage.attr(
          "data-animate",
          response.data[i].images.fixed_height.url
        );
        personImage.attr("data-state", "still");
        personImage.attr("class", "gif");
        
        

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});

$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log(state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

renderButtons();

//onclick function to pause gifs
//how to call still gif from object or api
//is statment to not allow blank space
