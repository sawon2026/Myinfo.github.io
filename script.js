// SHADOW SYSTEM - SAWON.AWAKEN
// Elite System Interface

class ShadowSystem {
    constructor() {
        this.init();
    }

    init() {
        // Initialize system
        this.currentPanel = 'status';
        this.systemTheme = 'shadow';
        this.animationIntensity = 75;
        this.isInitialized = false;
        
        // Start boot sequence
        this.startBootSequence();
        
        // Initialize event listeners
        this.setupEventListeners();
        
        // Initialize animations
        this.initAnimations();
        
        // Initialize system controls
        this.initControls();
    }

    startBootSequence() {
        // Show terminal lines with delays
        const terminalLines = document.querySelectorAll('.terminal-line');
        
        terminalLines.forEach((line, index) => {
            const delay = parseInt(line.getAttribute('data-delay'));
            
            setTimeout(() => {
                line.classList.add('visible');
                
                // Add glitch effect for identification line
                if (line.classList.contains('glitch-text')) {
                    setTimeout(() => {
                        const identText = line.querySelector('.ident-text');
                        identText.textContent = 'SAWON';
                        identText.style.color = 'var(--color-accent)';
                        this.createGlitchEffect(identText, 300);
                    }, 500);
                }
                
                // Show awakening message after last line
                if (index === terminalLines.length - 1) {
                    setTimeout(() => {
                        this.showAwakeningMessage();
                        this.isInitialized = true;
                    }, 1000);
                }
            }, delay);
        });
    }

    showAwakeningMessage() {
        const awakeningMessage = document.querySelector('.awakening-message');
        awakeningMessage.style.opacity = '1';
        
        // Add subtle glitch effect to name
        setTimeout(() => {
            const nameLine = document.getElementById('awakening-line-1');
            this.createGlitchEffect(nameLine, 150);
        }, 7000);
    }

    createGlitchEffect(element, duration) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let interval = setInterval(() => {
            // Create glitched text
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.7) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
        }, 50);
        
        // Restore original text
        setTimeout(() => {
            clearInterval(interval);
            element.textContent = originalText;
            
            // Add final flicker
            let opacity = 1;
            let flickerCount = 0;
            const flickerInterval = setInterval(() => {
                element.style.opacity = opacity;
                opacity = opacity === 1 ? 0.3 : 1;
                flickerCount++;
                
                if (flickerCount >= 3) {
                    clearInterval(flickerInterval);
                    element.style.opacity = 1;
                }
            }, 100);
        }, duration);
    }

    setupEventListeners() {
        // Navigation commands
        document.querySelectorAll('.system-command').forEach(command => {
            command.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                this.switchPanel(target);
                this.updateActiveCommand(e.currentTarget);
            });
        });

        // Control options
        document.querySelectorAll('.control-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.getAttribute('data-theme');
                this.changeTheme(theme);
                this.updateActiveControl(e.currentTarget);
            });
        });

        // Slider control
        const sliderThumb = document.querySelector('.slider-thumb');
        const sliderTrack = document.querySelector('.slider-track');
        
        if (sliderThumb && sliderTrack) {
            let isDragging = false;
            
            sliderThumb.addEventListener('mousedown', () => {
                isDragging = true;
                document.addEventListener('mousemove', handleDrag);
                document.addEventListener('mouseup', () => {
                    isDragging = false;
                    document.removeEventListener('mousemove', handleDrag);
                });
            });
            
            const handleDrag = (e) => {
                if (!isDragging) return;
                
                const trackRect = sliderTrack.getBoundingClientRect();
                let position = (e.clientX - trackRect.left) / trackRect.width;
                position = Math.max(0, Math.min(1, position));
                
                const value = Math.round(position * 100);
                sliderThumb.style.left = `${position * 100}%`;
                sliderThumb.setAttribute('data-value', value);
                
                this.animationIntensity = value;
                this.updateAnimationIntensity();
            };
        }

        // Status indicators
        document.querySelectorAll('.status-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const wasActive = e.currentTarget.classList.contains('active');
                
                // Deactivate all indicators
                document.querySelectorAll('.status-indicator').forEach(ind => {
                    ind.classList.remove('active');
                });
                
                // Activate clicked one if it wasn't active
                if (!wasActive) {
                    e.currentTarget.classList.add('active');
                }
            });
        });

        // Skill item hover effects
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.createParticleEffect(item);
            });
        });

        // Scroll animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });

        // Window load animations
        window.addEventListener('load', () => {
            this.animateElementsOnLoad();
        });
    }

    switchPanel(panelId) {
        // Hide all panels
        document.querySelectorAll('.system-panel').forEach(panel => {
            panel.classList.remove('active');
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(30px)';
        });

        // Show selected panel
        const targetPanel = document.getElementById(`${panelId}-panel`);
        if (targetPanel) {
            setTimeout(() => {
                targetPanel.classList.add('active');
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
                
                // Add entrance effect
                this.createPanelEntranceEffect(targetPanel);
                
                // Update current panel
                this.currentPanel = panelId;
                
                // Scroll to panel
                targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    updateActiveCommand(activeCommand) {
        document.querySelectorAll('.system-command').forEach(command => {
            command.classList.remove('active');
        });
        activeCommand.classList.add('active');
    }

    createPanelEntranceEffect(panel) {
        // Add scan line effect
        const scanLine = document.createElement('div');
        scanLine.className = 'panel-scan-line';
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
            animation: scan 0.5s ease;
            z-index: 1;
        `;
        
        panel.appendChild(scanLine);
        
        setTimeout(() => {
            scanLine.remove();
        }, 500);
    }

    changeTheme(theme) {
        this.systemTheme = theme;
        
        // Update CSS variables based on theme
        const root = document.documentElement;
        
        switch(theme) {
            case 'neon':
                root.style.setProperty('--color-accent', '#ff00ff');
                root.style.setProperty('--color-accent-secondary', '#00ffff');
                break;
            case 'monochrome':
                root.style.setProperty('--color-accent', '#ffffff');
                root.style.setProperty('--color-accent-secondary', '#888888');
                break;
            case 'shadow':
            default:
                root.style.setProperty('--color-accent', '#00f3ff');
                root.style.setProperty('--color-accent-secondary', '#9d00ff');
                break;
        }
    }

    updateActiveControl(activeControl) {
        document.querySelectorAll('.control-option').forEach(control => {
            control.classList.remove('active');
        });
        activeControl.classList.add('active');
    }

    updateAnimationIntensity() {
        // Update animation speeds based on intensity
        const intensity = this.animationIntensity / 100;
        
        document.querySelectorAll('.level-fill, .mastery-fill, .progress-fill').forEach(fill => {
            const level = fill.getAttribute('data-level') || 
                         fill.getAttribute('data-mastery') || 
                         fill.getAttribute('data-progress');
            
            if (level) {
                // Animate fill with intensity-based speed
                fill.style.transition = `width ${1.5 * intensity}s ease`;
                setTimeout(() => {
                    fill.style.width = `${level}%`;
                }, 100);
            }
        });
    }

    createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: var(--color-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                opacity: 0.8;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                { transform: 'translate(0, 0)', opacity: 0.8 },
                { transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }

    initAnimations() {
        // Animate level bars on load
        setTimeout(() => {
            this.animateProgressBars();
        }, 8000);
        
        // Random system glitches
        this.initRandomGlitches();
        
        // Subtle hover animations
        this.initHoverAnimations();
    }

    animateProgressBars() {
        document.querySelectorAll('.level-fill').forEach(fill => {
            const level = fill.getAttribute('data-level');
            if (level) {
                setTimeout(() => {
                    fill.style.width = `${level}%`;
                }, Math.random() * 500);
            }
        });
        
        document.querySelectorAll('.mastery-fill').forEach(fill => {
            const mastery = fill.getAttribute('data-mastery');
            if (mastery) {
                setTimeout(() => {
                    fill.style.width = `${mastery}%`;
                }, Math.random() * 500 + 300);
            }
        });
        
        document.querySelectorAll('.progress-fill').forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            if (progress) {
                setTimeout(() => {
                    fill.style.width = `${progress}%`;
                }, Math.random() * 500 + 600);
            }
        });
    }

    initRandomGlitches() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                const elements = document.querySelectorAll('.system-command, .status-value, .skill-name');
                if (elements.length > 0) {
                    const randomElement = elements[Math.floor(Math.random() * elements.length)];
                    this.createGlitchEffect(randomElement, 100);
                }
            }
        }, 10000);
    }

    initHoverAnimations() {
        // Add hover effect to status cards
        document.querySelectorAll('.status-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.status-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.status-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }

    handleScrollAnimations() {
        // Implement parallax or scroll-based effects
        const scrollY = window.scrollY;
        const scrollFactor = scrollY / 1000;
        
        // Adjust grid overlay opacity based on scroll
        const gridOverlay = document.querySelector('.grid-overlay');
        if (gridOverlay) {
            gridOverlay.style.opacity = 0.2 + (scrollFactor * 0.3);
        }
        
        // Subtle panel scale on scroll
        document.querySelectorAll('.system-panel').forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
                const distanceFromCenter = Math.abs(rect.top + rect.height/2 - viewportHeight/2);
                const scale = 1 - (distanceFromCenter / viewportHeight) * 0.1;
                
                panel.style.transform = `translateY(0) scale(${scale})`;
                panel.style.transition = 'transform 0.5s ease';
            }
        });
    }

    animateElementsOnLoad() {
        // Animate system nav with staggered delay
        document.querySelectorAll('.system-command').forEach((command, index) => {
            setTimeout(() => {
                command.style.opacity = '1';
                command.style.transform = 'translateY(0)';
            }, 7000 + (index * 100));
        });
        
        // Animate first panel
        setTimeout(() => {
            const statusPanel = document.getElementById('status-panel');
            if (statusPanel) {
                statusPanel.classList.add('active');
                this.createPanelEntranceEffect(statusPanel);
            }
        }, 7500);
    }

    initControls() {
        // Initialize control states
        this.updateAnimationIntensity();
        
        // Set initial theme
        const initialTheme = document.querySelector('.control-option.active');
        if (initialTheme) {
            this.changeTheme(initialTheme.getAttribute('data-theme'));
        }
    }
}

// Initialize Shadow System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and initialize the system
    window.shadowSystem = new ShadowSystem();
    
    // Add CSS for dynamic animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scan {
            0% {
                top: 0;
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                top: 100%;
                opacity: 0;
            }
        }
        
        .panel-scan-line {
            animation: scan 0.5s ease;
        }
        
        .system-command {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .system-command.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .control-option, .status-indicator {
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .control-option:hover, .status-indicator:hover {
            opacity: 1;
        }
        
        .status-card, .skill-item, .preference-module {
            transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .language-item {
            transition: transform 0.2s ease, border-color 0.2s ease;
        }
        
        .particle {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // Add system heartbeat effect
    setInterval(() => {
        if (Math.random() > 0.8) {
            const systemFooter = document.querySelector('.system-footer');
            if (systemFooter) {
                systemFooter.style.textShadow = '0 0 10px var(--color-accent)';
                setTimeout(() => {
                    systemFooter.style.textShadow = 'none';
                }, 100);
            }
        }
    }, 3000);
});