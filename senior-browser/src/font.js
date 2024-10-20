function loadFontSettingsModal() {
    const modal = document.createElement('div');
    modal.id = 'fontSettingsModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '300px';
    modal.style.padding = '20px';
    modal.style.backgroundColor = '#fff';
    modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
    modal.style.zIndex = '10000';
    modal.style.borderRadius = '10px';

    // Font size input
    modal.innerHTML = `
        <h3>Adjust Font Settings</h3>
        <label>Font Size: </label><input type="number" id="fontSizeInput" value="16" min="8" max="72"><br><br>
        <label>Font Color: </label><input type="color" id="fontColorInput" value="#000000"><br><br>
        <label>Font Style: </label>
        <select id="fontStyleSelect">
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="bold">Bold</option>
        </select><br><br>
        <button id="applyFontSettings">Apply</button>
        <button id="closeModal">Close</button>
    `;

    document.body.appendChild(modal);

    // Event listeners for applying and closing modal
    document.getElementById('applyFontSettings').addEventListener('click', () => {
        const fontSize = document.getElementById('fontSizeInput').value;
        const fontColor = document.getElementById('fontColorInput').value;
        const fontStyle = document.getElementById('fontStyleSelect').value;
        applyFontSettings(fontSize, fontColor, fontStyle);
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Inject CSS to reset text styles across the page
function injectGlobalFontStyle(css) {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}

// Apply the font settings to the entire page
function applyFontSettings(fontSize, fontColor, fontStyle) {
    const elements = document.querySelectorAll('body *');
    elements.forEach(element => {
        element.style.fontSize = fontSize + 'px';
        element.style.color = fontColor;
        element.style.fontStyle = fontStyle === 'italic' ? 'italic' : 'normal';
        element.style.fontWeight = fontStyle === 'bold' ? 'bold' : 'normal';
    });
}
