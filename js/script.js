var myForm = document.getElementById('formDetails');

if(myForm !== null){

    myForm.onsubmit = function () {

        var errorMessage = null,
            firstName = document.getElementById('firstName'),
            lastName = document.getElementById('lastName'),
            emailAddress = document.getElementById('emailAddress'),
            female = document.getElementById('female'),
            male = document.getElementById('male'),
            selectCountry = document.getElementById('selectCountry'),
            formWrapRadio = document.getElementById('formWrapRadio'),
            formWrap = document.getElementById('formWrap'),
            gender = document.getElementsByName('gender'),
            terms = document.getElementById('terms'),
            passedValidation = true;


        var checkValidation = function () {

            var element = "";

            var formLength = myForm.length - 1; // checks through all elements stopping at the submit button of the form

            for (i = 0; i < formLength; i++) {
                element = myForm[i];

                errorMessage = element.getAttribute('data-error');
                var errors = element.parentNode.getElementsByClassName('error');

                if(errors.length){
                    errors[0].parentNode.removeChild(errors[0]);
                }

                //console.log(errors);

                //Check each input has been completed
                if (element.type === "text") {
                    //console.log(element.value);

                    if (element.value === "") {
                        element.parentNode.innerHTML+='<p class="error">' + errorMessage + '</p>';
                    }
                }
                
                // Check gender
                if (element.name === "gender") {
                
                    if (female.checked != 1 && male.checked != 1) {
                        element.parentNode.innerHTML+='<p class="error">You must select a gender</p>';
                    }
                }

                // validate Terms
                if (element.type === "checkbox") {
                    if (terms.checked != 1) {
                        element.parentNode.innerHTML+='<p class="error">' + errorMessage + '</p>';
                    }
                }
            }

            // Check Age    
            var ageError = checkAge();
            if (ageError !== ''){
                document.getElementById('dob').innerHTML+= '<p class="error">' + ageError + '</p>';
            } 

            // Check country
            var countryError = checkCountry();
            if (countryError !== '') {
                document.getElementById('country').innerHTML+= '<p class="error">' + countryError + '</p>';
            }
        }

        // Check country function
        var checkCountry = function() {
            if (selectCountry.value === "") {
                return 'You must select a country'
            } else if (selectCountry.value === "China" || selectCountry.value === "USA") {
                return 'The service is not yet available in USA or China. Please select another.';
            } else {
                return '';
            }         
        }

        //Check Age function
        var checkAge = function () {

            /* the minumum age you want to allow in */
            var min_age = 18;

            var year = parseInt(document.forms["formDetails"]["birthDateYear"].value);
            var month = parseInt(document.forms["formDetails"]["birthDateMonth"].value) - 1; // - 1 is for when user is 17 years and 364 days old.
            var day = parseInt(document.forms["formDetails"]["birthDateDay"].value);

            //console.log(day, month, year);

            if (year === 0 || month === -1 || day === 0) {
                    return 'You must enter your age';
            } else {

                var theirDate = new Date((year + min_age), month, day);
                var today = new Date;

                //console.log(today.getTime(), theirDate.getTime(), today.getTime() - theirDate.getTime());

                if ((today.getTime() - theirDate.getTime()) < 0) {
                    return 'You are too young';
                } else {
                    return '';
                }
            }
        }

        // function getQueryVariable(variable) {
        //     //Get the current url
        //     var query = window.location.search.substring(1);
        //     //Decode any funky characters
        //     query = decodeURIComponent(query);
        //     //Split the string on ampersands and assign key value pair results to an array
        //     var vars = query.split("&");
        //     //Loop through the array and split keys from values. Return only values
            
        //     for (var i=0;i<vars.length;i++) {
        //         var pair = vars[i].split("=");
            
        //         if(pair[0] === variable){
        //             return pair[1];
        //         }
        //     }
        //     return(false);
        // }

        checkValidation();
        return false; 
           
    };

}
else{
    //were on confirmation page

    alert('confirm')
}