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