// Gets the text in each text area box
function getText() {
    const englishText = document.getElementById("english-text");
    const morseCodeText = document.getElementById("morse-code-text");
    const pigLatinText = document.getElementById("pig-latin-text");

    englishText.addEventListener("input", englishToMorse.bind(null, englishText));
    morseCodeText.addEventListener("input", morseToEnglish.bind(null, morseCodeText));
/*     pigLatinText.addEventListener("input", getInputText.bind(null, pigLatinText)); */
}

// Each time there is an input, print the text in console for checking
function getInputText(text) {
    console.log(text.value);
}

// Loop through the capitalized English word(s) and if it's in the dictionary, translate it else put a #; add a space at the end and set the morse code text
function englishToMorse(englishText) {
    const morseCodeText = document.getElementById("morse-code-text");
    let morse = "";

    // Trim the text for excess white space and capitalize it
    word = englishText.value.trim().toUpperCase();

    for(let i = 0; i < word.length; i++) {
        morse += (morseDictionary[word[i]] || "#") + " ";
    }
    morseCodeText.value = morse;
}

// Split the morse code by spaces so they're individual codes, get the key from the value in the dictionary
function morseToEnglish(morseCodeText) {
    const englishText = document.getElementById("english-text");
    let morseArray = "";
    let english = "";

    // Trim the morse code text for excess white spaces, if it's not empty split it into an array
    if (morseCodeText.value.trim().length > 0) {
        morseArray = morseCodeText.value.trim().split(" ");
    }
    
    for(let i = 0; i < morseArray.length; i++) {
        english += getKeyByValue(morseDictionary, morseArray[i]);
    }
    englishText.value = english;
}

// Reference: https://www.geeksforgeeks.org/how-to-get-a-key-in-a-javascript-object-by-its-value/ (Number 5.)
// The object in this case is the dictionary, we use the value to get the key
function getKeyByValue(object, value) {
    // Get the array of object values
    const values = Object.values(object);

    // Target the index of the value in the values array
    const index = values.indexOf(value);

    // If there is an index, get the index of the key
    if (index !== -1) {
        // Get the array of object keys and return it
        const keys = Object.keys(object);
        return keys[index];
    }
    // If there is no index, return "#"
    return "#";
}

// English to Morse Dictionary
const morseDictionary = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    "_": "..--.-",
    "\"": ".-..-.",
    "$": "...-..-",
    "@": ".--.-.",
    " ": "/"
}

getText();