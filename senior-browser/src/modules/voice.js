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
    toggleButton.addEventListener("click",() =>{
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
    }else{
        toggleButton.textContent = "Start Listening";
        toggleButton.style.backgroundColor = "green";
    }
}