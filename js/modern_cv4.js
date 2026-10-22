/**
 * Neon Dark CV Template
 * Animated skill bars, glow effects, and print functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DOM Elements ==========
    const cvCard = document.getElementById('cvCard');
    const editBtn = document.getElementById('editBtn');
    const printBtn = document.getElementById('printBtn');
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercentages = document.querySelectorAll('.skill-percent');
    const neonSections = document.querySelectorAll('.neon-section');
    const expCards = document.querySelectorAll('.exp-card');
    
    // Skill data
    const skillData = [
        { id: 'skill1Bar', percent: 95 },
        { id: 'skill2Bar', percent: 92 },
        { id: 'skill3Bar', percent: 88 },
        { id: 'skill4Bar', percent: 90 },
        { id: 'skill5Bar', percent: 87 }
    ];
    
    // ========== Initialize ==========
    console.log('🚀 Neon Dark CV Template initialized');
    initAnimations();
    attachEventListeners();
    
    // ========== Animation Functions ==========
    function initAnimations() {
        console.log('📊 Animating neon skill bars...');
        
        // Fade in CV card with glow
        if (cvCard) {
            cvCard.style.opacity = '0';
            cvCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cvCard.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
                cvCard.style.opacity = '1';
                cvCard.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate skill bars after load
        setTimeout(() => {
            animateSkillBars();
        }, 600);
        
        // Log sections loaded
        console.log(`📋 Loaded ${neonSections.length} content sections`);
    }
    
    /**
     * Animate skill bars from 0% to target percentage
     */
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            if (skillData[index]) {
                const targetPercent = skillData[index].percent;
                
                // Set the width with smooth transition
                bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
                bar.style.width = targetPercent + '%';
                
                // Log animation
                console.log(`📈 Neon skill bar ${index + 1}: ${targetPercent}%`);
            }
        });
    }
    
    /**
     * Reset and replay animations (for tab visibility changes)
     */
    function replayAnimations() {
        // Reset skill bars
        skillBars.forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0%';
        });
        
        // Force reflow
        void skillBars[0]?.offsetWidth;
        
        // Re-animate
        setTimeout(() => {
            skillBars.forEach(bar => {
                bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
            });
            animateSkillBars();
        }, 50);
        
        // Add glow pulse to cards
        expCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'box-shadow 0.3s ease';
                card.style.boxShadow = '0 0 30px rgba(45, 212, 191, 0.2)';
                
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 500);
            }, index * 100);
        });
    }
    
    // ========== Event Listeners ==========
    function attachEventListeners() {
        
        // Edit button
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleEditClick();
            });
        }
        
        // Print button
        if (printBtn) {
            printBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handlePrint();
            });
        }
        
        // Neon ring hover effect
        const neonRing = document.querySelector('.neon-ring');
        if (neonRing) {
            neonRing.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                this.style.boxShadow = '0 0 40px rgba(45, 212, 191, 0.5)';
                this.style.transform = 'scale(1.05)';
                
                console.log('✨ Neon ring hover');
            });
            
            neonRing.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                this.style.transform = 'scale(1)';
            });
        }
        
        // Experience card hover logging
        expCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const title = this.querySelector('.exp-title')?.textContent || 'Experience';
                console.log(`💼 Viewing: ${title}`);
            });
        });
        
        // Contact item hover
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
        
        // Replay animations when page becomes visible
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                console.log('👋 Tab visible, replaying neon animations');
                replayAnimations();
            }
        });
        
        // Keyboard shortcut: Ctrl+P
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                handlePrint();
            }
        });
    }
    
    // ========== Edit Handler ==========
    function handleEditClick() {
        console.log('✏️ Edit CV clicked (neon mode)');
        
        // Visual feedback
        editBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Loading...';
        editBtn.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            editBtn.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit CV';
            editBtn.disabled = false;
            
            // Show notification
            showNeonNotification('Editor ready', 'success');
            
            // In production: window.location.href = 'builder.html';
        }, 800);
    }
    
    // ========== Print Handler ==========
    function handlePrint() {
        console.log('🖨️ Preparing neon CV for print...');
        
        // Show preparing notification
        showNeonNotification('Preparing PDF...', 'info');
        
        // Ensure skill bars are captured
        skillBars.forEach(bar => {
            const width = bar.style.width;
            if (width) {
                bar.setAttribute('data-print-width', width);
            }
        });
        
        // Trigger print after short delay
        setTimeout(() => {
            window.print();
            
            setTimeout(() => {
                console.log('✅ Print dialog closed');
            }, 1000);
        }, 300);
    }
    
    // ========== Notification System ==========
    function showNeonNotification(message, type = 'info') {
        // Remove existing
        const existing = document.querySelector('.neon-notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'neon-notification';
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
        // Style with neon theme
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = 'var(--bg-surface)';
        notification.style.color = 'var(--neon-teal)';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '50px';
        notification.style.border = '1px solid var(--neon-teal)';
        notification.style.boxShadow = '0 0 30px rgba(45, 212, 191, 0.3)';
        notification.style.zIndex = '1000';
        notification.style.fontWeight = '500';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.animation = 'slideInNeon 0.3s ease';
        
        // Add animation
        if (!document.querySelector('#neon-styles')) {
            const style = document.createElement('style');
            style.id = 'neon-styles';
            style.textContent = `
                @keyframes slideInNeon {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInNeon 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ========== Data Management ==========
    function loadCVData() {
        console.log('📂 Loading saved CV data...');
        
        try {
            const savedData = localStorage.getItem('neonCVData');
            if (savedData) {
                const data = JSON.parse(savedData);
                console.log('✅ Found saved data:', data);
                // Update UI with saved data
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
    
    // ========== Export API ==========
    window.neonCV = {
        replayAnimations: replayAnimations,
        print: handlePrint,
        edit: handleEditClick,
        getSkillData: function() {
            return skillData;
        },
        getExperienceData: function() {
            const expData = [];
            expCards.forEach(card => {
                const title = card.querySelector('.exp-title')?.textContent;
                const company = card.querySelector('.exp-company')?.textContent;
                expData.push({ title, company });
            });
            return expData;
        }
    };
    
    // ========== Performance Logging ==========
    console.log(`⏱️ Neon CV ready at ${new Date().toLocaleTimeString()}`);
    console.log('✅ Premium dark template fully loaded');
    
    // Load any saved data
    loadCVData();
});