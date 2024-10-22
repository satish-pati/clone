//import { setupReadButton } from './modules/ScreenReader.js'
//To change the button color and text on clicking
injectButton();
//  detox search is only applied when the toggle is ON
window.addEventListener('load', () => {
    if (isDetoxSearchOn) {
        blurNegnews();
        hideNegContent();
    }
});
window.addEventListener('load', () => {
    document.body.appendChild(button);
});
window.addEventListener('load', () => {
    createMainButton();
    createButtons(); 
});
// Inject the button for font settings
const button3 = document.createElement('button');
button3.id = 'fontSettingsBtn';
button3.innerText = 'Adjust Font Settings';
button3.style.position = 'fixed';
button3.style.top = '140px';
button3.style.right = '20px';
button3.style.padding = '10px 20px';
button3.style.fontSize = '16px';
button3.style.zIndex = '9999';
button3.style.backgroundColor = '#007bff';
button3.style.color = '#fff';
button3.style.border = 'none';
button3.style.borderRadius = '5px';
button3.style.cursor = 'pointer';
document.body.appendChild(button3);
// Load the font settings modal when the button is clicked
button2.addEventListener('click', () => {
    loadFontSettingsModal();
});
