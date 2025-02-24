// Theme Management
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    
    // Update active state in theme modal
    const themeButtons = document.querySelectorAll('.theme-option');
    themeButtons.forEach(button => {
        if (button.getAttribute('data-theme') === savedTheme) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    
    // Add click handlers for theme buttons
    const themeButtons = document.querySelectorAll('.theme-option');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            setTheme(theme);
            
            // Close modal after selection (optional)
            const modal = document.getElementById('themeModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        });
    });
});

// Optional: Add theme-specific CSS variables
const themeColors = {
    light: {
        background: '#ffffff',
        text: '#212529',
        primary: '#007bff'
    },
    dark: {
        background: '#343a40',
        text: '#ffffff',
        primary: '#007bff'
    },
    // Add other theme colors as needed
};

function applyThemeColors(theme) {
    const colors = themeColors[theme];
    if (colors) {
        const root = document.documentElement;
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
}

// Particle effect configuration
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 200,
        color: '#ffffff',
        opacity: 0.5,
        width: 1
      },
      move: {
        enable: true,
        speed: 8,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 1000,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 5
        }
      }
    },
    retina_detect: true
  });
});

// Text shattering effect
document.addEventListener('DOMContentLoaded', function() {
  const text = document.querySelector('.shatter-text');
  if (!text) return;

  // Create fragments
  const originalText = text.dataset.value;
  text.innerHTML = originalText.split('').map(char => 
    `<span class="char" style="display: inline-block; transform-origin: center;">${char}</span>`
  ).join('');

  const characters = text.querySelectorAll('.char');
  let isAnimating = false;
  let timeoutId = null;

  // Shatter animation
  function shatterText(e) {
    if (isAnimating) return;
    isAnimating = true;

    const rect = text.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    anime({
      targets: '.char',
      translateX: function(el, i) {
        const charRect = el.getBoundingClientRect();
        const charX = charRect.left - rect.left + charRect.width / 2;
        const distance = mouseX - charX;
        return (Math.random() - 0.5) * Math.abs(distance) * 2;
      },
      translateY: function(el, i) {
        const charRect = el.getBoundingClientRect();
        const charY = charRect.top - rect.top + charRect.height / 2;
        const distance = mouseY - charY;
        return (Math.random() - 0.5) * Math.abs(distance) * 2;
      },
      rotate: () => (Math.random() - 0.5) * 90,
      scale: () => 0.5 + Math.random(),
      duration: 750,
      easing: 'easeOutExpo',
      complete: function() {
        // Reset after 1 seconds
        timeoutId = setTimeout(() => {
          anime({
            targets: '.char',
            translateX: 0,
            translateY: 0,
            rotate: 0,
            scale: 1,
            duration: 750,
            easing: 'easeInOutQuad',
            complete: function() {
              isAnimating = false;
            }
          });
        }, 1000);
      }
    });
  }
  

  // Add mouse move event listener
  text.addEventListener('mousemove', shatterText);
});
