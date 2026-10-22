/**
 * Soft Dark + Light Professional CV Template
 * Animated skills, smooth interactions, and print functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DOM Elements ==========
    const cvCard = document.getElementById('cvCard');
    const editBtn = document.getElementById('editBtn');
    const printBtn = document.getElementById('printBtn');
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercentages = document.querySelectorAll('.skill-percent');
    const expRows = document.querySelectorAll('.exp-row');
    const eduRows = document.querySelectorAll('.edu-row');
    
    // Skill data
    const skillData = [
        { id: 'skill1Bar', percent: 92 },
        { id: 'skill2Bar', percent: 88 },
        { id: 'skill3Bar', percent: 85 },
        { id: 'skill4Bar', percent: 90 },
        { id: 'skill5Bar', percent: 87 }
    ];
    
    // ========== Initialize ==========
    console.log('🚀 Soft Dark CV Template initialized');
    initAnimations();
    attachEventListeners();
    
    // ========== Animation Functions ==========
    function initAnimations() {
        console.log('📊 Animating skill bars...');
        
        // Fade in CV card
        if (cvCard) {
            cvCard.style.opacity = '0';
            cvCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cvCard.style.transition = 'all 0.6s ease';
                cvCard.style.opacity = '1';
                cvCard.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate skill bars after load
        setTimeout(() => {
            animateSkillBars();
        }, 500);
        
        // Log counts
        console.log(`📋 Loaded ${expRows.length} experience items`);
        console.log(`📋 Loaded ${eduRows.length} education items`);
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
        
        // Add subtle pulse to markers
        expRows.forEach((row, index) => {
            setTimeout(() => {
                const marker = row.querySelector('.exp-marker');
                if (marker) {
                    marker.style.transition = 'all 0.3s ease';
                    marker.style.transform = 'scale(1.3)';
                    marker.style.boxShadow = '0 0 0 5px rgba(20, 184, 166, 0.2)';
                    
                    setTimeout(() => {
                        marker.style.transform = 'scale(1)';
                        marker.style.boxShadow = '';
                    }, 300);
                }
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
        
        // Avatar hover effect
        const avatarRing = document.querySelector('.avatar-ring');
        if (avatarRing) {
            avatarRing.addEventListener('mouseenter', function() {
                console.log('👤 Avatar hover');
            });
        }
        
        // Social links hover logging
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i')?.className || 'social';
                console.log(`🔗 Social icon hover: ${icon}`);
            });
        });
        
        // Experience row hover
        expRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                const role = this.querySelector('.exp-role')?.textContent || 'Experience';
                console.log(`💼 Viewing: ${role}`);
            });
        });
        
        // Replay animations when page becomes visible
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                console.log('👋 Tab visible, replaying animations');
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
        console.log('✏️ Edit CV clicked');
        
        // Visual feedback
        editBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Loading...';
        editBtn.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            editBtn.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit CV';
            editBtn.disabled = false;
            
            // Show notification
            showNotification('Editor ready', 'success');
            
            // In production: window.location.href = 'builder.html';
        }, 800);
    }
    
    // ========== Print Handler ==========
    function handlePrint() {
        console.log('🖨️ Preparing CV for print...');
        
        // Show preparing notification
        showNotification('Preparing PDF...', 'info');
        
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
    function showNotification(message, type = 'info') {
        // Remove existing
        const existing = document.querySelector('.cv-notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cv-notification';
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
        // Style
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = 'white';
        notification.style.color = 'var(--teal-soft)';
        notification.style.padding = '0.8rem 1.5rem';
        notification.style.borderRadius = '50px';
        notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        notification.style.zIndex = '1000';
        notification.style.fontWeight = '500';
        notification.style.border = '1px solid var(--teal-soft)';
        notification.style.animation = 'slideInSoft 0.3s ease';
        
        // Add animation
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInSoft {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInSoft 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ========== Data Management ==========
    function loadCVData() {
        console.log('📂 Loading saved CV data...');
        
        try {
            const savedData = localStorage.getItem('softDarkCVData');
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
    window.softDarkCV = {
        replayAnimations: replayAnimations,
        print: handlePrint,
        edit: handleEditClick,
        getSkillData: function() {
            return skillData;
        },
        getExperienceData: function() {
            const expData = [];
            expRows.forEach(row => {
                const role = row.querySelector('.exp-role')?.textContent;
                const company = row.querySelector('.exp-company')?.textContent;
                expData.push({ role, company });
            });
            return expData;
        }
    };
    
    // ========== Performance Logging ==========
    console.log(`⏱️ Soft Dark CV ready at ${new Date().toLocaleTimeString()}`);
    console.log('✅ Premium template fully loaded');
    
    // Load any saved data
    loadCVData();
});
