// Import required functions from knowledge.js
import {
    farmingTopics,
    climateZones,
    determineClimateZone,
    getCurrentSeason,
    findRelevantTopics,
    generateResponse,
    locationBasedFarming,
    seasonalPlanting,
    answerGeneralQuestion
} from './knowledge.js';

// Theme management
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Loading animation component
function createLoadingIndicator() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<span></span><span></span><span></span>';
    return loading;
}

// Helper function for location lookup
async function getLocationFromCoordinates(latitude, longitude) {
    const baseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&addressdetails=1`;
    const fallbacks = [
        (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
        (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`
    ];

    const parseLocation = (data) => ({
        city: data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.neighbourhood ||
              data.address?.suburb ||
              data.address?.county ||
              'Unknown',
        country: data.address?.country || 'Unknown',
        latitude,
        longitude
    });

    // Try direct request first
    try {
        const res = await fetch(baseUrl, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return parseLocation(data);
    } catch (err) {
        console.warn('Direct reverse geocode failed; attempting CORS proxies:', err?.message || err);
        // Try proxies
        for (const toUrl of fallbacks) {
            try {
                const proxied = toUrl(baseUrl);
                const res = await fetch(proxied, { headers: { Accept: 'application/json' } });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                return parseLocation(data);
            } catch (proxyErr) {
                console.warn('Proxy attempt failed:', proxyErr?.message || proxyErr);
            }
        }
        console.error('All location lookups failed.');
        return null;
    }
}

// Helper function to add messages with animation
function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('messages');
    if (!messagesContainer) {
        console.error('Messages container not found (#messages)');
        return null;
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;

    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';

    messagesContainer.appendChild(messageDiv);

    // Trigger animation
    requestAnimationFrame(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return messageDiv;
}

class FarmChatbot {
    constructor() {
        this.context = {
            currentTopic: null,
            previousQuestions: [],
            previousResponses: [],
            conversationHistory: [],
            userPreferences: {},
            location: null,
            climateZone: null,
            currentSeason: null,
            currentDate: new Date(),
            memoryLimit: 50 // Keep last 50 interactions
        };
    }

    // Add lightweight memory and reasoning helpers
    addToMemory(userInput, response) {
        this.context.conversationHistory.push({
            input: userInput,
            response: response,
            timestamp: new Date(),
            topic: this.context.currentTopic
        });
        if (this.context.conversationHistory.length > this.context.memoryLimit) {
            this.context.conversationHistory.shift();
        }
    }

    extractUserPreferences(input) {
        const preferences = {};
        if (input.match(/\b(beginner|new|just started|learning)\b/)) {
            preferences.experienceLevel = 'beginner';
        } else if (input.match(/\b(experienced|advanced|expert|professional)\b/)) {
            preferences.experienceLevel = 'advanced';
        }
        const cropMatches = input.match(/\b(tomato|carrot|lettuce|pepper|bean|corn|wheat|rice|potato|onion)\b/gi);
        if (cropMatches) preferences.favoriteCrops = [...new Set(cropMatches.map(c => c.toLowerCase()))];
        if (input.match(/\b(indoor|greenhouse|container|balcony)\b/)) {
            preferences.growingStyle = 'container/indoor';
        } else if (input.match(/\b(outdoor|garden|field|farm)\b/)) {
            preferences.growingStyle = 'outdoor';
        }
        Object.assign(this.context.userPreferences, preferences);
    }

    getRelevantContext(currentInput) {
        const relevant = [];
        const currentWords = currentInput.toLowerCase().split(/\s+/);
        for (let i = this.context.conversationHistory.length - 1; i >= 0; i--) {
            const history = this.context.conversationHistory[i];
            const historyWords = history.input.toLowerCase().split(/\s+/);
            const commonWords = currentWords.filter(w => historyWords.includes(w) && w.length > 3);
            if (commonWords.length > 0 || history.topic === this.context.currentTopic) {
                relevant.push(history);
            }
            if (relevant.length >= 3) break;
        }
        return relevant;
    }

    isRelatedTopic(currentInput, previousTopic) {
        const relatedKeywords = {
            planting: ['seed', 'grow', 'plant', 'sow', 'germinate'],
            watering: ['water', 'irrigate', 'moisture', 'drain'],
            soil: ['soil', 'compost', 'fertilizer', 'nutrient', 'ph'],
            pest: ['pest', 'bug', 'insect', 'disease', 'fungus'],
            harvest: ['harvest', 'pick', 'ripe', 'ready']
        };
        if (!previousTopic) return false;
        const inputLower = currentInput.toLowerCase();
        const relatedWords = relatedKeywords[previousTopic] || [];
        return relatedWords.some(word => inputLower.includes(word));
    }

    analyzeIntent(input) {
        const intents = {
            greeting: /\b(hello|hi|hey|good morning|good afternoon|good evening)\b/i,
            question: /\b(how|what|when|where|why|which|can|should|do|does)\b.*\?$/i,
            problem: /\b(problem|issue|wrong|dying|sick|help|trouble)\b/i,
            planning: /\b(plan|want to|thinking|consider|should i)\b/i,
            comparison: /\b(compare|versus|vs|better|best|difference)\b/i,
            followup: /\b(and|also|more|another|what about|tell me more)\b/i
        };
        for (const [intent, pattern] of Object.entries(intents)) {
            if (pattern.test(input)) return intent;
        }
        return 'general';
    }

    extractEntities(input) {
        return {
            crops: input.match(/\b(tomato|carrot|lettuce|pepper|bean|corn|wheat|rice|potato|onion|herb|fruit|vegetable)s?\b/gi) || [],
            seasons: input.match(/\b(spring|summer|fall|autumn|winter)\b/gi) || [],
            numbers: input.match(/\b\d+\b/g) || [],
            measurements: input.match(/\b(inch|feet|cm|meter|yard|acre|gallon|liter)s?\b/gi) || [],
            timeframes: input.match(/\b(day|week|month|year|season)s?\b/gi) || []
        };
    }

    enhanceWithContext(response, relevantContext) {
        if (relevantContext.length === 0) return response;
        let enhanced = response;
        const lastContext = relevantContext[relevantContext.length - 1];
        if (this.isRelatedTopic(lastContext.input, lastContext.topic)) {
            enhanced += "\n\nContinuing from your previous question:";
        }
        if (this.context.userPreferences.experienceLevel === 'beginner') {
            enhanced = enhanced.replace(/\b(ensure|make sure|verify)\b/gi, 'remember');
            enhanced = enhanced.replace(/\b(optimal|ideal)\b/gi, 'best');
        }
        return enhanced;
    }

    // Update processInput to use reasoning, memory, and personalization
    processInput(userInput) {
        const input = userInput.toLowerCase();

        // Reasoning pipeline: preferences, entities, intent, context
        this.extractUserPreferences(input);
        const entities = this.extractEntities(input);
        const intent = this.analyzeIntent(input);
        const relevantContext = this.getRelevantContext(input);
        const isFollowUp = relevantContext.length > 0 && this.isRelatedTopic(input, relevantContext[0]?.topic);

        this.context.previousQuestions.push(input);

        const relevantTopics = findRelevantTopics(input);
        if (relevantTopics.length > 0) {
            const topic = relevantTopics[0];
            this.context.currentTopic = topic;

            if (topic === 'cropRecommendations') {
                const seasonMatch = input.match(/\b(spring|summer|fall|autumn|winter)\b/);
                const seasonOverride = seasonMatch ? (seasonMatch[0].toLowerCase() === 'autumn' ? 'fall' : seasonMatch[0].toLowerCase()) : null;

                const info = locationBasedFarming.getRecommendations(
                    this.context.location?.latitude,
                    this.context.location?.longitude,
                    seasonOverride || this.context.currentSeason
                );

                const cropsList = (info.recommendedCrops || []).map(c => `- ${c}`).join('\n');
                const zoneLabel = this.context.climateZone || info.zone;
                const seasonLabel = info.season;

                let textOut = [
                    `Crop recommendations for ${seasonLabel} in ${zoneLabel} zone:`,
                    cropsList || '- Focus on crops suitable for your zone and season.',
                    '',
                    `Tips: ${info.seasonalTips || 'Pick varieties suited to your climate and timing.'}`,
                    '',
                    'Share your latitude for finer tuning, or click “Detect Location”.'
                ].join('\n');

                if (this.context.userPreferences.experienceLevel === 'beginner') {
                    textOut += `\n\nStarter-friendly: lettuce, radishes, bush beans, and basil.`;
                }

                // Context-aware enhancement if smartResponder is loaded
                if (typeof enhanceResponse === 'function') {
                    textOut = enhanceResponse(textOut, {
                        intent,
                        entities,
                        context: relevantContext,
                        preferences: this.context.userPreferences
                    });
                }

                this.addToMemory(userInput, textOut);
                return { text: textOut };
            }

            // Default branch: knowledge-based response + enhancement
            let response = generateResponse(relevantTopics[0], input);
            response = this.enhanceWithContext(response, relevantContext);

            if (this.context.location && this.context.climateZone) {
                const locationInfo = locationBasedFarming.getRecommendations(
                    this.context.location.latitude,
                    this.context.location.longitude,
                    this.context.currentSeason
                );
                response = `${response}\n\nBased on your location (${this.context.climateZone} zone):\n${locationInfo.seasonalTips}`;
            }

            if (typeof enhanceResponse === 'function') {
                response = enhanceResponse(response, {
                    intent,
                    entities,
                    context: relevantContext,
                    preferences: this.context.userPreferences
                });
            }

            this.addToMemory(userInput, response);
            return { text: response };
        }

        // Fallback: general question handling + enhancement
        let general = answerGeneralQuestion(input);
        general = this.enhanceWithContext(general, relevantContext);

        if (this.context.location && this.context.climateZone) {
            const locationInfo = locationBasedFarming.getRecommendations(
                this.context.location.latitude,
                this.context.location.longitude,
                this.context.currentSeason
            );
            general = `${general}\n\nBased on your location (${this.context.climateZone} zone):\n${locationInfo.seasonalTips}`;
        }

        if (typeof enhanceResponse === 'function') {
            general = enhanceResponse(general, {
                intent,
                entities,
                context: relevantContext,
                preferences: this.context.userPreferences
            });
        }

        this.addToMemory(userInput, general);
        return { text: general };
    }

    updateSeasonalInfo() {
        const dateDisplay = document.getElementById('currentDate');
        const seasonDisplay = document.getElementById('seasonDisplay');

        if (dateDisplay) {
            dateDisplay.textContent = `Current Date: ${this.context.currentDate.toLocaleDateString()}`;
        }
        if (seasonDisplay && this.context.currentSeason) {
            seasonDisplay.textContent = `Season: ${this.context.currentSeason}`;
        }

        this.generateMonthCards();
    }

    generateMonthCards() {
        const monthCards = document.getElementById('monthCards');
        if (!monthCards) return;

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const seasons = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer',
            'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'];

        monthCards.innerHTML = '';

        months.forEach((month, index) => {
            const card = document.createElement('div');
            card.className = 'month-card';
            card.innerHTML = `
                <div class="month-header">
                    <span class="month-name">${month}</span>
                    <span class="season-tag">${seasons[index]}</span>
                </div>
                <ul class="planting-recommendations">
                    <li>Seasonal planting recommendations</li>
                    <li>Weather considerations</li>
                    <li>Maintenance tasks</li>
                </ul>
            `;
            monthCards.appendChild(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing farm assistant...');

    // Initialize theme
    initializeTheme();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const chatbot = new FarmChatbot();

    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const detectLocationBtn = document.getElementById('detectLocation');
    const locationInput = document.getElementById('locationInput');
    const climateZoneSpan = document.getElementById('climateZone');
    const currentSeasonSpan = document.getElementById('currentSeason');

    if (!userInput || !sendButton) {
        console.error('Essential chat elements not found');
        return;
    }

    addMessage("Hello! I'm your Smart Farm Assistant. How can I help you with your farming questions?");

    sendButton.addEventListener('click', async () => {
        let loadingMessage = null;
        try {
            const text = userInput.value?.trim() || '';
            if (!text) return;

            addMessage(text, true);
            userInput.value = '';
            sendButton.disabled = true;

            loadingMessage = addMessage('');
            if (loadingMessage) {
                const loading = createLoadingIndicator();
                loadingMessage.appendChild(loading);
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await chatbot.processInput(text);

            if (loadingMessage && typeof loadingMessage.remove === 'function') {
                loadingMessage.remove();
            }
            addMessage(response?.text || 'I could not generate a response.');
        } catch (error) {
            console.error('Chat send error:', error);
            if (loadingMessage && typeof loadingMessage.remove === 'function') {
                loadingMessage.remove();
            }
            addMessage(`I encountered an error: ${error?.message || 'unknown'}. Please try again.`);
        } finally {
            sendButton.disabled = false;
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) {
                sendButton.click();
            }
        }
    });

    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', async () => {
            if ('geolocation' in navigator) {
                detectLocationBtn.disabled = true;
                const originalText = detectLocationBtn.innerHTML;
                detectLocationBtn.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';

                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            timeout: 10000,
                            enableHighAccuracy: true
                        });
                    });

                    const { latitude, longitude } = position.coords;
                    const locationDetails = await getLocationFromCoordinates(latitude, longitude);

                    if (locationDetails && locationInput) {
                        locationInput.value = `${locationDetails.city}, ${locationDetails.country}`;
                        const zone = determineClimateZone(latitude);
                        const season = getCurrentSeason(latitude);

                        if (climateZoneSpan) climateZoneSpan.textContent = zone;
                        if (currentSeasonSpan) currentSeasonSpan.textContent = season;

                        chatbot.context.location = locationDetails;
                        chatbot.context.climateZone = zone;
                        chatbot.context.currentSeason = season;
                        chatbot.updateSeasonalInfo();

                        addMessage(`Location detected: ${locationDetails.city}, ${locationDetails.country}. You are in the ${zone} climate zone, currently in ${season}.`);
                    }
                } catch (error) {
                    console.error('Error getting location:', error);
                    addMessage("Sorry, I couldn't detect your location. Please enter it manually.");
                } finally {
                    detectLocationBtn.disabled = false;
                    detectLocationBtn.innerHTML = originalText;
                }
            } else {
                addMessage("Sorry, location detection is not supported in your browser. Please enter your location manually.");
            }
        });
    }

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => item.setAttribute('href', 'javascript:void(0)'));

    sections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('active');
            section.style.display = 'block';
        } else {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });

    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach(nav => {
                nav.classList.remove('active');
                nav.setAttribute('aria-selected', 'false');
            });
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');

            sections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
                section.setAttribute('aria-hidden', 'true');
            });

            const sectionName = item.getAttribute('data-section');
            const targetSection = document.getElementById(`${sectionName}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
                targetSection.setAttribute('aria-hidden', 'false');
            } else {
                console.error(`Section not found: ${sectionName}-section`);
            }
        });
    });

    chatbot.updateSeasonalInfo();
    console.log('Farm assistant initialization complete');
});