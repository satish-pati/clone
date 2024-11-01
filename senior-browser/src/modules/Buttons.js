
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

function toggleFeatures() {
    const buttonContainer = document.getElementById('feature-buttons');
    buttonContainer.style.display = buttonContainer.style.display === 'none' ? 'grid' : 'none';
}
function createMainButton() {
    const mainButton = document.createElement('button');
    mainButton.innerText = 'Accessibility';
    mainButton.id = 'main_button';
    styleButton(mainButton);

    mainButton.style.position = 'fixed';
    mainButton.style.top = '10px';
    mainButton.style.left = '10px';
    mainButton.style.zIndex = 10000;

    mainButton.addEventListener('click', toggleFeatures);

    document.body.appendChild(mainButton);
}
