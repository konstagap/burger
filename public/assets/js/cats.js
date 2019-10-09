// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("devoured");

    var newDevouredState = {
      devoured: newDevoured
    };
   console.log(newDevouredState)
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoure to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


});
