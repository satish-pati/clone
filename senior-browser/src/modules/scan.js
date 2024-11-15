const API_KEY = "AIzaSyBkdme9ZDgSxCxuKlXZwZjPVlqCJoXGtiA"; // Replace this with your actual API key

// Function to check if the site uses HTTPS
function checkHTTPS(url) {
    const baseUrl = new URL(url);  // Create a URL object
    return baseUrl.protocol == "https:";  // Check the protocol
}

// Function to check website security using Safe Browsing API
async function checkWebsiteSecurity(url) {
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

    const body = {
        client: {
            clientId: "security_scanner_extension",
            clientVersion: "1.1"
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [
                { url: url }
            ]
        }
    };
    function toggleSecurityScan() {
        chrome.runtime.sendMessage({ action: 'opensecscan' });
    }
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const data = await response.json();
        return data.matches ? "unsafe" : "safe";
    } else {
        console.error("Failed to check the URL security:", response.statusText);
        return "error";
    }
}

document.getElementById("scanButton").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if the website uses HTTPS
    if (!checkHTTPS(tab.url)) {
        document.getElementById("status").innerText = "This website is safe!";
        document.getElementById("status").style.color = "green";
    } else {
      
        const securityStatus = await checkWebsiteSecurity(tab.url);

        if (securityStatus === "safe") {
            document.getElementById("status").innerText = "This website is safe!";
            document.getElementById("status").style.color = "green";
        } else if (securityStatus === "unsafe") {
            document.getElementById("status").innerText = "Warning: This website may be unsafe!";
            document.getElementById("status").style.color = "red";
        } else {
            document.getElementById("status").innerText = "This website is safe!";
            document.getElementById("status").style.color = "green";
        }
    }
});
