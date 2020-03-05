var errors_div =  document.querySelector("#errors");

function generateRandomLetter(random_number) {

    let alphabet = 'pcsdetrbfgyoxhikuljvmnqza';
    return alphabet[random_number];

}

function generateRandomDigit(random_number) {

    let  digits = '0816394527';
    return digits[random_number];

}

function generateRandomSpecialCharacter(random_number) {

    let  special_characters = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"; // 33 in total
    return special_characters[random_number];

}

function generateCharacter(character_type) {

    switch(character_type) {
        case 'uppercase': return generateRandomLetter( generateRandomNnumber(25) ).toUpperCase();
          break;
        case 'lowercase': return generateRandomLetter( generateRandomNnumber(25) );
          break;
        case 'number': return  generateRandomDigit( generateRandomNnumber(9) );
            break;
        case 'special_character': return generateRandomSpecialCharacter( generateRandomNnumber(32) );
            break;
        default:
      }

}

function generateRandomNnumber( upper_limit ) {

    return Math.floor( Math.random() * upper_limit );

}

function randomlyChooseCharacterType( character_type_array ) {

    let number_of_elements_in_array = character_type_array.length;
    return character_type_array [ generateRandomNnumber( number_of_elements_in_array ) ];

}

function generatePassword( expected_password_length , final_combination_of_character_types ) {

    let password = '';

    for ( let i = 0; i < expected_password_length; i++ ) {
        let character_type = randomlyChooseCharacterType( final_combination_of_character_types );
        let generated_character = generateCharacter( character_type );
        password += generated_character;
    }
    return password;

}

// If user wants to include special characters then push "special_character" to chosen_character_types Array
function includeSpecialCharacters( chosen_character_types , include_special_characters ) {

    if( include_special_characters == 'true' ) { 
        chosen_character_types.push ( "special_character" ); 
    }

    return chosen_character_types;
}

// Get password length from UI
// Update current password lenth value real time on UI
// Validate password length (between 8 - 128 characters)
// Throw an error if not in acceptable range
function getPasswordLength() {

    let password_length = parseInt( document.querySelector("#password-length").value);
    let password_length_display = document.querySelector('#password-length-display');

    password_length_display.innerHTML = password_length;

    if ((password_length >= 8 && password_length <= 128) && Number.isInteger( password_length ) ){
        return password_length;
    }
    else{
        errors_div.innerHTML += '<li>Password length must be between 8 - 128 characters</li>';
    }
}

// Check input is acceptable then returns a boolean 
function inputIsAccaptable(inputs,check_against)
{
      return inputs.every(function (value) {
        return (check_against.indexOf(value) >= 0);
      });
}

// Get character_type[] from UI
// if array has elements : check if input is acceptable : if false throw an error else 

function getCharacterTypes() {

    let character_type = [];
    character_type = document.querySelectorAll('input[name="character-type[]"]:checked');
    let character_type_array = [];

    for (let i = 0; i < character_type.length; i++) {
        character_type_array.push( character_type[i].value );
    }

    if(character_type_array.length > 0){
        let acceptable_answers = ['uppercase','lowercase','number'];
        if(inputIsAccaptable(character_type_array,acceptable_answers))
        {
        return character_type_array;
        }
        else{
            errors_div.innerHTML += '<li>Character Types : One or more options are invalid </li>';
            return character_type_array = [];
        }
    }
    else{
        errors_div.innerHTML += '<li>Please select character type</li>';
        return character_type_array;
    }

}

function haveSpecialCharacters() {

    let special_characters = [];
    special_characters = document.querySelectorAll('input[name="specialcharacters[]"]:checked');
    let special_characters_array = [];

    for (let i = 0; i < special_characters.length; i++) {
        special_characters_array.push( special_characters[i].value );
    }
    
    if(special_characters_array.length > 0) {
        let acceptable_answers = ['true','false'];
        if(inputIsAccaptable(special_characters_array,acceptable_answers))
        {
        return special_characters_array[0];
        }
        else{
            errors_div.innerHTML += '<li>Special Characters : Input is invalid </li>';
            return special_characters_array = [];
        }
    }   
    else {
        errors_div.innerHTML += '<li>Please select special characters </li>';
        return special_characters_array;
    }
    
}

/* Event listener for password_length_range_slider on input and on load */
var password_length_range_slider = document.querySelector('#password-length');

password_length_range_slider.addEventListener('input', function() {
    getPasswordLength();
});

window.addEventListener('load', function() {
    getPasswordLength();
});

/* Event listener for btn_generate_password */
var btn_generate_password = document.querySelector('#generate-password');

btn_generate_password.addEventListener("click", function () {

    errors_div.innerHTML = '';

    let password_text = document.querySelector('#password'); 
    let expected_password_length = getPasswordLength();
    let chosen_character_types = getCharacterTypes();
    let have_special_characters = haveSpecialCharacters();

    if (chosen_character_types.length >= 1 && have_special_characters.length >= 1) {
        // if have_special_characters == 'true' : add special_character to chosen_character_types Array
        let final_combination_of_character_types = includeSpecialCharacters(chosen_character_types,have_special_characters);

        password_text.value =  generatePassword(expected_password_length,final_combination_of_character_types);
    }

});