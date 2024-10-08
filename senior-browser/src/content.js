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

    const startButton = createButtonWithImage('Start Video', 'start_video', '/src/images/Start.png');
    const stopButton = createButtonWithImage('Stop Video', 'stop_video', 'images/Stop.png', true);
    const zoomInButton = createButtonWithImage('Zoom In', null, 'images/Zoom-in.png');
    const zoomOutButton = createButtonWithImage('Zoom Out', null, 'images/zoom-out-icon-png-0.png');
    const contrastIncreaseButton = createButtonWithImage('Increase Contrast', null, 'Start.png');
    const contrastDecreaseButton = createButtonWithImage('Decrease Contrast', null, 'images/Stop.png');
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

    if (imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc; 
        img.style.width = '40px'; 
        img.style.height = '40px';
        img.style.marginBottom = '5px'; 
        button.appendChild(img);
    }

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
