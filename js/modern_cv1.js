/**
 * Modern CV Template
 * Animated skills and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DOM Elements ==========
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercentages = document.querySelectorAll('.skill-percent');
    const cvCard = document.getElementById('cvCard');
    
    // Skill data from HTML (could be loaded from JSON in production)
    const skillData = [
        { id: 'skill1Bar', percent: 95 },
        { id: 'skill2Bar', percent: 88 },
        { id: 'skill3Bar', percent: 92 },
        { id: 'skill4Bar', percent: 90 }
    ];
    
    // ========== Initialize ==========
    console.log('🚀 Modern CV Template initialized');
    initAnimations();
    attachEventListeners();
    
    // ========== Animation Functions ==========
    function initAnimations() {
        console.log('📊 Animating skill bars...');
        
        // Small delay for smoother page load
        setTimeout(() => {
            animateSkillBars();
        }, 300);
        
        // Fade in effect for the CV card
        if (cvCard) {
            cvCard.style.opacity = '0';
            cvCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cvCard.style.transition = 'all 0.6s ease';
                cvCard.style.opacity = '1';
                cvCard.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    /**
     * Animate skill bars from 0% to target percentage
     */
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            if (skillData[index]) {
                const targetPercent = skillData[index].percent;
                
                // Set the width with transition
                bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
                bar.style.width = targetPercent + '%';
                
                // Log animation
                console.log(`📈 Skill bar ${index + 1} animated to ${targetPercent}%`);
            }
        });
    }
    
    /**
     * Reset and replay animations (useful for tab visibility changes)
     */
    function replayAnimations() {
        // Reset skill bars to 0%
        skillBars.forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0%';
        });
        
        // Force reflow
        void skillBars[0].offsetWidth;
        
        // Re-animate
        setTimeout(() => {
            skillBars.forEach(bar => {
                bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
            });
            animateSkillBars();
        }, 50);
    }
    
    // ========== Event Listeners ==========
    function attachEventListeners() {
        
        // Hover effect on CV card
        if (cvCard) {
            cvCard.addEventListener('mouseenter', function() {
                console.log('👁️ CV card hovered');
            });
        }
        
        // Profile image hover effect
        const profileCircle = document.querySelector('.profile-circle');
        if (profileCircle) {
            profileCircle.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        }
        
        // Skill tag hover logging
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                console.log(`🏷️ Hovered skill: ${this.textContent}`);
            });
        });
        
        // Contact item hover logging
        const contactItems = document.querySelectorAll('.contact-list li');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                console.log(`📞 Contact item hovered`);
            });
        });
        
        // Experience item click (expand/collapse could be added later)
        const expItems = document.querySelectorAll('.experience-item');
        expItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Only trigger if not clicking a link/button
                if (!e.target.closest('a') && !e.target.closest('button')) {
                    this.style.transition = 'all 0.2s ease';
                    this.style.backgroundColor = '#f0f3f7';
                    
                    setTimeout(() => {
                        this.style.backgroundColor = '';
                    }, 200);
                    
                    console.log('📋 Experience item clicked');
                }
            });
        });
        
        // Replay animations when page becomes visible (if user switches tabs)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                console.log('👋 Page visible again, replaying animations');
                replayAnimations();
            }
        });
    }
    
    // ========== Data Loading Function (for future integration) ==========
    function loadCVData() {
        // This function would load data from localStorage or API
        console.log('📂 Loading CV data...');
        
        // Example of loading from localStorage (commented for now)
        /*
        try {
            const savedData = localStorage.getItem('cvBuilderData');
            if (savedData) {
                const data = JSON.parse(savedData);
                updateCVContent(data);
            }
        } catch (error) {
            console.error('Error loading CV data:', error);
        }
        */
    }
    
    /**
     * Update CV content with new data (for future integration)
     */
    function updateCVContent(data) {
        console.log('🔄 Updating CV content with new data:', data);
        // Implementation would update all text content
    }
    
    // ========== Print Handler ==========
    function handlePrint() {
        console.log('🖨️ Preparing CV for print...');
        
        // Ensure skill bars are visible in print
        skillBars.forEach(bar => {
            const width = bar.style.width;
            if (width) {
                bar.setAttribute('data-print-width', width);
            }
        });
        
        // Trigger browser print
        window.print();
    }
    
    // Add keyboard shortcut: Ctrl+P
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            handlePrint();
        }
    });
    
    // ========== Export Functions for External Use ==========
    window.modernCV = {
        replayAnimations: replayAnimations,
        printCV: handlePrint,
        getSkillData: function() {
            return skillData;
        },
        updateSkillData: function(newSkills) {
            console.log('🔄 Updating skill data:', newSkills);
            // Implementation for future updates
        }
    };
    
    // ========== Performance Logging ==========
    console.log(`⏱️ CV ready at ${new Date().toLocaleTimeString()}`);
    console.log('✅ Modern CV template fully loaded');
});