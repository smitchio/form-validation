var myForm = document.getElementById('formDetails');

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


    //var fieldsArr = document.querySelectorAll('input'); //returning an array

    //var errorArr = document.querySelectorAll('.formWrap');
    //var noOfFields = fieldsArr.length;

    // for (var i = 0; i < noOfFields; i++) {
    // 	fieldsArr[i].style.borderColor = "black";
    // }




    var checkValidation = function () {

        var element = "";

        var formLength = myForm.length - 1; //only checks through 8 elements of the form

        for (i = 0; i < formLength; i++) {
            element = myForm[i];

            errorMessage = element.getAttribute('data-error');
            var errors = element.parentNode.getElementsByClassName('error');

            if(errors.length){
                errors[0].parentNode.removeChild(errors[0]);
            }

            console.log(errors);

            if(element.name === "selectCountry"){
                //do validation for country
                 if (selectCountry.value === "China") {
                    console.log('This is China');
                }
            } else if (element.type === "text" || element.type === "select-one") {
                //console.log(element.value);

                if (element.value === "") {
                    element.parentNode.innerHTML+='<p class="error">' + errorMessage + '</p>';
                }
                
            }

            if (element.name === "gender") {
                // Check gender
                if (female.checked != 1 && male.checked != 1) {
                    element.parentNode.innerHTML+='<p class="error">You must select a gender</p>';
                }
            }

            if (element.type === "checkbox") {
                if (terms.checked != 1) {
                    element.parentNode.innerHTML+='<p class="error">' + errorMessage + '</p>';
                }
            }

                //     element.parentNode.innerHTML+='<p>You must select a gender</p>';
                // }

            // if (female.checked != 1 && male.checked != 1) {
            //     element.parentNode.innerHTML+='<p>You must select a gender</p>';
            // }
        }
    }

        // if (firstName.value === "") {
        //     errorMessage += 'First Name must not be blank \n';
        //     firstName.style.borderColor = "red";

        // }
        // if (lastName.value === "") {
        //     errorMessage += 'Last Name must not be blank \n';
        //     document.getElementById('lastName').style.borderColor = "red";
        // }
        // if (emailAddress.value === "") {
        //     errorMessage += 'Email Address must not be blank \n';
        //     document.getElementById('emailAddress').style.borderColor = "red";
        // }

        


        //Check age
        // errorMessage += checkAge();

        // if (errorMessage != "") {
        //     document.getElementById('error').InnerHTML = errorMessage;
        //     return false;
        // } else {
        //     document.getElementById('error').InnerHTML = "";
        // }

        // if (passedValidation) {
        //     alert('thank you for your details');
        // }
        // return false;



        var checkAge = function () {
            /* the minumum age you want to allow in */
            var min_age = 18;

            var year = parseInt(document.forms["formDetails"]["birthDateYear"].value);
            var month = parseInt(document.forms["formDetails"]["birthDateMonth"].value) - 1; // - 1 is for when user is 17 years and 364 days old.
            var day = parseInt(document.forms["formDetails"]["birthDateDay"].value);

            console.log(year, month, day);

            if (year === 0 || month === -1 || day === 0) {
                return 'You have not entered your age';
            } else {

                var theirDate = new Date((year + min_age), month, day);
                var today = new Date;

                console.log(today.getTime(), theirDate.getTime(), today.getTime() - theirDate.getTime());

                if ((today.getTime() - theirDate.getTime()) < 0) {
                    return 'You are too young';
                } else {
                    return '';
                }
            }
        }

        checkValidation();
        //errorMessage += checkAge();
        return false;
       
};
