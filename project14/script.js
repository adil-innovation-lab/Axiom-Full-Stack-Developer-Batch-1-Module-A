const toggleBtn = document.getElementById('toggle');
const customTextContainer = document.getElementById('custom-text');
const closeBtn = document.getElementById('close');
const voicesDropdown = document.getElementById('voices');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.getElementById('main');

const data = [
    // For Angry Image
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    // For Drink Image
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    // For Food Image
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    // For Grandma Image
    {
        image: './img/grandma.jpg',
        text: "I'm Miss Grandma"
    },
    // For Happy Image
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    // For Home Image
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    // For Hurt Image
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    // For Outside Image
    {
        image: './img/outside.jpg',
        text: "I like the outdoors"
    },
    // For Sad Image
    {
        image: './img/sad.jpg',
        text: "I don't like being sad"
    },
    // For Scared Image
    {
        image: './img/scared.jpg',
        text: "I'm scary"
    },
    // For School Image
    {
        image: './img/school.jpg',
        text: "Long time since I went to school"
    },
    // For Tired Image
    {
        image: './img/tired.jpg',
        text: "I'm so tired"
    },
];

// Array to save Web Speech API Voices
let voicesArray = [];

// Function to create UI elements for pre-defined text to speech
function createUIElement(predefinedObject) {
    const { image, text } = predefinedObject;
    // Create the DOM Element
    const div = document.createElement('div');
    // Apply CSS to the div
    div.classList.add('box');
    // Add HTML content in the div
    div.innerHTML = `
        <img src="${image}" alt=${text} />
        <p class="imageInfo">${text}</p>
    `;
    // Add event listener for the div
    div.addEventListener('click', () => {
        setText(text);
        speakText();
    });

    // Render in the UI
    main.appendChild(div);
};

// Initialize speech synth
const message = new SpeechSynthesisUtterance();

// Function to set text for speech
function setText(text) {
    message.text = text;
};

// Function for speaking the text
function speakText() {
    speechSynthesis.speak(message);
}

const speech = window.speechSynthesis;

// Function to fetch voices from Web Speech API
function fetchVoices() {
    if(speech.onvoiceschanged !== undefined) {
        speech.onvoiceschanged = () => renderVoices();
    }
};

// Function to fetch voices from Web Speech API
function renderVoices() {
	const voices = speech.getVoices(); // now should have an array of all voices
    // Get voices from speech synthesis get voices method
    voicesArray = voices;
    // Render voices in the dropdown
    voicesArray.forEach((voice) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} ${voice.lang}`;
        if ( voice.default ) {
            option.textContent += '(DEFAULT VOICE)';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voicesDropdown.appendChild(option);
    })
};

// Fetch voices on initial page load
fetchVoices();

// Run a loop on the data array to display the images in the UI
data.forEach(createUIElement);

// Event Listeners
// 1. Listen for click on the toggle button
toggleBtn.addEventListener('click', () => {
    // Show / Hide the custom text box when clicking the toggle button
    customTextContainer.classList.toggle('show');
})

// 2. Listen for click on the close button
closeBtn.addEventListener('click', () => {
    // Hide the custom text box when clicking the toggle button
    customTextContainer.classList.remove('show');
})

// 3. Listen for voiceschanged in the speechSynthesis
speechSynthesis.addEventListener('voiceschanged', fetchVoices);

// 4. Listen for click on readBtn
readBtn.addEventListener('click', () => {
    console.log(customText.value);
    setText(customText.value);
    speakText();
})