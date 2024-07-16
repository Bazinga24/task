describe("Contact Form Submission", function () {
  beforeEach(function () {
    // Set up the DOM elements for testing
    $("body").append(
      '<form id="contactForm"><input type="email" id="email" value="test@example.com"><input type="text" id="firstName" value="John"><input type="text" id="lastName" value="Doe"><input type="checkbox" id="terms"><button type="submit">Submit</button></form>'
    );
    $("body").append('<div id="contactModal"></div>');

    // Initialize the script
    $.ajax = jasmine.createSpy("ajax").and.callFake(function (params) {
      if (params.url === "https://getform.io/f/bmdpmjda") {
        params.success("<html><body>Success</body></html>");
      } else {
        params.error("Error");
      }
    });

    $("#contactForm").on("submit", function (event) {
      event.preventDefault();
      var formData = {
        email: $("#email").val(),
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
      };

      if (!$("#terms").is(":checked")) {
        alert("Please agree to Fyle's terms and conditions.");
        return;
      }

      $.ajax({
        url: "https://getform.io/f/bmdpmjda", // Replace with your API endpoint
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
          console.log("Success:", response);
          $("#contactModal").modal("hide");
          const newPageBlob = new Blob([response], { type: "text/html" });
          const newPageURL = URL.createObjectURL(newPageBlob);
          window.location.href = newPageURL;
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    });
  });

  afterEach(function () {
    // Clean up the DOM elements
    $("#contactForm").remove();
    $("#contactModal").remove();
  });

  it("should alert if terms and conditions are not agreed to", function () {
    spyOn(window, "alert");
    $("#contactForm").submit();
    expect(window.alert).toHaveBeenCalledWith(
      "Please agree to Fyle's terms and conditions."
    );
  });

  it("should prevent default form submission", function () {
    var event = $.Event("submit");
    $("#terms").prop("checked", true);
    $("#contactForm").trigger(event);
    expect(event.isDefaultPrevented()).toBe(true);
  });

  it("should make an AJAX request on form submission", function () {
    $("#terms").prop("checked", true);
    $("#contactForm").submit();
    expect($.ajax).toHaveBeenCalled();
  });

  it("should hide the modal and redirect on AJAX success", function () {
    spyOn($.fn, "modal");
    spyOn(window.location, "href", "set");
    $("#terms").prop("checked", true);
    $("#contactForm").submit();
    expect($.fn.modal).toHaveBeenCalledWith("hide");
    expect(window.location.href).toContain("blob:");
  });

  it("should log an error on AJAX failure", function () {
    $.ajax.and.callFake(function (params) {
      params.error("Error");
    });
    spyOn(console, "error");
    $("#terms").prop("checked", true);
    $("#contactForm").submit();
    expect(console.error).toHaveBeenCalledWith("Error:", "Error");
  });
});
