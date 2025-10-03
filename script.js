let statusMode = 0;

function getStatusByTime() {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const mdtHour = (utcHour - 6 + 24) % 24;

    if (mdtHour >= 12 || mdtHour < 8) {
        return { text: "Sleeping", color: "#747f8d" };
    }
    return { text: "Awake", color: "#43b581" };
}

function getStatus() {
    if (statusMode === 1) return { text: "Sleeping", color: "#747f8d" };
    if (statusMode === 2) return { text: "Awake", color: "#43b581" };
    if (statusMode === 3) return { text: "Awake", color: "#f04747" };
    return getStatusByTime();
}

function profileClick() {
    const avatarContainer = document.getElementById('avatarContainer');
    const statusCircle = document.getElementById('statusCircle');

    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '18px';
    ripple.style.height = '18px';
    ripple.style.bottom = '-4px';
    ripple.style.right = '-4px';
    ripple.style.border = '2px solid rgba(255,255,255,0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    const rippleStyle = document.createElement('style');
    rippleStyle.innerHTML = `
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    avatarContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    statusCircle.classList.add('clicked');
    setTimeout(() => statusCircle.classList.remove('clicked'), 600);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        if (i % 7 === 0) particle.style.animationDirection = 'reverse';
        if (i % 11 === 0) particle.style.animationTimingFunction = 'ease-out';

        particlesContainer.appendChild(particle);
    }
}

function loadProfile() {
    const status = getStatus();

    document.getElementById("avatar").src = "https://i.ibb.co/b54ZcdBK/lll.webp";
    document.getElementById("username").innerHTML = "@xpert";
    document.getElementById("handle").innerHTML = "Founder of lost c2";

    document.getElementById("activityStatus").innerHTML = `
        <div class="no-activity">
            <div class="no-activity-text">${status.text}</div>
        </div>
    `;

    document.getElementById("statusCircle").style.backgroundColor = status.color;
}

window.addEventListener("load", () => {
    loadProfile();
    createParticles();
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
    }, 1000);
    setInterval(loadProfile, 1000);
});
