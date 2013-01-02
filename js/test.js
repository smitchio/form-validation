/**
* validate.js: unobtrusive HTML form validation.
*
*/
(function(){ // Do everything in this one anonymous function:
		// When the doument finishes loading, call init()
 if(window.addEventListener) window.addEventListener("load", init, false); // FF (W3C)
 else if(window.attachEvent) window.attachEvent("onload", init); // IE

 // Define event handlers for any forms and form elements that need them.
 function init(){
	// Loop through all forms in the document:
	for(var i = 0; i < document.forms.length; i++) {
		

		var f = document.forms[i]; // The form we're currently working on

		// Assume for now, that this form does not need any validation:
		var needsValidation = false;

		// Now loop through the elements in our form:
		for(var j = 0; j < f.elements.length; j++){
			
			var e = f.elements[j]; // The element we're currently working on

			// We're only interested in <input type="text"> textfields
			if(e.type != "text") continue;

			// See if it has attributes that require validation:
			var pattern = e.getAttribute("pattern");
			// We could use e.hasAttribute(), but IE doesn't support it!
			var required = e.getAttribute("required") != null;
			
			// Required is just a short-cut for a simple pattern
			if(required && !pattern){
				pattern = "\\S";
				e.setAttribute("pattern", pattern);
				 
			}
			
			// If this element requires validation,
			if(pattern){
				//Validate the element each time it changes
				e.onchange = validateOnChange;
				// Remember to add an onsubmit handler to this form
				needsValidation = true;

			}
		}

		// If at least one of the form elements needed valdation,
		// we also need an onsubmit event handler for the form
		if(needsValidation) f.onsubmit = validateOnSubmit;

	}
 }

 // This function is the onchange event handler for textfields that
 // require validation. Remember that we converted the required attribute
 // to a pattern attribute in init().
 function validateOnChange(){
	var textfield = this;				// the textfield
	var pattern = textfield.getAttribute("pattern"); // the pattern
	var value = this.value;				// the users input
	
	// If the value does not match the pattern, set the class to "invalid"
	if(value.search(pattern) == -1) textfield.className = "invalid";
	else textfield.className = "valid";
 }

 // This function is the onsubmit event handler for any form that requires validation.
 function validateOnSubmit(){
	// When the form is submitted, we revalidate all the fields in the 
	// form and then check their classNames to see if they are invalid.
	// If any of those fields are invalid, display an alert and prevent
	// the form submisssion.
	var invalid = false; // Start by assuming everything is valid.
	
	// Loop through all form elements
	for(var i = 0; i < this.elements.length; i++){
		
		var e = this.elements[i];

		// If the element is a text field and has our onchange handler
		if(e.type == "text" && e.onchange = validateOnChange){
			e.onchange(); // Invoke the handler to re-validate

			// If validation fails for the element, it fails for the form
			if(e.className = "invalid") invalid = true;
		}	
	}
 	// If the form is invalid, alert user and block submission
	if(invalid){
		alert("The form is incorrectly or incompletely filled out.\n" + "Please correct	the highlighted fields and try again.");
		return false;	
	}
 }

})();