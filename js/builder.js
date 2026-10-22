// FILE: js/builder.js
document.addEventListener("DOMContentLoaded", function () {

    /* ---------------- TEMPLATE SELECTION ---------------- */

    const templateMap = {
        "Modern 1": "modern_cv1.html",
        "Modern 2": "modern_cv2.html",
        "Modern 3": "modern_cv3.html",
        "Modern 4": "modern_cv4.html",
        "Modern 5": "modern_cv5.html",
        "Professional 1": "professional1.html",
        "Professional 2": "professional2.html",
        "Professional 3": "professional3.html",
        "Basic 1": "basic1.html",
        "Basic 2": "basic2.html"
    };

    const params = new URLSearchParams(window.location.search);
    const urlTemplate = params.get("template");
    const urlTemplateId = params.get("id");
    
    const idToNameMap = {
        "modern1": "Modern 1",
        "modern2": "Modern 2",
        "modern3": "Modern 3",
        "modern4": "Modern 4",
        "modern5": "Modern 5",
        "professional1": "Professional 1",
        "professional2": "Professional 2",
        "professional3": "Professional 3",
        "basic1": "Basic 1",
        "basic2": "Basic 2"
    };

    let templateName = "Modern 1";
    let templateFile = "modern_cv1.html";

    if (urlTemplate && templateMap[urlTemplate]) {
        templateName = urlTemplate;
        templateFile = templateMap[urlTemplate];
        localStorage.setItem("selectedTemplate", templateName);
        localStorage.setItem("selectedTemplateFile", templateFile);
    } else if (urlTemplateId && idToNameMap[urlTemplateId]) {
        templateName = idToNameMap[urlTemplateId];
        templateFile = templateMap[templateName];
        localStorage.setItem("selectedTemplate", templateName);
        localStorage.setItem("selectedTemplateFile", templateFile);
    } else {
        const savedTemplate = localStorage.getItem("selectedTemplate") || "Modern 1";
        const savedFile = localStorage.getItem("selectedTemplateFile");
        
        if (savedTemplate && templateMap[savedTemplate]) {
            templateName = savedTemplate;
            templateFile = savedFile || templateMap[savedTemplate];
        }
    }

    // Update template name display
    const templateNameElement = document.getElementById("templateName");
    const previewTemplateName = document.getElementById("previewTemplateName");
    
    if (templateNameElement) templateNameElement.textContent = templateName;
    if (previewTemplateName) previewTemplateName.textContent = templateName;

    console.log("Loading template:", templateName, templateFile);

    /* ---------------- DATA MODEL ---------------- */

    let cvData = {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        about: "",
        skills: [],
        languages: [],
        education: [],
        experience: []
    };

    /* ---------------- FORM ELEMENTS ---------------- */

    const fullName = document.getElementById("fullName");
    const jobTitle = document.getElementById("jobTitle");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const location = document.getElementById("location");
    const website = document.getElementById("website");
    const linkedin = document.getElementById("linkedin");
    const github = document.getElementById("github");
    const about = document.getElementById("about");

    const skillsContainer = document.getElementById("skillsContainer");
    const languagesContainer = document.getElementById("languagesContainer");
    const educationContainer = document.getElementById("educationContainer");
    const experienceContainer = document.getElementById("experienceContainer");

    /* ---------------- PREVIEW IFRAME ---------------- */

    const previewPanel = document.querySelector('.preview-panel');
    
    // Clear and setup preview panel
    previewPanel.innerHTML = "";
    previewPanel.style.display = "flex";
    previewPanel.style.flexDirection = "column";
    previewPanel.style.justifyContent = "stretch";
    previewPanel.style.alignItems = "stretch";
    previewPanel.style.height = "100%";
    previewPanel.style.overflow = "hidden";

    // Create iframe
    const templateIframe = document.createElement("iframe");
    templateIframe.id = "cvPreviewFrame";
    templateIframe.style.width = "100%";
    templateIframe.style.height = "100%";
    templateIframe.style.border = "none";
    templateIframe.style.background = "white";
    templateIframe.style.borderRadius = "20px";
    templateIframe.style.flex = "1";

    previewPanel.appendChild(templateIframe);

    /* ---------------- SAVE FUNCTION ---------------- */

    function saveFormData() {
        cvData.fullName = fullName.value;
        cvData.jobTitle = jobTitle.value;
        cvData.email = email.value;
        cvData.phone = phone.value;
        cvData.location = location.value;
        cvData.website = website.value;
        cvData.linkedin = linkedin.value;
        cvData.github = github.value;
        cvData.about = about.value;

        localStorage.setItem("cvData", JSON.stringify(cvData));
    }

    /* ---------------- LOAD TEMPLATE ---------------- */

    function loadTemplateIntoIframe() {
        console.log("Loading template file:", templateFile);
        
        fetch(templateFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Template not found: ${templateFile}`);
                }
                return response.text();
            })
            .then(html => {
                // Modify HTML to work in iframe
                let modifiedHtml = html;
                
                // Fix relative paths
                modifiedHtml = modifiedHtml.replace(/href="\//g, 'href="');
                modifiedHtml = modifiedHtml.replace(/src="\//g, 'src="');
                
                // Write to iframe
                const iframeDoc = templateIframe.contentDocument || templateIframe.contentWindow.document;
                iframeDoc.open();
                iframeDoc.write(modifiedHtml);
                iframeDoc.close();
                
                // Wait for iframe to load then inject data
                templateIframe.onload = () => {
                    setTimeout(() => {
                        injectDataIntoIframe();
                    }, 500);
                };
                
                // Fallback timeout
                setTimeout(() => {
                    injectDataIntoIframe();
                }, 1000);
            })
            .catch(error => {
                console.error("Error loading template:", error);
                templateIframe.srcdoc = `<div style="padding: 40px; text-align: center; color: red; font-family: sans-serif;">
                    <h3>Error Loading Template</h3>
                    <p>Could not load: ${templateFile}</p>
                    <p>Make sure the file exists in the root directory.</p>
                </div>`;
            });
    }

    /* ---------------- INJECT DATA INTO IFRAME ---------------- */

    function injectDataIntoIframe() {
        try {
            const iframeDoc = templateIframe.contentDocument || templateIframe.contentWindow.document;
            if (!iframeDoc) return;
            
            // Update text content - try multiple selectors
            updateIframeText(iframeDoc, '.cv-name, .premium-name, .neon-name, .soft-name, .professional-name, .basic-name, #previewFullName, h1', fullName.value);
            updateIframeText(iframeDoc, '.cv-job-title, .cv-title, .premium-title, .neon-title, .soft-title, .professional-title, .basic-title, #previewJobTitle, h2', jobTitle.value);
            
            // Update contact info
            updateIframeText(iframeDoc, '.email, .contact-email, .bi-envelope + span, .fa-envelope + span, #previewEmail', email.value);
            updateIframeText(iframeDoc, '.phone, .contact-phone, .bi-telephone + span, .fa-phone + span, #previewPhone', phone.value);
            updateIframeText(iframeDoc, '.location, .contact-location, .bi-geo-alt + span, .fa-location-dot + span, #previewLocation', location.value);
            updateIframeText(iframeDoc, '.website, .contact-website, .bi-globe + span, .fa-globe + span, #previewWebsite', website.value);
            updateIframeText(iframeDoc, '.linkedin, .contact-linkedin, .bi-linkedin + span, .fa-linkedin + span, #previewLinkedin', linkedin.value);
            
            // Update about/summary
            updateIframeText(iframeDoc, '.about-text, .summary-text, .profile-text, .professional-summary, .basic-summary, #previewAbout', about.value);
            
            // Update skills
            updateIframeSkills(iframeDoc);
            
            // Update experience
            updateIframeExperience(iframeDoc);
            
            // Update education
            updateIframeEducation(iframeDoc);
            
            // Update languages if present
            updateIframeLanguages(iframeDoc);
            
            console.log("Data injected into iframe");
        } catch (error) {
            console.error("Error injecting data:", error);
        }
    }

    function updateIframeText(doc, selector, value) {
        if (!value) return;
        try {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(el => {
                if (el) el.textContent = value;
            });
        } catch (e) {
            // Ignore selector errors
        }
    }

    function updateIframeSkills(doc) {
        if (!cvData.skills || cvData.skills.length === 0) return;
        
        const skillContainer = doc.querySelector('.skills-list, .skills-container, .skills-section, .sidebar-section, #previewSkills');
        if (!skillContainer) return;
        
        // Clear existing content
        skillContainer.innerHTML = '';
        
        cvData.skills.forEach(skill => {
            const skillEl = doc.createElement('div');
            skillEl.className = 'skill-item skill-sidebar-item';
            skillEl.innerHTML = `
                <div class="skill-label">
                    <span>${skill.name}</span>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
                <div class="progress skill-progress-sidebar">
                    <div class="progress-bar skill-bar" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillContainer.appendChild(skillEl);
        });
    }

    function updateIframeExperience(doc) {
        if (!cvData.experience || cvData.experience.length === 0) return;
        
        const expContainer = doc.querySelector('.experience-list, .exp-list, .experience-section, .timeline-container, #previewExperience');
        if (!expContainer) return;
        
        expContainer.innerHTML = '';
        
        cvData.experience.forEach(exp => {
            const expEl = doc.createElement('div');
            expEl.className = 'experience-item exp-item';
            expEl.innerHTML = `
                <div class="exp-header">
                    <div>
                        <h4 class="exp-role">${exp.role}</h4>
                        <p class="exp-company">${exp.company} · ${exp.location}</p>
                    </div>
                    <span class="exp-date">${exp.startDate} — ${exp.endDate}</span>
                </div>
                <p class="exp-description">${exp.description}</p>
            `;
            expContainer.appendChild(expEl);
        });
    }

    function updateIframeEducation(doc) {
        if (!cvData.education || cvData.education.length === 0) return;
        
        const eduContainer = doc.querySelector('.education-list, .edu-list, .education-section, .edu-grid, #previewEducation');
        if (!eduContainer) return;
        
        eduContainer.innerHTML = '';
        
        cvData.education.forEach(edu => {
            const eduEl = doc.createElement('div');
            eduEl.className = 'education-item edu-item';
            eduEl.innerHTML = `
                <div class="edu-header">
                    <div>
                        <h4 class="edu-degree">${edu.degree}</h4>
                        <p class="edu-school">${edu.institution}</p>
                    </div>
                    <span class="edu-date">${edu.startYear} — ${edu.endYear}</span>
                </div>
            `;
            eduContainer.appendChild(eduEl);
        });
    }

    function updateIframeLanguages(doc) {
        if (!cvData.languages || cvData.languages.length === 0) return;
        
        const langContainer = doc.querySelector('.languages-list, .lang-list, .languages-section');
        if (!langContainer) return;
        
        langContainer.innerHTML = '';
        
        cvData.languages.forEach(lang => {
            const langEl = doc.createElement('div');
            langEl.className = 'lang-item';
            langEl.innerHTML = `
                <span>${lang.name}</span>
                <span class="lang-level">${lang.level}</span>
            `;
            langContainer.appendChild(langEl);
        });
    }

    /* ---------------- RENDER SKILLS IN EDITOR ---------------- */

    function renderSkills() {
        if (!skillsContainer) return;
        skillsContainer.innerHTML = "";
        
        if (cvData.skills.length === 0) {
            skillsContainer.innerHTML = '<div class="text-muted text-center py-3">No skills added. Click "Add Skill" to start.</div>';
            return;
        }
        
        cvData.skills.forEach((skill, index) => {
            const div = document.createElement("div");
            div.className = "skill-input-group";
            div.innerHTML = `
                <input type="text" class="form-control" placeholder="Skill name" value="${skill.name || ''}" data-skill-name="${index}">
                <select class="form-control skill-level-select" data-skill-level="${index}">
                    <option value="90" ${skill.level == 90 ? 'selected' : ''}>90%</option>
                    <option value="80" ${skill.level == 80 ? 'selected' : ''}>80%</option>
                    <option value="70" ${skill.level == 70 ? 'selected' : ''}>70%</option>
                    <option value="60" ${skill.level == 60 ? 'selected' : ''}>60%</option>
                    <option value="50" ${skill.level == 50 ? 'selected' : ''}>50%</option>
                </select>
                <button class="btn btn-outline-danger btn-sm remove-btn" onclick="window.removeItem('skill', ${index})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            skillsContainer.appendChild(div);
        });

        attachSkillListeners();
    }

    function attachSkillListeners() {
        document.querySelectorAll('[data-skill-name]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.skillName;
                cvData.skills[index].name = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-skill-level]').forEach(select => {
            select.addEventListener('change', (e) => {
                const index = e.target.dataset.skillLevel;
                cvData.skills[index].level = parseInt(e.target.value);
                saveFormData();
                injectDataIntoIframe();
            });
        });
    }

    /* ---------------- RENDER LANGUAGES IN EDITOR ---------------- */

    function renderLanguages() {
        if (!languagesContainer) return;
        languagesContainer.innerHTML = "";
        
        if (cvData.languages.length === 0) {
            languagesContainer.innerHTML = '<div class="text-muted text-center py-3">No languages added. Click "Add Language" to start.</div>';
            return;
        }
        
        cvData.languages.forEach((lang, index) => {
            const div = document.createElement("div");
            div.className = "language-input-group";
            div.innerHTML = `
                <input type="text" class="form-control" placeholder="Language" value="${lang.name || ''}" data-lang-name="${index}">
                <select class="form-control" data-lang-level="${index}">
                    <option value="Native" ${lang.level == 'Native' ? 'selected' : ''}>Native</option>
                    <option value="Fluent" ${lang.level == 'Fluent' ? 'selected' : ''}>Fluent</option>
                    <option value="Professional" ${lang.level == 'Professional' ? 'selected' : ''}>Professional</option>
                    <option value="Basic" ${lang.level == 'Basic' ? 'selected' : ''}>Basic</option>
                </select>
                <button class="btn btn-outline-danger btn-sm remove-btn" onclick="window.removeItem('language', ${index})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            languagesContainer.appendChild(div);
        });

        attachLanguageListeners();
    }

    function attachLanguageListeners() {
        document.querySelectorAll('[data-lang-name]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.langName;
                cvData.languages[index].name = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-lang-level]').forEach(select => {
            select.addEventListener('change', (e) => {
                const index = e.target.dataset.langLevel;
                cvData.languages[index].level = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });
    }

    /* ---------------- RENDER EDUCATION IN EDITOR ---------------- */

    function renderEducation() {
        if (!educationContainer) return;
        educationContainer.innerHTML = "";
        
        if (cvData.education.length === 0) {
            educationContainer.innerHTML = '<div class="text-muted text-center py-3">No education added. Click "Add Education" to start.</div>';
            return;
        }
        
        cvData.education.forEach((edu, index) => {
            const div = document.createElement("div");
            div.className = "dynamic-item mb-3 p-3 bg-light rounded-3";
            div.innerHTML = `
                <div class="row g-2 mb-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Degree" value="${edu.degree || ''}" data-edu-degree="${index}">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Institution" value="${edu.institution || ''}" data-edu-institution="${index}">
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col-md-5">
                        <input type="text" class="form-control" placeholder="Start Year" value="${edu.startYear || ''}" data-edu-start="${index}">
                    </div>
                    <div class="col-md-5">
                        <input type="text" class="form-control" placeholder="End Year" value="${edu.endYear || ''}" data-edu-end="${index}">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-danger btn-sm remove-btn" onclick="window.removeItem('education', ${index})">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `;
            educationContainer.appendChild(div);
        });

        attachEducationListeners();
    }

    function attachEducationListeners() {
        document.querySelectorAll('[data-edu-degree]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.eduDegree;
                cvData.education[index].degree = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-edu-institution]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.eduInstitution;
                cvData.education[index].institution = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-edu-start]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.eduStart;
                cvData.education[index].startYear = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-edu-end]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.eduEnd;
                cvData.education[index].endYear = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });
    }

    /* ---------------- RENDER EXPERIENCE IN EDITOR ---------------- */

    function renderExperience() {
        if (!experienceContainer) return;
        experienceContainer.innerHTML = "";
        
        if (cvData.experience.length === 0) {
            experienceContainer.innerHTML = '<div class="text-muted text-center py-3">No experience added. Click "Add Experience" to start.</div>';
            return;
        }
        
        cvData.experience.forEach((exp, index) => {
            const div = document.createElement("div");
            div.className = "dynamic-item mb-3 p-3 bg-light rounded-3";
            div.innerHTML = `
                <div class="row g-2 mb-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Role" value="${exp.role || ''}" data-exp-role="${index}">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Company" value="${exp.company || ''}" data-exp-company="${index}">
                    </div>
                </div>
                <div class="row g-2 mb-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Location" value="${exp.location || ''}" data-exp-location="${index}">
                    </div>
                </div>
                <div class="row g-2 mb-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Start Date" value="${exp.startDate || ''}" data-exp-start="${index}">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="End Date" value="${exp.endDate || ''}" data-exp-end="${index}">
                    </div>
                </div>
                <div class="row g-2 mb-2">
                    <div class="col-12">
                        <textarea class="form-control" rows="2" placeholder="Description" data-exp-desc="${index}">${exp.description || ''}</textarea>
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col-12">
                        <button class="btn btn-outline-danger btn-sm remove-btn" onclick="window.removeItem('experience', ${index})">
                            <i class="fa-regular fa-trash-can"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            experienceContainer.appendChild(div);
        });

        attachExperienceListeners();
    }

    function attachExperienceListeners() {
        document.querySelectorAll('[data-exp-role]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.expRole;
                cvData.experience[index].role = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-exp-company]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.expCompany;
                cvData.experience[index].company = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-exp-location]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.expLocation;
                cvData.experience[index].location = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-exp-start]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.expStart;
                cvData.experience[index].startDate = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-exp-end]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.expEnd;
                cvData.experience[index].endDate = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });

        document.querySelectorAll('[data-exp-desc]').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const index = e.target.dataset.expDesc;
                cvData.experience[index].description = e.target.value;
                saveFormData();
                injectDataIntoIframe();
            });
        });
    }

    /* ---------------- LOAD SAVED DATA ---------------- */

    function loadSavedData() {
        const saved = localStorage.getItem("cvData");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                cvData = { ...cvData, ...parsed };
                
                if (fullName) fullName.value = cvData.fullName || "Alexandra Mitchell";
                if (jobTitle) jobTitle.value = cvData.jobTitle || "Senior Software Engineer";
                if (email) email.value = cvData.email || "alexandra.mitchell@gmail.com";
                if (phone) phone.value = cvData.phone || "+1 (555) 123-4567";
                if (location) location.value = cvData.location || "San Francisco, CA";
                if (website) website.value = cvData.website || "alexandramitchell.com";
                if (linkedin) linkedin.value = cvData.linkedin || "linkedin.com/in/alexandramitchell";
                if (github) github.value = cvData.github || "github.com/alexmitchell";
                if (about) about.value = cvData.about || "Results-driven Senior Software Engineer with 8+ years of experience building scalable web applications and leading development teams.";
                
                renderSkills();
                renderLanguages();
                renderEducation();
                renderExperience();
                loadTemplateIntoIframe();
            } catch (e) {
                console.error("Error loading saved data", e);
                initDefaultData();
            }
        } else {
            initDefaultData();
        }
    }

    function initDefaultData() {
        cvData = {
            fullName: "Alexandra Mitchell",
            jobTitle: "Senior Software Engineer",
            email: "alexandra.mitchell@gmail.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            website: "alexandramitchell.com",
            linkedin: "linkedin.com/in/alexandramitchell",
            github: "github.com/alexmitchell",
            about: "Results-driven Senior Software Engineer with 8+ years of experience building scalable web applications and leading development teams. Expertise in React, Node.js, and cloud infrastructure. Passionate about creating elegant solutions and mentoring junior developers.",
            skills: [
                { name: "JavaScript/TypeScript", level: 90 },
                { name: "React & Next.js", level: 85 },
                { name: "Node.js & Express", level: 80 },
                { name: "Python", level: 75 },
                { name: "AWS & Docker", level: 80 }
            ],
            languages: [
                { name: "English", level: "Native" },
                { name: "Spanish", level: "Fluent" },
                { name: "French", level: "Basic" }
            ],
            education: [
                { 
                    degree: "B.Sc. Computer Science", 
                    institution: "University of California, Berkeley", 
                    startYear: "2012",
                    endYear: "2016"
                }
            ],
            experience: [
                { 
                    role: "Senior Software Engineer", 
                    company: "Tech Innovations Inc.", 
                    location: "San Francisco, CA",
                    startDate: "2021",
                    endDate: "Present",
                    description: "Led development of microservices architecture serving 2M+ users. Mentored team of 5 junior engineers, improving productivity by 30%. Implemented CI/CD pipeline reducing deployment time from 2h to 15min."
                },
                { 
                    role: "Software Engineer", 
                    company: "Digital Solutions LLC", 
                    location: "San Francisco, CA",
                    startDate: "2018",
                    endDate: "2021",
                    description: "Developed React dashboard used by 500+ enterprise clients. Optimized database queries reducing page load time by 60%. Integrated Stripe, SendGrid, and AWS services."
                }
            ]
        };
        
        updateFormFields();
        renderSkills();
        renderLanguages();
        renderEducation();
        renderExperience();
        loadTemplateIntoIframe();
    }

    function updateFormFields() {
        if (fullName) fullName.value = cvData.fullName;
        if (jobTitle) jobTitle.value = cvData.jobTitle;
        if (email) email.value = cvData.email;
        if (phone) phone.value = cvData.phone;
        if (location) location.value = cvData.location;
        if (website) website.value = cvData.website;
        if (linkedin) linkedin.value = cvData.linkedin;
        if (github) github.value = cvData.github;
        if (about) about.value = cvData.about;
    }

    /* ---------------- REMOVE ITEM FUNCTION ---------------- */

    window.removeItem = function(type, index) {
        if (type === 'skill') {
            cvData.skills.splice(index, 1);
            renderSkills();
        } else if (type === 'language') {
            cvData.languages.splice(index, 1);
            renderLanguages();
        } else if (type === 'education') {
            cvData.education.splice(index, 1);
            renderEducation();
        } else if (type === 'experience') {
            cvData.experience.splice(index, 1);
            renderExperience();
        }
        saveFormData();
        injectDataIntoIframe();
    };

    /* ---------------- ADD BUTTON HANDLERS ---------------- */

    document.getElementById("addSkillBtn")?.addEventListener("click", () => {
        cvData.skills.push({ name: "New Skill", level: 70 });
        renderSkills();
        saveFormData();
        injectDataIntoIframe();
    });

    document.getElementById("addLanguageBtn")?.addEventListener("click", () => {
        cvData.languages.push({ name: "New Language", level: "Basic" });
        renderLanguages();
        saveFormData();
        injectDataIntoIframe();
    });

    document.getElementById("addEducationBtn")?.addEventListener("click", () => {
        cvData.education.push({ 
            degree: "New Degree", 
            institution: "Institution", 
            startYear: "",
            endYear: "2024" 
        });
        renderEducation();
        saveFormData();
        injectDataIntoIframe();
    });

    document.getElementById("addExperienceBtn")?.addEventListener("click", () => {
        cvData.experience.push({ 
            role: "New Role", 
            company: "Company", 
            location: "Location", 
            startDate: "",
            endDate: "Present", 
            description: "Description" 
        });
        renderExperience();
        saveFormData();
        injectDataIntoIframe();
    });

    /* ---------------- INPUT LISTENERS ---------------- */

    const inputs = [fullName, jobTitle, email, phone, location, website, linkedin, github, about].filter(i => i);
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            saveFormData();
            injectDataIntoIframe();
        });
    });

    /* ---------------- BUTTON HANDLERS ---------------- */

    document.getElementById("templatesBtn")?.addEventListener("click", () => {
        window.location.href = "templates.html";
    });

    document.getElementById("previewBtn")?.addEventListener("click", () => {
        saveFormData();
        window.open(`preview.html?template=${encodeURIComponent(templateName)}`, '_blank');
    });

    document.getElementById("downloadBtn")?.addEventListener("click", () => {
        if (templateIframe.contentWindow) {
            templateIframe.contentWindow.focus();
            templateIframe.contentWindow.print();
        }
    });

    document.getElementById("saveBtn")?.addEventListener("click", () => {
        saveFormData();
        const btn = document.getElementById("saveBtn");
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-regular fa-check me-2"></i>Saved!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 1500);
    });

    document.getElementById("resetBtn")?.addEventListener("click", () => {
        if (confirm("Reset all fields to default?")) {
            initDefaultData();
            saveFormData();
            injectDataIntoIframe();
        }
    });

    /* ---------------- INITIAL LOAD ---------------- */

    loadSavedData();
});


// Hide all even-numbered sections
function hideEvenSections() {
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach((section, index) => {
        // index+1 because arrays are 0-based, but sections are 1-based
        if ((index + 1) % 2 === 0) {
            section.style.display = 'none';
        }
    });
    console.log('Even sections hidden');
}

// Call the function
hideEvenSections();
// Hide all odd-numbered sections
function hideOddSections() {
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach((section, index) => {
        if ((index + 1) % 2 !== 0) {
            section.style.display = 'none';
        }
    });
    console.log('Odd sections hidden');
}

// Call the function
hideOddSections();
// Hide section 3 only
function hideSection3() {
    const sections = document.querySelectorAll('.settings-section');
    if (sections.length >= 3) {
        sections[2].style.display = 'none'; // index 2 = section 3
        console.log('Section 3 hidden');
    }
}

// Call the function
hideSection3();
// Hide section 4 only
function hideSection4() {
    const sections = document.querySelectorAll('.settings-section');
    if (sections.length >= 4) {
        sections[3].style.display = 'none'; // index 3 = section 4
        console.log('Section 4 hidden');
    }
}

// Call the function
hideSection4();
// Hide sections 3 and 4
function hideSections3And4() {
    const sections = document.querySelectorAll('.settings-section');
    if (sections.length >= 3) {
        sections[2].style.display = 'none'; // section 3
    }
    if (sections.length >= 4) {
        sections[3].style.display = 'none'; // section 4
    }
    console.log('Sections 3 and 4 hidden');
}

// Call the function
hideSections3And4();
// Add buttons to toggle visibility
function addSectionControls() {
    const panel = document.querySelector('.panel-content');
    
    const controls = document.createElement('div');
    controls.className = 'section-controls';
    controls.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        padding: 10px;
        background: var(--bg-light);
        border-radius: 10px;
        flex-wrap: wrap;
    `;
    
    controls.innerHTML = `
        <button onclick="toggleEvenSections()" class="btn-outline-teal btn-sm">Hide Even</button>
        <button onclick="toggleOddSections()" class="btn-outline-teal btn-sm">Hide Odd</button>
        <button onclick="toggleSection3()" class="btn-outline-teal btn-sm">Toggle Section 3</button>
        <button onclick="toggleSection4()" class="btn-outline-teal btn-sm">Toggle Section 4</button>
        <button onclick="showAllSections()" class="btn-teal btn-sm">Show All</button>
    `;
    
    panel.insertBefore(controls, panel.firstChild);
}

// Toggle functions
let evenHidden = false;
let oddHidden = false;
let section3Hidden = false;
let section4Hidden = false;

