// A tiny, self-contained enhancer. No DOM or external imports.
export function classifyIntent(text) {
    const t = (text || '').toLowerCase().trim();
    const isGreeting = /^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/.test(t);
    const isThanks = /\b(thanks|thank you|appreciate|cheers)\b/.test(t);
    const isGoodbye = /\b(bye|goodbye|see (ya|you)|later|take care)\b/.test(t);
    const isHelp = /\b(help|what can you do|how (do|can) you help)\b/.test(t);
    const isIdentity = /\b(who are you|what are you)\b/.test(t);

    if (isGreeting) return 'greeting';
    if (isThanks) return 'thanks';
    if (isGoodbye) return 'goodbye';
    if (isHelp) return 'help';
    if (isIdentity) return 'identity';
    return 'default';
}

export function enhanceResponse(originalText, context = {}, options = {}) {
    const { intent = 'default', input = '' } = options;
    const { climateZone, currentSeason, location } = context || {};

    // Conversational branches for short phrases
    if (intent === 'greeting') {
        return [
            'Hi! I’m your Smart Farm Assistant — happy to help.',
            'I can guide you on crops, soil, irrigation, weather, and seasonal planning.',
            'Ask things like: “best crops for summer”, “how to improve soil”, or “watering schedule for tomatoes”.'
        ].join('\n');
    }

    if (intent === 'thanks') {
        return [
            "You're welcome! If you’d like, I can suggest next steps:",
            '- Optimize watering based on this week’s forecast',
            '- Plan a 4-week soil improvement routine',
            '- Pick 2–3 crops matched to your climate zone',
            'What would you like to do next?'
        ].join('\n');
    }

    if (intent === 'goodbye') {
        return [
            'Goodbye! Wishing you great yields.',
            'Come back any time — I’ll remember your season and climate tips.'
        ].join('\n');
    }

    if (intent === 'help' || intent === 'identity') {
        return [
            'I’m an AI assistant focused on smart, practical farming.',
            'I provide planting guidance, soil care, pest control, irrigation tips, and weather-aware advice.',
            'Tell me your goal, e.g. “grow tomatoes” or “improve sandy soil”, and I’ll outline steps.'
        ].join('\n');
    }

    // Make topic replies longer and more actionable
    const lines = [];
    if (originalText) {
        lines.push(originalText);
    }

    // Context-aware add-ons (if you detected location/season already)
    if (climateZone || currentSeason) {
        const zoneLine = climateZone ? `Climate Zone: ${climateZone}` : null;
        const seasonLine = currentSeason ? `Season: ${currentSeason}` : null;
        const locLine = location ? `Location: ${location.city}, ${location.country}` : null;

        lines.push(
            ['\nContext', [zoneLine, seasonLine, locLine].filter(Boolean).join(' · ')].filter(Boolean).join(' — ')
        );
    }

    // Action plan scaffold
    lines.push('Here’s a simple plan:');
    lines.push('- Prepare: check soil moisture and drainage; clear weeds and debris.');
    lines.push('- Plant/maintain: follow spacing, watering rhythm, and mulch where needed.');
    lines.push('- Monitor: look for stress signs (leaf curl, discoloration), adjust watering/fertilizer.');
    lines.push('- Improve: add organic matter and update irrigation schedule weekly.');

    // Offer next questions to keep the conversation flowing
    lines.push('\nYou can ask:');
    lines.push('- “What should I plant this month?”');
    lines.push('- “How often should I water [crop]?”');
    lines.push('- “How to improve [soil type] soil?”');

    return lines.join('\n');
}