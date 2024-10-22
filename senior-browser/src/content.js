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
const button2 = document.createElement('button');
button2.id = 'fontSettingsBtn';
button2.innerText = 'Adjust Font Settings';
button2.style.position = 'fixed';
button2.style.top = '140px';
button2.style.right = '20px';
button2.style.padding = '10px 20px';
button2.style.fontSize = '16px';
button2.style.zIndex = '9999';
button2.style.backgroundColor = '#007bff';
button2.style.color = '#fff';
button2.style.border = 'none';
button2.style.borderRadius = '5px';
button2.style.cursor = 'pointer';
document.body.appendChild(button2);
// Load the font settings modal when the button is clicked
button2.addEventListener('click', () => {
    loadFontSettingsModal();
});
