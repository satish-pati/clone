let recognition;
let isListening = false;
//Taking sppech from the Windows default Speech recogniser
function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) 
    {
        console.error("Speech recognition is'nt supported by this browser.");
        return;
    }
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';// Here we are selecting English for now we will develop for Indian languages also
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onstart = () => 
    {
        console.log("Voice recognition has started.");
        toggleButton(true);
    };
    recognition.onresult = (event) => 
    {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('Recognized:', transcript);
        handleVoiceCommand(transcript);
    };
    recognition.onerror = (event) => 
    {
        console.error("Recognition error:", event.error);
        stopVoiceRecognition();
    };
    recognition.onend = () => 
    {
        console.log("Voice recognition has ended.");
        toggleButton(false);
    };
    recognition.start();
}
function stopVoiceRecognition()// To stop the voice Recognition 
{
    if (recognition) 
    {
        recognition.stop();
        console.log("Voice recognition is stopped by the user.");
        toggleButton(false);
    }
}
function handleVoiceCommand(command)// The inbuilt commands which will work
{
    if (command.includes('scroll down')) 
    {
        window.scrollBy(0, 500);
    } 
    else if (command.includes('scroll up')) 
    {
        window.scrollBy(0, -500);
    } 
    else if (command.includes('go back')) 
    {
        window.history.back();
    } 
    else if (command.includes('go forward'))
    {
        window.history.forward();
    }
    else if (command.includes('scroll to end')) 
    {
        window.scrollTo(0, document.body.scrollHeight);
    } 
    else if (command.includes('scroll to top')) 
    {
        window.scrollTo(0, 0);
    } 
    else if (command.includes('stop listening')) 
    {
        stopVoiceRecognition();
        isListening = false;
    }
    else if (command.includes('new tab')) 
    {
        window.open('https://www.google.com/', '_blank');
    }
    else if (command.includes('open youtube')) 
    {
        window.open('https://www.youtube.com/');
    } 
    else if (command.includes('open facebook'))
    {
        window.open('https://www.facebook.com/');
    }
    else 
    {
        console.log("Unrecognized command:", command);
    }
}
function injectButton() // For the start and stop buttons 
{
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleBtn1";
    toggleButton.textContent = "Start Listening";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "50px";
    toggleButton.style.right = "50px";
    toggleButton.style.zIndex = 10000;
    toggleButton.style.padding = "10px";
    toggleButton.style.backgroundColor = "green";
    toggleButton.style.color = "white";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "5px";
    toggleButton.style.cursor = "pointer";
    document.body.appendChild(toggleButton);
    toggleButton.addEventListener("click", () => {
        //Action Listener for click to start and stop respectively
        if (!isListening) 
        {
            startVoiceRecognition();
            isListening = true;
        } else 
        {
            stopVoiceRecognition();
            isListening = false;
        }
    });
}
function toggleButton(listening) 
{
    const toggleButton = document.getElementById("toggleBtn1");
    if (listening) {
        toggleButton.textContent = "Stop Listening";
        toggleButton.style.backgroundColor = "red";
    }else {
        toggleButton.textContent = "Start Listening";
        toggleButton.style.backgroundColor = "green";
    }
}//To change the button color and text on clicking
injectButton();
// List of negative words
const Words = [
    "abuse", "accident", "aging", "alone", "anxiety", "apocalypse", "bad",
    "bankruptcy", "battle", "betrayal", "crisis", "death", "despair", "disaster",
    "divorce", "doom", "doubt", "fear", "fired", "fraud", "gloom", "grief", "hate",
    "hopeless", "injury", "isolation", "jeopardy", "loss", "murder", "neglect",
    "pain", "panic", "paranoia", "regret", "riot", "robbery", "sad", "scam",
    "scandal", "stress", "struggle", "suffering", "suicide", "terror", "tragedy",
    "violence", "war", "worry", "end of the world", "catastrophic event",
    "health crisis", "loneliness epidemic", "negative impact", "social isolation",
    "mental breakdown", "financial ruin", "heartbreak", "unemployment rate rises",



    "recession", "inflation", "debt crisis", "stock market crash", "economic collapse", 
    "job cuts", "layoffs", "corruption", "political unrest", "protests", 
    "civil war", "coup", "sanctions", "government collapse", "oppression", 
    "discrimination", "hate crime", "genocide", "human trafficking", "war crime", 
    "famine", "drought", "refugee crisis", "displacement", "forced migration","raped","attack",

    
     "global warming", "natural disaster", "earthquake", "tsunami", 
    "flood", "hurricane", "wildfire", "volcanic eruption", "oil spill", 
    "deforestation", "biodiversity loss", "extinction", "habitat destruction", 
    "pollution", "ozone depletion", "acid rain", "environmental degradation", 
    "melting glaciers", "rising sea levels", "water scarcity", "fossil fuel dependency","crime",
    
    "pandemic", "epidemic", "outbreak", "disease", "infection", "virus", "cancer", 
    "cholera", "Ebola", "HIV", "AIDS", "malaria", "influenza", "fever", 
    "chronic illness", "mental illness", "depression", "PTSD", "self-harm", 
    "overdose", "substance abuse", "addiction", "drug trafficking", "alcoholism", 
    "obesity crisis", "malnutrition", "public health emergency", "healthcare crisis",
    
    
    "poverty", "homelessness", "income inequality", "racial injustice", 
    "gender inequality", "child labor", "domestic violence", "sexual harassment", 
    "slavery", "mass incarceration", "police brutality", "displacement", 
    "refugee camps", "detention centers", "broken justice system", 
    "youth unemployment", "crime wave", "gun violence", "school shootings", 
    "assault", "sexual assault", "terrorism", "radicalization", "human rights violations",
    
    "desperation", "hopelessness", "frustration", "helplessness", "rejection", 
    "loneliness", "worthlessness", "despondency", "shame", "guilt", "misery", 
    "anguish", "grief", "sorrow", "self-doubt", "insecurity", "abandonment", 
    "breakdown", "emotional turmoil", "trauma", "post-traumatic stress", 
    "fear of failure", "low self-esteem", "identity crisis", "existential crisis",
    
    "arms race", "military conflict", "bombing", "airstrike", "missile attack", 
    "occupation", "invasion", "terror cell", "genocide", "nuclear war", 
    "chemical attack", "biological weapons", "massacre", "hostage situation", 
    "insurgency", "guerilla warfare", "siege", "peace talks fail", "refugee exodus",
    
    "cancel culture", "outrage", "online backlash", "doxxing", "public shaming", 
    "social media addiction", "echo chamber", "polarization", "fake accounts", 
    "online scam", "hate speech", "trolling", "misrepresentation", "division", 
    "mob mentality", "toxic community", "deplatforming","dead","killed",

    "aging", "dementia", "Alzheimer's", "arthritis", "osteoporosis", "chronic illness", 
    "heart disease", "stroke", "diabetes", "cancer", "hypertension", "hearing loss", 
    "vision loss", "depression", "mental illness", "anxiety", "chronic pain", 
    "disability", "mobility issues", "frailty", "falls", "injury", "isolation", 
    "loneliness epidemic", "neglect", "elder abuse", "hospitalization", "nursing home abuse", 
    "end-of-life care", "hospice", "terminal illness", "memory loss", "cognitive decline", 
    "disorientation", "confusion", "dependence on others", "bedridden", 
    "long-term care", "limited mobility", "loss of autonomy", "caregiver stress", 
    "healthcare crisis", "medication dependency", "elderly neglect", "infection risk", 
    
    "loneliness", "social isolation", "loss of friends", "death of spouse", "grief", 
    "bereavement", "family estrangement", "lack of community support", "ageism", 
    "discrimination against elderly", "feeling of abandonment", "worthlessness", 
    "helplessness", "low self-esteem", "emotional turmoil", "depression in old age", 
    "feeling forgotten", "fear of death", "fear of burdening others", "existential crisis", 

    "murder", "homicide", "stabbing", "shooting", "gun violence", "school shootings", 
    "mass shooting", "terrorism", "terrorist attack", "bombing", "explosion", 
    "car accident", "hit-and-run", "fatal accident", "road rage", "armed robbery", 
    "burglary", "assault", "sexual assault", "physical abuse", "domestic violence", 
    "rape", "kidnapping", "abduction", "human trafficking", "gang violence", 
    "organized crime", "drug cartel", "smuggling", "police brutality", "riot", 
    "civil unrest", "looting", "vandalism", "arson", "destruction of property", 
    "massacre", "genocide", "hate crime", "racial violence", "lynching", "hate group", 
    "violent protests", "civil war", "military conflict", "airstrike", "missile attack", 
    "bioterrorism", "chemical attack", "hostage situation", "public shooting", 
    "domestic terrorism", "vehicular assault", "drive-by shooting", "violent robbery", 
    "gang-related violence", "terror plot", "deadly force", "brutal attack", 
    "knife crime", "explosive device", "terror cell", "war crime", "atrocity", 
    "street violence", "random attack", "mob violence", "death toll", "gruesome murder", 
    "violent death", "assassination", "execution", "mugging", "home invasion", 
    "neighborhood shooting", "plane crash", "train derailment", "industrial accident", 
    "workplace violence", "mass casualty", "armed conflict","attack" ,"murderer",
];
// Initialize zoom and contrast values for page manipulation
// Function to hide negative content based on the predefined negative words
function hideNegContent() {
        // Select various elements that may contain negative information

  const results = document.querySelectorAll('.n0jPhd.ynAwRc.tNxQIb.nDgy9d, .SoAPf, .GI74Re.nDgy9d, .N54PNb,.N54PNb,article, h3, h4, h5, h6, .xrnccd, .VDXfz, .ZINbbc'); 
    results.forEach(res => {
        let hasNegWords = Words.some(word => {
            const regx = new RegExp(`\\b${word}\\b`, 'gi');// Create a regex for the word
            return regx.test(res.innerText);// Test if the word is in the element's text
        });
        if (hasNegWords) {// If negative words are found
            const prevtext = res.innerHTML;// Store the original content
            res.innerHTML = `
                <div class="negtextbox">
                  <strong>Website:</strong> <a href="${window.location.href}" target="_blank">${document.title}</a><br>
                    <span>This content may contain negative information.</span><br>
                    <button class="showcontent">Show Content</button>
                </div>`;
                // Add an event listener to the button to show the original content
     res.querySelector('.showcontent').addEventListener('click', function () {
                res.innerHTML = prevtext ; // Restore original content
            });
            res.classList.add('negative-content-processed');//processed neg text
        }
    });
}
// Create and append CSS styles for the page
const styleboxes = document.createElement('style');
styleboxes.innerHTML = `
    body {
        background-color: #f0f8ff; 
        font-family: Arial, sans-serif;
        color: #333; 
    }
    .negtextbox {
        background-color: white;
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        font-size: 1.1em;
        color: #555;
        margin: 10px 0;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .negtextbox button {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #add8e6;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    .negtextbox button:hover {
        background-color: #87ceeb;
    }
    .postivetext {
        text-align: center;
        padding: 10px;
        font-size: 1.5em;
        color: #add8e6;
    }
`;
document.head.appendChild(styleboxes);
const positiveMsg = document.createElement('div');
positiveMsg.className = 'postivetext';
document.body.prepend(positiveMsg);
window.onload = hideNegContent;
// Function to check if a text contains any negative words

const containsNegtext = (txt) => {
    return Words.some((word) => txt.toLowerCase().includes(word));
};
// Function to blur news articles that contain negative words
const blurNegnews = () =>{
    const headlines = document.querySelectorAll(".n0jPhd.ynAwRc.MBeuO.nDgy9d");
    const newsDescription = document.querySelectorAll(".GI74Re.nDgy9d");
    const result = document.querySelectorAll('.iHxmLe'); 
    const r3=document.querySelectorAll('.xe8e1b');
    const result2 = document.querySelectorAll('.KYaZsb');
    const topHeadlines = document.querySelectorAll(".n0jPhd.ynAwRc.tNxQIb.nDgy9d"); 
    const topDescription = document.querySelectorAll(".SoAPf"); 
    const allNewstext = [...headlines, ...newsDescription, ... topHeadlines, ...topDescription,...result,...result2,...r3];

    allNewstext.forEach((box) => {
        const newsText = box.innerText;
        if (containsNegtext(newsText)) {
            box.style.filter = "blur(8px)";
            box.style.transition = "filter 0.3s ease";
            const showButton = document.createElement("button");
            showButton.innerText = "Show Content";
            showButton.style.display = "block";
            showButton.style.margin = "10px auto";
            showButton.style.padding = "8px 16px";
            showButton.style.fontSize = "14px";
            showButton.style.cursor = "pointer";
            showButton.addEventListener("click", () => {
                box.style.filter = "none";  
                showButton.style.display = "none"; 
            });
            box.parentElement.appendChild(showButton); 
        }
    });
};
window.addEventListener('load', blurNegnews );
let isReading = false; // variable to track reading state

// Function to read the page content
function readPageContent() {
    const topStoriesSection = document.querySelectorAll(' article, h3, h4, h5, h6, .xrnccd, .VDXfz, .ZINbbc, .iHxmLe, .KYaZsb');
    let bodyText = '';

    topStoriesSection.forEach(section => {
        const hasNegativeWord = Words.some(word => {
            const regx = new RegExp(`\\b${word}\\b`, 'gi');

            return regx.test(section.innerText);
        });

        if (!section.style.filter.includes('blur') && !hasNegativeWord) {
            bodyText += section.innerText + ' ';
        }
    });

    if (bodyText.trim()) {
        const utterance = new SpeechSynthesisUtterance(bodyText);
        window.speechSynthesis.speak(utterance);
        isReading = true;
        button.textContent = 'Stop Reading';

        // When speech ends
        utterance.onend = () => {
            stopReading();
        };
    } else {
        alert("No content found to read that isn't blurred or negative.");
    }
}

function stopReading() {
    window.speechSynthesis.cancel(); 
    isReading = false; // Update state
    button.textContent = 'Read Content'; // Reset button text
}

// Button setup
const button = document.createElement('button');
button.textContent = 'Read Content';
button.style.position = 'fixed';
button.style.top = '10px';
button.style.right = '10px';
button.style.zIndex = '9999'; 
button.style.backgroundColor = '#4CAF50';
button.style.color = 'white';
button.style.border = 'none';
button.style.padding = '10px';
button.style.cursor = 'pointer';
button.style.borderRadius = '5px';
button.style.fontSize = '14px';
document.body.appendChild(button);

button.addEventListener('click', () => {
    if (isReading) {
        stopReading();
    } else {
        readPageContent();
    }
});

window.addEventListener('load', () => {
    document.body.appendChild(button);
});

let zoomFactor = 1.0;
let contrastValue = 1.0;
let mediaRecorder; 
let recordedChunks = [];

function changeBackgroundColor(color) {
    document.documentElement.style.setProperty('--bg-color', color); 
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            background-color: var(--bg-color) !important;
        }
    `;
    document.head.appendChild(style);
}

function zoomPage(factorChange) {
    zoomFactor += factorChange;
    document.body.style.zoom = zoomFactor;
}

function changeContrast(contrast) {
    document.body.style.filter = `contrast(${contrast})`;
}

function createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'feature-buttons'; 
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '50px'; 
    buttonContainer.style.left = '10px';
    buttonContainer.style.zIndex = 9999;
    buttonContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.borderRadius = '5px';
    buttonContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    buttonContainer.style.display = 'none'; 
    buttonContainer.style.display = 'grid';
    buttonContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    buttonContainer.style.gridGap = '10px';

    const startButton = createButtonWithImage('Start Video', 'start_video');
    const stopButton = createButtonWithImage('Stop Video', 'stop_video', true);
    const zoomInButton = createButtonWithImage('Zoom In', null);
    const zoomOutButton = createButtonWithImage('Zoom Out', null);
    const contrastIncreaseButton = createButtonWithImage('Increase Contrast', null);
    const contrastDecreaseButton = createButtonWithImage('Decrease Contrast', null);
    const bgColorInput = createButtonWithImage('Change BG Color', null, 'color.png', false, true);

    zoomInButton.addEventListener('click', () => zoomPage(0.1));
    zoomOutButton.addEventListener('click', () => zoomPage(-0.1));
    contrastIncreaseButton.addEventListener('click', () => {
        contrastValue += 0.1;
        changeContrast(contrastValue);
    });
    contrastDecreaseButton.addEventListener('click', () => {
        contrastValue = Math.max(0.5, contrastValue - 0.1);
        changeContrast(contrastValue);
    });

    bgColorInput.addEventListener('input', (event) => {
        const color = event.target.value;
        changeBackgroundColor(color);
    });

    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(stopButton);
    buttonContainer.appendChild(zoomInButton);
    buttonContainer.appendChild(zoomOutButton);
    buttonContainer.appendChild(contrastIncreaseButton);
    buttonContainer.appendChild(contrastDecreaseButton);
    buttonContainer.appendChild(bgColorInput);

    document.body.appendChild(buttonContainer);

    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
}
function createButtonWithImage(text, id, imageSrc, isDisabled = false, isInput = false) {
    const button = document.createElement('button');
    if (isInput) {
        button.style.padding = '0';
    }
    button.style.display = 'flex';
    button.style.flexDirection = 'column';
    button.style.alignItems = 'center';
    if (!isInput) {
        const span = document.createElement('span');
        span.innerText = text;
        button.appendChild(span);
        styleButton(button);
    } else {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        button.innerHTML = `<input type="color" style="width: 50px; height: 50px;">`;
    }

    if (id) button.id = id;
    if (isDisabled) button.disabled = true;
    return button;
}

function styleButton(button) {
    button.style.padding = '10px 15px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    button.style.color = 'white';

    if (button.id === 'start_video') {
        button.style.backgroundColor = '#28a745'; 
    } else if (button.id === 'stop_video') {
        button.style.backgroundColor = '#dc3545'; 
    }

    button.onmouseover = () => {
        button.style.opacity = '0.8';
    };
    button.onmouseout = () => {
        button.style.opacity = '1';
    };
}

function toggleFeatures() {
    const buttonContainer = document.getElementById('feature-buttons');
    buttonContainer.style.display = buttonContainer.style.display === 'none' ? 'grid' : 'none';
}

function createMainButton() {
    const mainButton = document.createElement('button');
    mainButton.innerText = 'Show Features';
    mainButton.id = 'main_button';
    styleButton(mainButton);

    mainButton.style.position = 'fixed';
    mainButton.style.top = '10px';
    mainButton.style.left = '10px';
    mainButton.style.zIndex = 10000;

    mainButton.addEventListener('click', toggleFeatures);

    document.body.appendChild(mainButton);
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recorded-video.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            recordedChunks = [];
        };

        mediaRecorder.start();
        document.getElementById('start_video').disabled = true;
        document.getElementById('stop_video').disabled = false;
    } catch (error) {
        console.error('Error starting recording:', error);
        alert('Could not start recording: ' + error.message);
    }
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('start_video').disabled = false;
    document.getElementById('stop_video').disabled = true;
}

window.addEventListener('load', () => {
    createMainButton();
    createButtons(); 
});



