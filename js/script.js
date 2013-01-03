var myForm = document.getElementById('formDetails');

if (myForm !== null) { //checks that form has been completed

    myForm.onsubmit = function () {

        "use strict";

        var errorMessage = null,
            female = document.getElementById('female'),
            male = document.getElementById('male'),
            selectCountry = document.getElementById('selectCountry'),
            terms = document.getElementById('terms');


        var checkValidation = function () {

            var element = "", 
                valid = true;   //always assume it validates, if not add valid = flase to each validation check so form does not submit. This
                                // is the same as having return false after calling checkValidation() at end. 

            var formLength = myForm.length - 1; // checks through all elements stopping at the submit button of the form

            for (var i = 0; i < formLength; i++) {
                element = myForm[i];

                errorMessage = element.getAttribute('data-error');
                var errors = element.parentNode.getElementsByClassName('error');

                if (errors.length) {
                    errors[0].parentNode.removeChild(errors[0]);
                }

                //console.log(errors);

                //Check each input has been completed
                if (element.type === "text") {
                    //console.log(element.value);

                    if (element.value === "") {
                        element.parentNode.innerHTML += '<p class="error">' + errorMessage + '</p>';
                        valid = false;
                    }
                }

                // Check gender
                if (element.name === "gender") {

                    if (female.checked !== 1 && male.checked !== 1) {
                        element.parentNode.innerHTML += '<p class="error">You must select a gender</p>';
                        valid = false;
                    }
                }

                // validate Terms
                if (element.type === "checkbox") {
                    if (terms.checked !== 1) {
                        element.parentNode.innerHTML += '<p class="error">' + errorMessage + '</p>';
                        valid = false;
                    }
                }
            }

            // Check Age    
            var ageError = checkAge();
            if (ageError !== '') {
                document.getElementById('dob').innerHTML += '<p class="error">' + ageError + '</p>';
                valid = false;
            } 

            // Check country
            var countryError = checkCountry();

            if (countryError !== '') {
                document.getElementById('country').innerHTML += '<p class="error">' + countryError + '</p>';
                valid = false;
            }

            return valid;


        };

        // Check country function
        var checkCountry = function() {
            if (selectCountry.value === "") {
                return 'You must select a country';
            } else if (selectCountry.value === "China" || selectCountry.value === "USA") {
                return 'The service is not yet available in USA or China. Please select another.';
            } else {
                return '';
            }         
        };

        //Check Age function
        var checkAge = function () {

            /* the minumum age you want to allow in */
            var min_age = 18;
            //var year = parseInt(document.forms["formDetails"]["birthDateYear"].value);
            var year = parseInt(document.forms.formDetails.birthDateYear.value);
            var month = parseInt(document.forms.formDetails.birthDateMonth.value) - 1; // - 1 is for when user is 17 years and 364 days old.
            var day = parseInt(document.forms.formDetails.birthDateDay.value);

            //console.log(day, month, year);

            if (year === 0 || month === -1 || day === 0) {
                    return 'You must enter your age';
            } else {

                var theirDate = new Date((year + min_age), month, day);
                var today = new Date();

                //console.log(today.getTime(), theirDate.getTime(), today.getTime() - theirDate.getTime());

                if ((today.getTime() - theirDate.getTime()) < 0) {
                    return 'You are too young';
                } else {
                    return '';
                }
            }
        };

        return checkValidation();
        //return false; stops form from submitting
           
    };

} else {
    
    // Takes you to confirmation page if validation is passed.

    // Gets the string and splits it up
    function getQueryVariable(variable) {
            
        "use strict";

        //Get the current url
        var query = window.location.search.substring(1);
        
        //Decode any funky characters
        query = decodeURIComponent(query);
        
        //Split the string on ampersands and assign key value pair results to an array
        var vars = query.split("&");
        
        //Loop through the array and split keys from values. Return only values
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
        
            if (pair[0] === variable) {
                return pair[1];
            }
        }

        return(false);
    }


    //create varialbles for each
    var printFirstName = 'First Name: ' + getQueryVariable('firstName'),
        printLastName = 'Last Name: ' + getQueryVariable('lastName'),
        printEmail = 'Email Address: ' + getQueryVariable('emailAddress'),
        printDOB = 'Date of Birth: ' + getQueryVariable('birthDateDay') + '/' + getQueryVariable('birthDateMonth') + '/' + getQueryVariable('birthDateYear'),
        printGender = 'Gender: ' + getQueryVariable('gender'),
        printCountry = 'Country: ' + getQueryVariable('selectCountry');


        // Create an array       
        var arr = [printFirstName, printLastName, printEmail, printDOB, printGender, printCountry];

        var listItem, //set variable for the list item
            indexNum = 0, //get currently active items index number
            detailsList = document.getElementById('detailsList');

        // Loop through the items and add each one into an li
        function printDetails() {

            "use strict";

            for (var i = 0; i < arr.length; i++ ) { 
                // Create the <li> element
                listItem = document.createElement("li");
                // Add the letter between the <li> tags
                listItem.innerHTML = arr[indexNum++];
                // Append the <li> to the bottom of the <ul> element
                detailsList.appendChild(listItem);
            }
        }

        printDetails();   
}