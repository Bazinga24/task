# task
Fyle Internship Task


Test Cases ( in tests.js)

Explanation of the Tests
'beforeEach' and 'afterEach': These functions set up and clean up the DOM elements and initialize the script before each test. The $.ajax method is mocked to control its behavior during tests.

Test Cases:

1-Alert if terms not agreed: Verifies that an alert is shown if the terms and conditions checkbox is not checked.
2-Prevent default form submission: Checks that the default form submission is prevented.
3-AJAX request on form submission: Ensures that an AJAX request is made when the form is submitted.
4-Hide modal and redirect on AJAX success: Confirms that the modal is hidden and the page is redirected on a successful AJAX response.
5-Log error on AJAX failure: Verifies that an error is logged to the console if the AJAX request fails.
