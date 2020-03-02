function generateCharacter(character_type) {
    switch(character_type) {
        case 'uppercase': return String.fromCharCode ( Math.floor ( (Math.random() * ( 90 - 65 ) + 65 ) ) ); // ASCII range for Uppercase
          break;
        case 'lowercase': return String.fromCharCode ( Math.floor ( Math.random() * ( 122 - 97 ) + 97 ) ) ; // ASCII range for Lowercase
          break;
        case 'number': return String.fromCharCode ( Math.floor ( Math.random() * (58 - 48) + 48 ) ); // ASCII range for Digits
            break;
        case 'special_character': return String.fromCharCode(Math.floor( Math.random() * ( 64 - 32 ) + 32 ) ); // ASCII range for Special Characters
            break;
        default:
      }
}

function generatePassword(expected_password_length,final_combination_of_character_types) {
    let password = '';

    for (let i = 0; i < expected_password_length; i++) {
        //generate random character type from final_combination_of_character_types Array
        let random_character_type = final_combination_of_character_types[ Math.floor(Math.random() * final_combination_of_character_types.length) ];
        let generated_character = generateCharacter(random_character_type);
        password += generated_character;
    }
    return password;
}

function includeSpecialCharacters(chosen_character_types,include_special_characters) {
    if(include_special_characters == 'true') { 
        chosen_character_types.push("special_character");}
    return chosen_character_types;
}

function getPasswordLength() {
    let password_length = document.getElementById("password-length").value;
    if (password_length >= 8 && password_length <= 128){
        return password_length;
    }
    else{
        alert("Password length must be between 8 - 128 characters");
    }
}

function getCharacterTypes() {
    let character_type = [];
    character_type = document.querySelectorAll('input[name="character-type[]"]:checked');
    let character_type_array = [];
    for (let i = 0; i < character_type.length; i++) {
        character_type_array.push ( character_type[i].value );
    }
    return character_type_array;
}

function haveSpecialCharacters() {
    let special_characters = [];
    special_characters = document.querySelectorAll('input[name="specialcharacters[]"]:checked');
    let special_characters_array = [];
    for (let i = 0; i < special_characters.length; i++) {
        special_characters_array.push ( special_characters[i].value );
    }
    return special_characters_array[0];
}

document.getElementById('password-length').oninput = function() {
    let passwordLengthDisplay = document.getElementById('password-length-display');
    let passwordLength = document.getElementById('password-length');
    passwordLengthDisplay.innerHTML = passwordLength.value;
};

document.getElementById("generate-password").addEventListener("click", function () {
    let expected_password_length = getPasswordLength();
    let chosen_character_types = getCharacterTypes();
    let have_special_characters = haveSpecialCharacters();

    if (chosen_character_types.length >= 1 && have_special_characters.length >= 1) {
        // if have_special_characters == 'true' : add special_character to chosen_character_types Array
        let final_combination_of_character_types = includeSpecialCharacters(chosen_character_types,have_special_characters);

       document.getElementById('password').value =  generatePassword(expected_password_length,final_combination_of_character_types);
    }
    else {
        alert("Please select at least 1 option from Character Type & Special Characters");
    }
});