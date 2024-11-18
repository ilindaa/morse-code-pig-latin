// Click to Toggle Dark/Light Mode
(function startToggle() {
    const toggle = document.getElementById("toggle");
    toggle.addEventListener("click", toggleDarkMode);
})();

function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const toggleText = document.getElementById("toggle-label");

    if (htmlElement.getAttribute("data-bs-theme") == "dark") {
        htmlElement.setAttribute("data-bs-theme", "light");
        toggleText.textContent = "🔆";
    } else {
        htmlElement.setAttribute("data-bs-theme", "dark");
        toggleText.textContent = "🌙";
    }
}

// Click to go back to the top of the page
(function backToTop() {
    const topBtn = document.querySelector(".top-btn");
    topBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    });
})();

// Gets the text in each text area box and adds an event listener to each
(function getText() {
    const englishText = document.getElementById("english-text");
    const morseCodeText = document.getElementById("morse-code-text");
    const pigLatinText = document.getElementById("pig-latin-text");

    englishText.addEventListener("input", englishTranslations.bind(null, englishText));
    morseCodeText.addEventListener("input", morseCodeTranslations.bind(null, morseCodeText, englishText));
    pigLatinText.addEventListener("input", pigLatinTranslations.bind(null, pigLatinText, englishText));
})();

// Function for Event Listeners
function englishTranslations(englishText) {
    englishToMorse(englishText);
    englishToPigLatin(englishText);
}

function morseCodeTranslations(morseCodeText, englishText) {
    morseToEnglish(morseCodeText);
    englishToPigLatin(englishText);
}

function pigLatinTranslations(pigLatinText, englishText) {
    pigLatinToEnglish(pigLatinText);
    englishToMorse(englishText);
}

// TRANSLATIONS BELOW
// Todo: English to Pig Latin using punctuations/symbols and capitalization
// Todo: Pig Latin to English "AY" and consonants
function englishToPigLatin(englishText) {
    const pigLatinText = document.getElementById("pig-latin-text");
    let word = "";
    let wordArray = "";
    let pig = "";
    let vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];

    // Trim the text for excess white space
    if (englishText.value.trim().length > 0) {
        word = englishText.value.trim();
        wordArray = word.split(" ");
    }

    console.log(wordArray);
    console.log(wordArray.length);

    // Loop through all of the words
    for (let i = 0; i < wordArray.length; i++) {
        // Set the current word to be the word looped in the wordArray
        let currentWord = wordArray[i];
        // Check if the first letter of the word starts with a vowel, if it does - keep the word and add "way" at the end
        if (vowels.includes(currentWord[0])) {
            let suffix = isSuffixCapitalized(currentWord, "WAY ");
            pig += wordArray[i] + suffix;
        } else { // Else find the first vowel in the string, move the consonants before it to the end and add "ay" at the end
            let vowelIndex = -1;
            for (let j = 0; j < currentWord.length; j++) {
                // If a vowel is found, move consonants, and break out of loop
                if (vowels.includes(currentWord[j])) {
                    let suffix = isSuffixCapitalized(currentWord, "AY ");
                    vowelIndex = j;
                    pig += currentWord.slice(vowelIndex) + currentWord.slice(0, vowelIndex) + suffix;
                    break;
                }
            }
        }
    }

    pigLatinText.value = pig.trim();
}

// Check if the suffix should be capitalized based on the last character's capitalization and return it
function isSuffixCapitalized(currentWord, str) {
    const lastLetter = currentWord[currentWord.length - 1];
    if (lastLetter === lastLetter.toUpperCase()) {
        return str.toUpperCase();
    } else {
        return str.toLowerCase();
    }
}

function pigLatinToEnglish(pigLatinText) {
    const englishText = document.getElementById("english-text");
    let pigArray = "";
    let english = "";

    // Trim the pig latin text for excess white spaces, if it's not empty split it into an array
    if (pigLatinText.value.trim().length > 0) {
        pigArray = pigLatinText.value.trim().toUpperCase().split(" ");
    }

    console.log(pigArray);

    // Check the index for "WAY" or "AY" (if greater than -1 then it exists) and get the index(es) before it, slice the "WAY" or "AY" and move consonants if applicable
    for (let i = 0; i < pigArray.length; i++) {
        if (pigArray[i].indexOf("WAY") > -1) {
            english += pigArray[i].slice(0, pigArray[i].indexOf("WAY"));
        } else if (pigArray[i].indexOf("AY") > -1) {
            const pigWordNoAy = pigArray[i].slice(0, pigArray[i].indexOf("AY"));
            console.log(pigWordNoAy);
            const pigWordNoAyLength = pigWordNoAy.length;
            console.log(pigWordNoAyLength);
            // Get consonant clusters and move them back to the front
        } else {
            english += "# ";
            continue;
        }
    }

    englishText.value = english.trim();
}

// Loop through the capitalized English word(s) and if it's in the dictionary, translate it else put a #; add a space at the end and set the morse code text
function englishToMorse(englishText) {
    const morseCodeText = document.getElementById("morse-code-text");
    let word = "";
    let morse = "";

    // Trim the text for excess white space and capitalize it
    word = englishText.value.trim().toUpperCase();

    for (let i = 0; i < word.length; i++) {
        morse += (morseDictionary[word[i]] || "#") + " ";
    }

    morseCodeText.value = morse.trim();
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
    
    for (let i = 0; i < morseArray.length; i++) {
        english += getKeyByValue(morseDictionary, morseArray[i]);
    }

    englishText.value = english.trim();
}

// Reference: https://www.geeksforgeeks.org/how-to-get-a-key-in-a-javascript-object-by-its-value/ (Code in Number 5.)
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