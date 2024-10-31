// content.js
const videoButton = document.createElement('button');
videoButton.innerText = 'Video Tutorials';
videoButton.style.position = 'fixed';
videoButton.style.bottom = '20px';
videoButton.style.right = '20px';
videoButton.style.padding = '10px 20px';
videoButton.style.backgroundColor = '#4CAF50';
videoButton.style.color = 'white';
videoButton.style.border = 'none';
videoButton.style.cursor = 'pointer';
document.body.appendChild(videoButton);

videoButton.addEventListener('click', async function () {
    try {
        const response = await fetch('http://localhost:3000/videos');
        const videos = await response.json();

        if (videos && videos.length > 0) {
            if (!window.location.href.includes('google.com')) {
                showVideoModal(videos);
            } else {
               //window.location.href = '/video.html'
               // chrome.tabs.create({ url: chrome.runtime.getURL("src/video.html") });
               showVideoModal(videos);
            }
        } else {
            alert('No videos found.');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        chrome.runtime.sendMessage({ action: "openVideoPage" });
        console.error("Message error:", chrome.runtime.lastError.message);


    }
});

function showVideoModal(videos) {
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '600px';
    modalContent.style.textAlign = 'center';

    const closeModalBtn = document.createElement('button');
    closeModalBtn.innerText = 'Close';
    closeModalBtn.style.marginTop = '20px';
    closeModalBtn.style.padding = '10px 20px';
    closeModalBtn.addEventListener('click', () => {
        modal.remove();
    });

    const videoList = document.createElement('ul');
    videoList.style.listStyle = 'none';

    videos.forEach(video => {
        const videoItem = document.createElement('li');
        videoItem.innerText = video.title;
        videoItem.style.cursor = 'pointer';
        videoItem.style.marginBottom = '10px';

        videoItem.addEventListener('click', () => {
            const videoPlayer = document.createElement('video');
            videoPlayer.src = video.url;
            videoPlayer.controls = true;
            videoPlayer.style.width = '100%';
            modalContent.innerHTML = '';
            modalContent.appendChild(videoPlayer);
            modalContent.appendChild(closeModalBtn);
            videoPlayer.play();
        });

        videoList.appendChild(videoItem);
    });

    modalContent.appendChild(videoList);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}