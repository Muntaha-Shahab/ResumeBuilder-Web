/**
 * Modern CV Template - Card Layout
 * Animated skills, interactive buttons, and print functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DOM Elements ==========
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercentages = document.querySelectorAll('.skill-percent');
    const cvContainer = document.getElementById('cvContainer');
    const editBtn = document.getElementById('editBtn');
    const printBtn = document.getElementById('printBtn');
    const cards = document.querySelectorAll('.cv-card');
    
    // Skill data from HTML
    const skillData = [
        { id: 'skill1Bar', percent: 95 },
        { id: 'skill2Bar', percent: 92 },
        { id: 'skill3Bar', percent: 88 },
        { id: 'skill4Bar', percent: 90 },
        { id: 'skill5Bar', percent: 85 }
    ];
    
    // ========== Initialize ==========
    console.log('🚀 Premium Modern CV Template initialized');
    initAnimations();
    attachEventListeners();
    
    // ========== Animation Functions ==========
    function initAnimations() {
        console.log('📊 Animating skill bars...');
        
        // Fade in CV container
        if (cvContainer) {
            cvContainer.style.opacity = '0';
            cvContainer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cvContainer.style.transition = 'all 0.6s ease';
                cvContainer.style.opacity = '1';
                cvContainer.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate skill bars after page load
        setTimeout(() => {
            animateSkillBars();
        }, 400);
        
        // Stagger card animations
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
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
                console.log(`📈 Skill bar ${index + 1}: ${targetPercent}%`);
            }
        });
    }
    
    /**
     * Reset and replay animations
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
        
        // Add bounce effect to cards
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
    
    // ========== Event Listeners ==========
    function attachEventListeners() {
        
        // Edit button
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                console.log('✏️ Edit CV clicked');
                
                // Visual feedback
                this.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit CV';
                    this.disabled = false;
                    
                    // Simulate navigation or action
                    showNotification('Edit mode activated', 'info');
                }, 800);
            });
        }
        
        // Print button
        if (printBtn) {
            printBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handlePrint();
            });
        }
        
        // Card hover logging
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const title = this.querySelector('.card-title')?.textContent || 'Card';
                console.log(`🃏 Hovering: ${title}`);
            });
        });
        
        // Contact item hover
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // Replay animations when page becomes visible
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                console.log('👋 Page visible, replaying animations');
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
        
        // Show print notification
        showNotification('Preparing PDF...', 'success');
        
        // Trigger print after short delay
        setTimeout(() => {
            window.print();
        }, 300);
    }
    
    // ========== Notification System ==========
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = type === 'success' ? '#0d6e6e' : '#2563eb';
        notification.style.color = 'white';
        notification.style.padding = '1rem 1.5rem';
        notification.style.borderRadius = '50px';
        notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        notification.style.zIndex = '1000';
        notification.style.fontWeight = '500';
        notification.style.animation = 'slideIn 0.3s ease';
        
        // Add animation keyframes if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ========== Data Functions ==========
    function loadCVData() {
        // This would load from localStorage or API
        console.log('📂 Loading CV data...');
        
        // Example of loading from localStorage
        try {
            const savedData = localStorage.getItem('cvBuilderData');
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
    window.premiumCV = {
        replayAnimations: replayAnimations,
        print: handlePrint,
        getSkillData: function() {
            return skillData;
        },
        updateSkillData: function(newData) {
            console.log('🔄 Updating skill data:', newData);
            // Implementation for dynamic updates
        }
    };
    
    // ========== Performance Logging ==========
    console.log(`⏱️ CV ready at ${new Date().toLocaleTimeString()}`);
    console.log('✅ Premium CV template fully loaded');
    
    // Load any saved data
    loadCVData();
});