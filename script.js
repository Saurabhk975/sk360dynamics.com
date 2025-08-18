
// Risk Profile Questionnaire JavaScript - Updated Version
// SK Financials & Insurance Advisory

// Global variables
let currentQuestionIndex = 0;
let userAnswers = [];
let totalScore = 0;
let userInfo = {};

// Risk Profile Questions with scoring
const questions = [
    {
        id: 1,
        question: "Your age is?",
        options: [
            { text: "Below 25", score: 8 },
            { text: "26-35", score: 6 },
            { text: "35 and above", score: 4 }
        ]
    },
    {
        id: 2,
        question: "Your dependants include?",
        options: [
            { text: "No dependants", score: 8 },
            { text: "Only Spouse", score: 6 },
            { text: "Parents, spouse and children", score: 4 }
        ]
    },
    {
        id: 3,
        question: "How stable is your job/business/profession?",
        options: [
            { text: "Excellent chances of growth", score: 8 },
            { text: "Doing well and expect to rise", score: 6 },
            { text: "Don't foresee any change", score: 4 }
        ]
    },
    {
        id: 4,
        question: "How much of your income are you able to save?",
        options: [
            { text: "Over 30%", score: 8 },
            { text: "10-20%", score: 6 },
            { text: "Less than 10%", score: 4 }
        ]
    },
    {
        id: 5,
        question: "Which of these best describes your financial situation?",
        options: [
            { text: "Excellent", score: 8 },
            { text: "Reasonably sound", score: 6 },
            { text: "Unstable", score: 4 }
        ]
    },
    {
        id: 6,
        question: "Given your current financial status, can you achieve your financial goals?",
        options: [
            { text: "On track to reach all my goals", score: 8 },
            { text: "Somewhat", score: 6 },
            { text: "No", score: 4 }
        ]
    },
    {
        id: 7,
        question: "To what extent of your savings would you expose your investments to risk?",
        options: [
            { text: "More than 60%", score: 8 },
            { text: "20-60%", score: 6 },
            { text: "0-20%", score: 4 }
        ]
    },
    {
        id: 8,
        question: "When do you expect to use most of the money you are now accumulating in your investments?",
        options: [
            { text: "Long-Term(7-10 Years)", score: 8 },
            { text: "Medium-Term(4-7 Years)", score: 6 },
            { text: "Short-Term(1-3 Years)", score: 4 }
        ]
    },
    {
        id: 9,
        question: "What do you expect to be your next major expenditure?",
        options: [
            { text: "Retirement Planning", score: 8 },
            { text: "Saving for children's education", score: 6 },
            { text: "Buying House/Cars, Marriage, Planning For Child, Vacation", score: 4 }
        ]
    },
    {
        id: 10,
        question: "Where would you want to invest majority of your investment?",
        options: [
            { text: "Equity(Stocks/Shares)", score: 8 },
            { text: "Debt(FDs,Bonds, PPF,Mutual Funds,Debentures,NPS)", score: 6 },
            { text: "Real Assets(Real Estate,Gold,REITS)", score: 4 }
        ]
    },
    {
        id: 11,
        question: "How familiar are you with investment matters?",
        options: [
            { text: "Very Familiar – I use research and data to make smart investment decisions and understand what affects performance.", score: 8 },
            { text: "Somewhat Familiar – I know the basics of investing but don't go deep.", score: 6 },
            { text: "Not Familiar – I don't know much about investing yet.", score: 4 }
        ]
    },
    {
        id: 12,
        question: "What is your approach to making a financial decision?",
        options: [
            { text: "Rational", score: 8 },
            { text: "Logical / Analytical / Tactical", score: 6 },
            { text: "Peer Pressure", score: 4 }
        ]
    },
    {
        id: 13,
        question: "How long have you been investing, not counting your own home?",
        options: [
            { text: "3 years or more", score: 8 },
            { text: "Up to 3 years", score: 6 },
            { text: "This is my first investment", score: 4 }
        ]
    },
    {
        id: 14,
        question: "Which of the following is important to you from your investments?",
        options: [
            { text: "Capital appreciation", score: 8 },
            { text: "Capital appreciation and protection regular", score: 6 },
            { text: "Regular income", score: 4 }
        ]
    },
    {
        id: 15,
        question: "What would you do if your investment portfolio has come down from Rs. 200000 to Rs. 175000?",
        options: [
            { text: "Invest in additional funds so that you can average your investment price", score: 8 },
            { text: "Partial selling of your portfolio to cut your losses and reinvest it into more secure investments", score: 6 },
            { text: "Exit from current investments", score: 4 }
        ]
    }
];

// Risk profile definitions
const riskProfiles = {
    conservative: {
        name: "Conservative Investor",
        range: "24-48",
        description: "You prefer stability and capital preservation over high returns.",
        recommendations: [
            "Fixed Deposits and Savings Accounts",
            "Government Bonds and Treasury Bills",
            "Conservative Mutual Funds",
            "PPF and ELSS for tax saving",
            "Term Insurance for protection"
        ]
    },
    moderate: {
        name: "Moderate Investor",
        range: "49-84",
        description: "You seek balanced growth with moderate risk tolerance.",
        recommendations: [
            "Balanced Mutual Funds",
            "Large Cap Equity Funds",
            "Corporate Bonds",
            "SIP in diversified funds",
            "Health and Term Insurance"
        ]
    },
    aggressive: {
        name: "Aggressive Investor",
        range: "85-120",
        description: "You are comfortable with high risk for potentially high returns.",
        recommendations: [
            "Small & Mid Cap Funds",
            "Sectoral/Thematic Funds",
            "Direct Equity Investment",
            "International Funds",
            "Comprehensive Insurance Portfolio"
        ]
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing Risk Profile Questionnaire');
    initializeApp();
});

// Initialize the application
function initializeApp() {
    try {
        console.log('Initializing application...');
        
        // Get all DOM elements
        const elements = getDOMElements();
        if (!elements) {
            console.error('Failed to get DOM elements');
            return;
        }
        
        // Set up all event listeners
        setupAllEventListeners(elements);
        
        // Load any stored data
        loadStoredData();
        
        // Initial validation
        setTimeout(() => {
            validateBasicInfoForm();
        }, 100);
        
        // Initialize button styles
        addButtonStyles();
        
        console.log('Application initialized successfully');
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Get all DOM elements
function getDOMElements() {
    const elements = {};
    
    // Form sections
    elements.basicInfoForm = document.getElementById('basicInfoForm');
    elements.questionnaireForm = document.getElementById('questionnaireForm');
    elements.resultsSection = document.getElementById('resultsSection');
    
    // Input fields
    elements.nameInput = document.getElementById('name');
    elements.fullNameInput = document.getElementById('fullName');
    elements.mobileInput = document.getElementById('mobileNo');
    elements.emailInput = document.getElementById('emailId');
    elements.cityInput = document.getElementById('workCity');
    elements.occupationSelect = document.getElementById('occupation');
    elements.companyInput = document.getElementById('companyName');
    elements.companyContainer = document.getElementById('companyNameContainer');
    elements.companyDomainInput = document.getElementById('companyDomain');
    elements.companyDomainContainer = document.getElementById('companyDomainContainer');
    
    // Buttons
    elements.continueBtn = document.getElementById('continueBtn');
    elements.backBtn = document.getElementById('backBtn');
    elements.submitBtn = document.getElementById('submitBtn');
    elements.retakeBtn = document.getElementById('retakeBtn');
    elements.clearStorageBtn = document.getElementById('clearStorageBtn');
    
    // Progress elements
    elements.progressText = document.getElementById('progressText');
    elements.progressFill = document.getElementById('progressFill');
    elements.questionsContainer = document.getElementById('questionsContainer');
    
    // Results elements
    elements.profileType = document.getElementById('profileType');
    elements.totalScoreElement = document.getElementById('totalScore');
    elements.scoreRange = document.getElementById('scoreRange');
    elements.participantInfo = document.getElementById('participantInfo');
    elements.assessmentSummary = document.getElementById('assessmentSummary');
    
    // Check if essential elements exist
    const essentialElements = ['basicInfoForm', 'questionnaireForm', 'resultsSection', 'continueBtn'];
    const missingElements = essentialElements.filter(key => !elements[key]);
    
    if (missingElements.length > 0) {
        console.error('Missing essential DOM elements:', missingElements);
        return null;
    }
    
    console.log('All DOM elements found successfully');
    return elements;
}

// Set up all event listeners
function setupAllEventListeners(elements) {
    console.log('Setting up event listeners...');
    
    // Basic form input listeners
    const inputFields = [
        elements.nameInput,
        elements.fullNameInput,
        elements.mobileInput,
        elements.emailInput,
        elements.cityInput,
        elements.companyInput,
        elements.companyDomainInput
    ].filter(Boolean);
    
    inputFields.forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', handleInputChange);
        input.addEventListener('keyup', handleInputChange);
    });
    
    // Occupation select listener
    if (elements.occupationSelect) {
        elements.occupationSelect.addEventListener('change', handleOccupationChange);
    }
    
    // Button listeners
    if (elements.continueBtn) {
        elements.continueBtn.addEventListener('click', handleContinueClick);
    }
    
    if (elements.backBtn) {
        elements.backBtn.addEventListener('click', goBackToBasicInfo);
    }
    
    if (elements.submitBtn) {
        elements.submitBtn.addEventListener('click', calculateResults);
    }
    
    if (elements.retakeBtn) {
        elements.retakeBtn.addEventListener('click', restartAssessment);
    }
    
    if (elements.clearStorageBtn) {
        elements.clearStorageBtn.addEventListener('click', clearStoredData);
    }
    
    console.log('Event listeners set up successfully');
}

// Handle input changes
function handleInputChange() {
    console.log('Input changed, validating form...');
    setTimeout(validateBasicInfoForm, 50);
}

// Handle occupation change
function handleOccupationChange() {
    const occupationSelect = document.getElementById('occupation');
    const companyContainer = document.getElementById('companyNameContainer');
    const companyInput = document.getElementById('companyName');
    const companyDomainContainer = document.getElementById('companyDomainContainer');
    const companyDomainInput = document.getElementById('companyDomain');
    
    console.log('Occupation changed to:', occupationSelect.value);
    
    if (occupationSelect.value === 'job') {
        // Show company fields for job
        companyContainer.style.display = 'block';
        companyDomainContainer.style.display = 'block';
        companyInput.required = true;
        companyDomainInput.required = true;
        console.log('Company fields shown and required');
    } else if (occupationSelect.value === 'business') {
        // Show company domain field for business (sector)
        companyContainer.style.display = 'none';
        companyDomainContainer.style.display = 'block';
        companyInput.required = false;
        companyInput.value = '';
        companyDomainInput.required = true;
        console.log('Business sector field shown');
    } else {
        // Hide both fields
        companyContainer.style.display = 'none';
        companyDomainContainer.style.display = 'none';
        companyInput.required = false;
        companyDomainInput.required = false;
        companyInput.value = '';
        companyDomainInput.value = '';
        console.log('Company fields hidden and cleared');
    }
    
    setTimeout(validateBasicInfoForm, 50);
}

// Handle continue button click
function handleContinueClick(event) {
    event.preventDefault();
    console.log('Continue button clicked');
    
    if (validateBasicInfoForm()) {
        console.log('Form validation passed, starting questionnaire');
        startQuestionnaire();
    } else {
        console.log('Form validation failed');
        showValidationError();
    }
}

// Validate basic information form
function validateBasicInfoForm() {
    console.log('Validating basic info form...');
    
    // Get form values
    const formData = getFormData();
    
    // Check required fields
    const requiredFields = ['name', 'fullName', 'mobileNo', 'emailId', 'workCity', 'occupation'];
    let isValid = true;
    let errorMessage = '';
    
    // Check if all required fields are filled
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            isValid = false;
            errorMessage = `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`;
            console.log(`Missing field: ${field}`);
            break;
        }
    }
    
    // Validate mobile number
    if (isValid && formData.mobileNo) {
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(formData.mobileNo)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
            console.log('Invalid mobile number format');
        }
    }
    
    // Validate email
    if (isValid && formData.emailId) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailId)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
            console.log('Invalid email format');
        }
    }
    
    // Check occupation-specific fields
    if (isValid && formData.occupation === 'job') {
        if (!formData.companyName || formData.companyName.trim() === '') {
            isValid = false;
            errorMessage = 'Please enter your company name.';
            console.log('Missing company name for job occupation');
        } else if (!formData.companyDomain || formData.companyDomain.trim() === '') {
            isValid = false;
            errorMessage = 'Please enter your company sector.';
            console.log('Missing company domain for job occupation');
        }
    } else if (isValid && formData.occupation === 'business') {
        if (!formData.companyDomain || formData.companyDomain.trim() === '') {
            isValid = false;
            errorMessage = 'Please enter your business sector.';
            console.log('Missing business sector for business occupation');
        }
    }
    
    // Update continue button state
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.disabled = !isValid;
        
        if (isValid) {
            continueBtn.classList.add('enabled');
            continueBtn.style.opacity = '1';
            continueBtn.style.cursor = 'pointer';
        } else {
            continueBtn.classList.remove('enabled');
            continueBtn.style.opacity = '0.6';
            continueBtn.style.cursor = 'not-allowed';
        }
    }
    
    console.log('Form validation result:', isValid);
    return isValid;
}

// Get form data
function getFormData() {
    return {
        name: (document.getElementById('name')?.value || '').trim(),
        fullName: (document.getElementById('fullName')?.value || '').trim(),
        mobileNo: (document.getElementById('mobileNo')?.value || '').trim(),
        emailId: (document.getElementById('emailId')?.value || '').trim(),
        workCity: (document.getElementById('workCity')?.value || '').trim(),
        occupation: document.getElementById('occupation')?.value || '',
        companyName: (document.getElementById('companyName')?.value || '').trim(),
        companyDomain: (document.getElementById('companyDomain')?.value || '').trim()
    };
}

// Show validation error
function showValidationError() {
    // Create a more user-friendly notification
    const notification = document.createElement('div');
    notification.className = 'validation-error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Please fill in all required fields correctly before proceeding.</span>
            <button class="close-notification">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Remove on click
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
}

// Start questionnaire
function startQuestionnaire() {
    console.log('Starting questionnaire...');
    
    try {
        // Get and store user info
        const formData = getFormData();
        
        userInfo = {
            name: formData.name,
            fullName: formData.fullName,
            mobileNo: formData.mobileNo,
            emailId: formData.emailId,
            workCity: formData.workCity,
            occupation: formData.occupation,
            companyName: formData.occupation === 'job' ? formData.companyName : 'N/A',
            companyDomain: formData.companyDomain || 'N/A'
        };
        
        console.log('User info:', userInfo);
        
        // Save to memory (not localStorage as it's not supported in artifacts)
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
        
        // Reset questionnaire state
        currentQuestionIndex = 0;
        userAnswers = [];
        totalScore = 0;
        
        // Show questionnaire form
        const basicInfoForm = document.getElementById('basicInfoForm');
        const questionnaireForm = document.getElementById('questionnaireForm');
        
        if (basicInfoForm && questionnaireForm) {
            basicInfoForm.classList.remove('active');
            questionnaireForm.classList.add('active');
            
            console.log('Switched to questionnaire form');
            
            // Load first question
            loadQuestion();
            updateProgress();
            
        } else {
            console.error('Could not find form elements');
        }
        
    } catch (error) {
        console.error('Error starting questionnaire:', error);
    }
}

// Load current question
function loadQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');
    if (!questionsContainer) {
        console.error('Questions container not found');
        return;
    }
    
    const question = questions[currentQuestionIndex];
    if (!question) {
        console.error('Question not found for index:', currentQuestionIndex);
        return;
    }
    
    console.log('Loading question:', currentQuestionIndex + 1, question.question);
    
    const questionHTML = `
        <div class="question-card" data-question-id="${question.id}">
            <h3 class="question-title">
                <span class="question-number">${currentQuestionIndex + 1}.</span>
                ${question.question}
            </h3>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <label class="option-label" for="q${question.id}_${index}">
                        <input type="radio" 
                               id="q${question.id}_${index}"
                               name="question${question.id}" 
                               value="${option.score}" 
                               data-text="${option.text}">
                        <span class="option-text">${option.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    questionsContainer.innerHTML = questionHTML;
    
    // Add event listeners to radio buttons
    const radioButtons = questionsContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });
    
    // Restore previous answer if exists
    if (userAnswers[currentQuestionIndex]) {
        const previousAnswer = userAnswers[currentQuestionIndex];
        const targetRadio = questionsContainer.querySelector(`input[value="${previousAnswer.score}"]`);
        if (targetRadio) {
            targetRadio.checked = true;
        }
    }
    
    updateNavigationButtons();
}

// Handle answer selection
function handleAnswerSelection(event) {
    const score = parseInt(event.target.value);
    const text = event.target.dataset.text;
    
    console.log('Answer selected:', text, 'Score:', score);
    
    // Store answer
    userAnswers[currentQuestionIndex] = {
        questionId: questions[currentQuestionIndex].id,
        question: questions[currentQuestionIndex].question,
        answer: text,
        score: score
    };
    
    updateNavigationButtons();
    updateProgress();
    
    // Auto-advance after a short delay
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
        }
    }, 800);
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateProgress();
        console.log('Moved to question:', currentQuestionIndex + 1);
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateProgress();
        console.log('Moved back to question:', currentQuestionIndex + 1);
    }
}

// Update progress indicator
function updateProgress() {
    const answeredQuestions = userAnswers.filter(answer => answer !== undefined).length;
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    if (progressText) {
        progressText.textContent = `${answeredQuestions}/${questions.length} completed`;
    }
    
    if (progressFill) {
        const progressPercentage = (answeredQuestions / questions.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    console.log('Progress updated:', answeredQuestions, '/', questions.length);
}

// Update navigation buttons
function updateNavigationButtons() {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;
    
    const allAnswered = userAnswers.filter(answer => answer !== undefined).length === questions.length;
    submitBtn.disabled = !allAnswered;
    
    if (allAnswered) {
        submitBtn.classList.add('pulse');
        submitBtn.style.opacity = '1';
        console.log('All questions answered - submit button enabled');
    } else {
        submitBtn.classList.remove('pulse');
        submitBtn.style.opacity = '0.6';
    }
}

// Go back to basic info
function goBackToBasicInfo() {
    const questionnaireForm = document.getElementById('questionnaireForm');
    const basicInfoForm = document.getElementById('basicInfoForm');
    
    if (questionnaireForm && basicInfoForm) {
        questionnaireForm.classList.remove('active');
        basicInfoForm.classList.add('active');
        console.log('Returned to basic info form');
    }
}

// Calculate and display results
function calculateResults() {
    console.log('Calculating results...');
    
    // Calculate total score
    totalScore = userAnswers.reduce((sum, answer) => sum + (answer ? answer.score : 0), 0);
    console.log('Total score:', totalScore);
    
    // Determine risk profile
    let profileKey = 'conservative';
    if (totalScore >= 85) {
        profileKey = 'aggressive';
    } else if (totalScore >= 49) {
        profileKey = 'moderate';
    }
    
    const profile = riskProfiles[profileKey];
    console.log('Risk profile:', profile.name);
    
    // Save results
    const results = {
        userInfo,
        totalScore,
        profileKey,
        profile,
        userAnswers,
        completedAt: new Date().toISOString()
    };
    
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('assessmentResults', JSON.stringify(results));
        }
    } catch (e) {
        console.warn('Could not save results to localStorage:', e);
    }
    
    // Display results
    displayResults(results);
    sendResultsToGoogleSheets(results);

    
    // Show results section
    const questionnaireForm = document.getElementById('questionnaireForm');
    const resultsSection = document.getElementById('resultsSection');
    
    if (questionnaireForm && resultsSection) {
        questionnaireForm.classList.remove('active');
        resultsSection.classList.add('active');
        console.log('Showing results section');
    }
}

function sendResultsToGoogleSheets(results) {
    const url = "https://script.google.com/macros/s/AKfycbzKT2S9LHMkMKZ956O-IK5SSXe6rSg__wImFv4pGMEcclUjr9U5ZiQ9W2VKa8szQjUX9A/exec";

    // Send each answer as a separate row
// Build a structured payload
const payload = {
    fullName: results.userInfo.fullName,
    emailId: results.userInfo.emailId,
    mobileNo: results.userInfo.mobileNo,
    workCity: results.userInfo.workCity,
    occupation: results.userInfo.occupation,
    companyName: results.userInfo.companyName,
    companyDomain: results.userInfo.companyDomain,
    totalScore: results.totalScore,
    profileName: results.profile.name,
    responses: results.userAnswers.map(answerObj => ({
        question: answerObj.question,  // acts like the header
        answer: answerObj.answer,      // value below header
        score: answerObj.score
    }))
};

// Send once instead of per-answer
fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log("Submission success:", data))
.catch(err => console.error("Submission error:", err));

}


// Display results
function displayResults(results) {
    console.log('Displaying results...');
    
    // Profile card
    const profileTypeElement = document.getElementById('profileType');
    const totalScoreElement = document.getElementById('totalScore');
    const scoreRangeElement = document.getElementById('scoreRange');
    
    if (profileTypeElement) {
        profileTypeElement.textContent = results.profile.name;
    }
    
    if (totalScoreElement) {
        totalScoreElement.textContent = results.totalScore;
    }
    
    if (scoreRangeElement) {
        scoreRangeElement.innerHTML = `
            <small>Score Range: ${results.profile.range}</small><br>
            <small class="profile-description">${results.profile.description}</small>
        `;
    }
    
    // Participant info
    const participantInfo = document.getElementById('participantInfo');
    if (participantInfo) {
        participantInfo.innerHTML = `
            <p><strong>Name:</strong> ${results.userInfo.fullName}</p>
            <p><strong>Email:</strong> ${results.userInfo.emailId}</p>
            <p><strong>Mobile:</strong> ${formatPhoneNumber(results.userInfo.mobileNo)}</p>
            <p><strong>City:</strong> ${results.userInfo.workCity}</p>
            <p><strong>Occupation:</strong> ${capitalizeName(results.userInfo.occupation)}</p>
            ${results.userInfo.companyName !== 'N/A' ? `<p><strong>Company:</strong> ${results.userInfo.companyName}</p>` : ''}
            ${results.userInfo.companyDomain !== 'N/A' ? `<p><strong>Sector:</strong> ${results.userInfo.companyDomain}</p>` : ''}
        `;
    }
    
    // Assessment summary
    const assessmentSummary = document.getElementById('assessmentSummary');
    if (assessmentSummary) {
        assessmentSummary.innerHTML = `
            <div class="summary-grid">
                <div class="summary-item">
                    <span class="summary-label">Total Score:</span>
                    <span class="summary-value">${results.totalScore}/120</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Risk Profile:</span>
                    <span class="summary-value">${results.profile.name}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Completed:</span>
                    <span class="summary-value">${new Date(results.completedAt).toLocaleDateString()}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Questions Answered:</span>
                    <span class="summary-value">${results.userAnswers.length}</span>
                </div>
            </div>
            <div class="recommendations">
                <h4><i class="fas fa-lightbulb"></i> Recommended Investment Options</h4>
                <ul class="recommendations-list">
                    ${results.profile.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

// Restart assessment
function restartAssessment() {
    console.log('Restarting assessment...');
    
    // Reset variables
    currentQuestionIndex = 0;
    userAnswers = [];
    totalScore = 0;
    userInfo = {};
    
    // Reset basic info form fields
    const inputs = ['name', 'fullName', 'mobileNo', 'emailId', 'workCity', 'occupation', 'companyName', 'companyDomain'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
    
    // Hide company fields
    const companyContainer = document.getElementById('companyNameContainer');
    const companyDomainContainer = document.getElementById('companyDomainContainer');
    if (companyContainer) {
        companyContainer.style.display = 'none';
    }
    if (companyDomainContainer) {
        companyDomainContainer.style.display = 'none';
    }
    
    const companyInput = document.getElementById('companyName');
    const companyDomainInput = document.getElementById('companyDomain');
    if (companyInput) {
        companyInput.required = false;
    }
    if (companyDomainInput) {
        companyDomainInput.required = false;
    }
    
    // Show basic info form
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const basicInfoForm = document.getElementById('basicInfoForm');
    if (basicInfoForm) {
        basicInfoForm.classList.add('active');
    }
    
    // Revalidate
    setTimeout(validateBasicInfoForm, 100);
}

// Clear stored data
function clearStoredData() {
    if (confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('userInfo');
                localStorage.removeItem('assessmentResults');
            }
            console.log('Stored data cleared');
            
            // Show success notification
            showNotification('Stored data has been cleared successfully.', 'success');
            restartAssessment();
        } catch (e) {
            console.error('Error clearing stored data:', e);
            showNotification('Error clearing stored data.', 'error');
        }
    }
}

// Load stored data
function loadStoredData() {
    console.log('Loading stored data...');
    
    try {
        if (typeof localStorage === 'undefined') {
            console.log('localStorage not available');
            return;
        }
        
        // Load user info
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const userData = JSON.parse(storedUserInfo);
            console.log('Found stored user data');
            
            // Fill basic info form
            Object.keys(userData).forEach(key => {
                const element = document.getElementById(key);
                if (element && userData[key] && userData[key] !== 'N/A') {
                    element.value = userData[key];
                }
            });
            
            // Show appropriate company fields based on occupation
            if (userData.occupation === 'job') {
                const companyContainer = document.getElementById('companyNameContainer');
                const companyInput = document.getElementById('companyName');
                const companyDomainContainer = document.getElementById('companyDomainContainer');
                const companyDomainInput = document.getElementById('companyDomain');
                if (companyContainer && companyInput) {
                    companyContainer.style.display = 'block';
                    companyInput.required = true;
                }
                if (companyDomainContainer && companyDomainInput) {
                    companyDomainContainer.style.display = 'block';
                    companyDomainInput.required = true;
                }
            } else if (userData.occupation === 'business') {
                const companyDomainContainer = document.getElementById('companyDomainContainer');
                const companyDomainInput = document.getElementById('companyDomain');
                if (companyDomainContainer && companyDomainInput) {
                    companyDomainContainer.style.display = 'block';
                    companyDomainInput.required = true;
                }
            }
            
            setTimeout(validateBasicInfoForm, 100);
        }
        
        // Check for previous results
        const storedResults = localStorage.getItem('assessmentResults');
        if (storedResults) {
            console.log('Previous assessment results available');
        }
        
    } catch (e) {
        console.error('Error loading stored data:', e);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-circle' : 
                 'fas fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Remove on click
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
}

// Utility functions
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
}

function capitalizeName(name) {
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

// Add button styles and animations
function addButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn:disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
            transform: none !important;
        }
        
        .btn.enabled {
            opacity: 1 !important;
            cursor: pointer !important;
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .validation-error-notification,
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 1rem;
            z-index: 10000;
            min-width: 300px;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .notification.fade-out {
            opacity: 0;
            transform: translateX(100%);
        }
        
        .notification-success {
            border-left: 4px solid #4facfe;
        }
        
        .notification-error {
            border-left: 4px solid #fa709a;
        }
        
        .validation-error-notification {
            border-left: 4px solid #fa709a;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            color: white;
        }
        
        .notification-content i {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .close-notification {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .close-notification:hover {
            opacity: 1;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .summary-item {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .summary-label {
            font-size: 0.9rem;
            color: #a0a9c1;
            margin-bottom: 0.5rem;
        }
        
        .summary-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
        }
        
        .recommendations {
            margin-top: 1.5rem;
        }
        
        .recommendations h4 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .recommendations-list {
            list-style: none;
            padding: 0;
            display: grid;
            gap: 0.75rem;
        }
        
        .recommendations-list li {
            padding: 0.75rem 1rem;
            background: rgba(79, 172, 254, 0.1);
            border-radius: 8px;
            border-left: 3px solid #4facfe;
            color: #e0e6ed;
            position: relative;
            transition: all 0.2s ease;
        }
        
        .recommendations-list li:hover {
            background: rgba(79, 172, 254, 0.15);
            transform: translateX(4px);
        }
        
        .recommendations-list li::before {
            content: '💡';
            position: absolute;
            left: -1.5rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
                max-width: none;
            }
            
            .summary-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced form validation with real-time feedback
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error states
    field.classList.remove('error', 'success');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on field type
    switch (field.id) {
        case 'mobileNo':
            const mobileRegex = /^[6-9]\d{9}$/;
            if (value && !mobileRegex.test(value)) {
                isValid = false;
                errorMessage = 'Enter valid 10-digit mobile number';
            }
            break;
        case 'emailId':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Enter valid email address';
            }
            break;
    }
    
    // Apply visual feedback
    if (value && field.required) {
        if (isValid) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        enhanceFormValidation();
    }, 500);
});
