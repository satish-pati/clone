
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
