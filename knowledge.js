// Climate zones data
const climateZones = {
    tropical: {
        characteristics: {
            temperature: 'Warm year-round',
            rainfall: 'High rainfall',
            growingSeasons: 'Year-round growing possible'
        },
        recommendedCrops: ['banana', 'papaya', 'cassava', 'taro', 'sweet potato'],
        seasonalTips: {
            rainy: 'Focus on drainage and disease prevention',
            dry: 'Implement irrigation and mulching'
        }
    },
    temperate: {
        characteristics: {
            temperature: 'Distinct seasons',
            rainfall: 'Moderate rainfall',
            growingSeasons: 'Spring to Fall growing season'
        },
        recommendedCrops: ['tomatoes', 'lettuce', 'carrots', 'apples', 'wheat'],
        seasonalTips: {
            spring: 'Start cool-season crops',
            summer: 'Maintain regular watering',
            fall: 'Prepare for frost protection',
            winter: 'Plan for next season'
        }
    },
    mediterranean: {
        characteristics: {
            temperature: 'Mild winters, warm summers',
            rainfall: 'Winter rain, dry summers',
            growingSeasons: 'Long growing season'
        },
        recommendedCrops: ['olives', 'grapes', 'citrus', 'figs', 'almonds'],
        seasonalTips: {
            winter: 'Plant rain-fed crops',
            summer: 'Focus on drought-tolerant species'
        }
    },
    arid: {
        characteristics: {
            temperature: 'Hot days, cool nights',
            rainfall: 'Low rainfall',
            growingSeasons: 'Dependent on irrigation'
        },
        recommendedCrops: ['dates', 'pomegranate', 'drought-resistant herbs', 'succulents'],
        seasonalTips: {
            general: 'Prioritize water conservation',
            summer: 'Provide shade for sensitive crops'
        }
    }
};

// Farming topics data
const farmingTopics = {
    // Vegetables
    vegetables: {
        keywords: ['vegetable', 'vegetables', 'crops', 'veggies'],
        subtopics: {
            leafyGreens: {
                title: 'Leafy Greens',
                content: 'Best leafy greens for beginners: lettuce, spinach, kale, and Swiss chard. They grow quickly and can be harvested multiple times.',
                growthPeriod: '30-45 days',
                difficulty: 'Easy'
            },
            rootVegetables: {
                title: 'Root Vegetables',
                content: 'Carrots, radishes, and beetroot are excellent root vegetables. They need loose, well-draining soil and regular watering.',
                growthPeriod: '50-70 days',
                difficulty: 'Moderate'
            },
            tomatoes: {
                title: 'Tomatoes',
                content: 'Tomatoes need full sun and sturdy support. Choose between determinate (bush) or indeterminate (vining) varieties.',
                growthPeriod: '60-80 days',
                difficulty: 'Moderate'
            }
        }
    },

    fruits: {
        keywords: ['fruit', 'fruits', 'berries', 'orchard'],
        subtopics: {
            berries: {
                title: 'Berry Fruits',
                content: 'Strawberries, raspberries, and blueberries are perfect for home gardens. They need acidic soil and good drainage.',
                growthPeriod: 'Perennial',
                difficulty: 'Moderate'
            },
            treeFruits: {
                title: 'Tree Fruits',
                content: 'Apples, pears, and plums require proper spacing and pruning. Consider dwarf varieties for small spaces.',
                growthPeriod: '3-5 years to fruit',
                difficulty: 'Advanced'
            }
        }
    },

    grains: {
        keywords: ['grain', 'grains', 'wheat', 'corn', 'cereals'],
        subtopics: {
            corn: {
                title: 'Corn Growing',
                content: 'Plant corn in blocks rather than rows for better pollination. Needs rich soil and consistent moisture.',
                growthPeriod: '60-100 days',
                difficulty: 'Moderate'
            },
            wheat: {
                title: 'Wheat Cultivation',
                content: 'Wheat requires large spaces and full sun. Spring wheat is planted in early spring, winter wheat in fall.',
                growthPeriod: '90-120 days',
                difficulty: 'Advanced'
            }
        }
    },

    // Planting schedules
    plantingSchedules: {
        keywords: ['when to plant', 'planting time', 'schedule', 'timing', 'season'],
        seasons: {
            spring: {
                title: 'Spring Planting',
                content: 'Plant cool-season crops in early spring: peas, lettuce, spinach. Plant warm-season crops after last frost: tomatoes, peppers.',
                timing: 'March-May'
            },
            summer: {
                title: 'Summer Planting',
                content: 'Plant heat-loving crops: beans, cucumbers, squash. Start fall crops in late summer.',
                timing: 'June-August'
            },
            fall: {
                title: 'Fall Planting',
                content: 'Plant cool-season crops again: lettuce, spinach, root vegetables. Plant garlic and spring bulbs.',
                timing: 'September-November'
            }
        }
    },

    // Soil management
    soilManagement: {
        keywords: ['soil', 'compost', 'fertilizer', 'nutrients'],
        subtopics: {
            soilTypes: {
                title: 'Soil Types',
                content: 'Common soil types: clay, sandy, loam. Test soil pH and amend accordingly.',
                recommendations: 'Add organic matter to improve any soil type.'
            },
            composting: {
                title: 'Composting Guide',
                content: 'Mix green materials (kitchen scraps, grass) with brown materials (leaves, paper) in layers.',
                tips: 'Maintain moisture and turn regularly.'
            },
            fertilizing: {
                title: 'Fertilizing Tips',
                content: 'Use balanced NPK fertilizer for general growth. Specific ratios for different growth stages.',
                schedule: 'Apply every 4-6 weeks during growing season.'
            }
        }
    },

    // Pest control
    pestControl: {
        keywords: ['pests', 'insects', 'disease', 'problems'],
        commonIssues: {
            aphids: {
                title: 'Aphid Control',
                symptoms: 'Curled leaves, sticky residue',
                solutions: 'Spray with soapy water, introduce ladybugs'
            },
            blight: {
                title: 'Blight Management',
                symptoms: 'Brown spots on leaves, rotting',
                solutions: 'Remove affected plants, improve air circulation'
            },
            mildew: {
                title: 'Powdery Mildew',
                symptoms: 'White powdery coating on leaves',
                solutions: 'Neem oil spray, reduce humidity'
            }
        }
    },

    // Irrigation
    irrigation: {
        keywords: ['water', 'watering', 'irrigation', 'moisture'],
        methods: {
            drip: {
                title: 'Drip Irrigation',
                content: 'Efficient water delivery directly to roots. Best for vegetables and rows.',
                setup: 'Install main line with drip tubes to each plant.'
            },
            sprinkler: {
                title: 'Sprinkler Systems',
                content: 'Good for large areas and lawns. Water early morning to reduce evaporation.',
                types: 'Oscillating, impact, or rotating sprinklers'
            }
        }
    },

    // Organic farming
    organicFarming: {
        keywords: ['organic', 'natural', 'chemical-free'],
        practices: {
            naturalPestControl: {
                title: 'Natural Pest Control',
                content: 'Use companion planting and beneficial insects. Make natural sprays from neem or garlic.',
                examples: 'Marigolds repel pests, basil improves tomato growth'
            },
            soilHealth: {
                title: 'Organic Soil Care',
                content: 'Build soil health with compost, cover crops, and crop rotation.',
                methods: 'Green manure, mulching, natural amendments'
            }
        }
    },

    // Urban gardening
    urbanGardening: {
        keywords: ['urban', 'container', 'small space', 'balcony'],
        techniques: {
            containerGrowing: {
                title: 'Container Growing',
                content: 'Choose appropriate containers with drainage. Use quality potting mix.',
                bestCrops: 'Herbs, tomatoes, peppers, leafy greens'
            },
            verticalGardening: {
                title: 'Vertical Growing',
                content: 'Maximize space with trellises, wall planters, and hanging baskets.',
                plants: 'Climbing peas, cucumbers, pole beans'
            }
        }
    }
};

// Seasonal planting data
const seasonalPlanting = {
    spring: {
        crops: ['lettuce', 'spinach', 'peas', 'radishes', 'carrots'],
        tips: 'Start cool-season crops early, prepare for warm-season planting'
    },
    summer: {
        crops: ['tomatoes', 'peppers', 'beans', 'cucumbers', 'squash'],
        tips: 'Plant heat-loving crops, maintain consistent watering'
    },
    fall: {
        crops: ['lettuce', 'spinach', 'kale', 'turnips', 'garlic'],
        tips: 'Second planting of cool-season crops, prepare for winter'
    },
    winter: {
        crops: ['winter wheat', 'cover crops', 'greenhouse vegetables'],
        tips: 'Plan for next season, maintain greenhouse crops'
    }
};

// Utility: random picker
function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper functions
// Function: findRelevantTopics
function findRelevantTopics(userInput) {
    const normalized = (userInput || '').toLowerCase().trim();

    // Small-talk detection
    if (/^(hi|hello|hey|yo|sup|hiya|good (morning|afternoon|evening))\b/.test(normalized)) {
        return ['greetings'];
    }
    if (/\b(thanks|thank you|thankyou|thank u|thx|ty|much obliged|appreciate|cheers|thanks a lot)\b/.test(normalized)) {
        return ['gratitude'];
    }
    if (/\b(bye|goodbye|see (ya|you)|later|take care|cya|catch you (later|soon))\b/.test(normalized)) {
        return ['farewell'];
    }

    // Distinct intent: crop recommendations (“what to plant / grow”)
    const cropIntent = /\b(what (to )?plant|what plant to grow|what should i grow|best crops|which crops|recommend (a )?crop|what can i grow|plant now|good crops (for|in)|crops for (spring|summer|fall|autumn|winter))\b/.test(normalized);
    if (cropIntent) {
        return ['cropRecommendations'];
    }

    // General planting intent (keeps your existing guide)
    const plantingIntent = /\b(plant|planting|how to plant|sow|sowing|seed|seeding|transplant|spacing|depth|germination|start seeds|grow|planting guide|plant guide)\b/.test(normalized);
    if (plantingIntent && farmingTopics['plantingSchedules']) {
        return ['plantingSchedules'];
    }

    // Keyword-scored fallback
    const scores = {};
    for (const [topicKey, topic] of Object.entries(farmingTopics)) {
        const kws = Array.isArray(topic.keywords) ? topic.keywords : [];
        let score = 0;
        for (const kw of kws) {
            if (normalized.includes(kw)) score += 1;
        }
        if (score > 0) scores[topicKey] = score;
    }
    const ranked = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    return ranked;
}

// Function: generateResponse
function generateResponse(topicKey, userInput = '') {
    const text = (userInput || '').toLowerCase();

    // Small talk replies
    if (topicKey === 'greetings') {
        if (/\b(how are you|how’s it going|how are u)\b/.test(text)) {
            return "I'm doing great and ready to help with your farm! Ask me about planting, soil, watering, or what grows best in your season.";
        }
        if (/\b(who are you|what are you|who r u)\b/.test(text)) {
            return "I'm your Smart Farm Assistant. I help with crop choices, planting schedules, soil improvements, watering plans, and seasonal tips tailored by location.";
        }
        if (/\b(help|what can you do|what can i ask|how do you help)\b/.test(text)) {
            return [
                "I can help you:",
                "- Pick crops for your climate and season",
                "- Create practical planting steps",
                "- Improve soil and watering routines",
                "- Troubleshoot common issues like pests or poor germination",
                "Try: “best crops for summer”, “how to plant tomatoes”, “improve clay soil”."
            ].join('\n');
        }
        return [
            'Hi! 👋 I’m your Smart Farm Assistant — happy to help.',
            'Ask about crops, soil, irrigation, weather, or seasonal planning.',
            'Try: “best crops for summer”, “fix compacted soil”, “watering schedule for tomatoes”.'
        ].join('\n');
    }
    if (topicKey === 'gratitude') {
        return pickOne([
            "You're welcome! 🌱 Anything else you'd like to know?",
            "Happy to help! Let me know if you have other garden questions.",
            "Glad I could help! What else are you growing?"
        ]);
    }
    if (topicKey === 'farewell') {
        return 'Goodbye! Come back anytime for planting guides and tips.';
    }

    // General planting guide (answers “how to plant” and related)
    const plantingIntent = /\b(plant|planting|how to plant|sow|sowing|seed|seeding|transplant|spacing|depth|germination|start seeds|grow|planting guide|plant guide)\b/.test(text);
    if (topicKey === 'plantingSchedules' || plantingIntent) {
        const cropGuides = {
            tomatoes: {
                timing: 'Plant after frost; transplant when seedlings have 5–7 true leaves.',
                spacing: '45–60 cm between plants, 75–90 cm between rows.',
                depth: 'Transplant deep enough to cover roots and a portion of stem.',
                water: 'Keep soil consistently moist; avoid wetting foliage.',
                notes: 'Provide stakes/cages; pinch suckers if using indeterminate varieties.'
            },
            lettuce: {
                timing: 'Cool-season crop; sow early spring or autumn.',
                spacing: '20–30 cm between plants.',
                depth: 'Sow shallow (≈ 6–12 mm).',
                water: 'Regular, light watering to maintain even moisture.',
                notes: 'Prefers partial shade in warm climates; bolt risk in heat.'
            },
            carrots: {
                timing: 'Sow in early spring or autumn for cool climates.',
                spacing: 'Thin to 5–8 cm between plants; 25–30 cm rows.',
                depth: 'Sow 6–12 mm deep in loose, stone-free soil.',
                water: 'Keep evenly moist until germination (slow to sprout).',
                notes: 'Avoid fresh manure; it causes forked roots.'
            },
            beans: {
                timing: 'Warm-season; sow after soil warms (≥ 15°C).',
                spacing: 'Bush: 10–15 cm; pole: 20–30 cm; 45–60 cm rows.',
                depth: 'Sow 2–3 cm deep.',
                water: 'Moderate water; avoid waterlogging.',
                notes: 'Provide trellis for pole beans; inoculate for better nodulation if available.'
            }
        };

        let crop = null;
        for (const key of Object.keys(cropGuides)) {
            if (text.includes(key)) {
                crop = key;
                break;
            }
        }
        const cropSection = crop
            ? pickOne([
                `\n\nQuick guide for ${crop}:\n- ${cropGuides[crop].timing}\n- ${cropGuides[crop].spacing}\n- ${cropGuides[crop].water}`,
                `\n\n${crop.charAt(0).toUpperCase() + crop.slice(1)} tips:\n- ${cropGuides[crop].timing}\n- ${cropGuides[crop].depth}\n- ${cropGuides[crop].notes}`,
                `\n\nFor ${crop}:\n- When: ${cropGuides[crop].timing}\n- How: ${cropGuides[crop].depth}\n- Care: ${cropGuides[crop].water}`
              ])
            : '';

        return pickOne([
            `Here's your planting guide:\n\n• Choose sunny spot (6-8 hours sunlight)\n• Prepare soil with compost 2-3 weeks ahead\n• Plant cool-season crops in spring/fall\n• Plant warm-season crops after frost\n• Follow seed packet spacing guidelines\n• Water consistently, especially during germination\n• Add 2-5cm mulch to retain moisture\n\nNeed specific crop tips? Just ask!${cropSection}`,
            
            `Planting essentials:\n\n• Full sun location with well-drained soil\n• Mix in compost to enrich the soil\n• Cool-season crops: lettuce, carrots, peas\n• Warm-season crops: tomatoes, beans, peppers\n• Water at soil level, avoid wetting leaves\n• Support plants that need staking\n\nWhat are you growing?${cropSection}`,
            
            `Step-by-step planting:\n\n1) Select sunny area with good drainage\n2) Loosen soil and add organic matter\n3) Plant seeds at correct depth\n4) Space plants properly to avoid crowding\n5) Water gently after planting\n6) Apply mulch around established plants\n\nTell me your crop for tailored advice!${cropSection}`
        ]);
    }
    const topic = farmingTopics[topicKey];
    if (!topic) return "I'm not sure about that. Can you ask about vegetables, soil, or irrigation?";

    let response = '';
    if (topic.subtopics) {
        const subtopicKeys = Object.keys(topic.subtopics);
        const randomSubtopic = topic.subtopics[subtopicKeys[0]];
        response = `${randomSubtopic.title}: ${randomSubtopic.content}`;
    } else if (topic.seasons) {
        const seasonKeys = Object.keys(topic.seasons);
        const randomSeason = topic.seasons[seasonKeys[0]];
        response = `${randomSeason.title}: ${randomSeason.content}`;
    } else if (topic.methods) {
        const methodKeys = Object.keys(topic.methods);
        const randomMethod = topic.methods[methodKeys[0]];
        response = `${randomMethod.title}: ${randomMethod.content}`;
    } else if (topic.practices) {
        const practiceKeys = Object.keys(topic.practices);
        const randomPractice = topic.practices[practiceKeys[0]];
        response = `${randomPractice.title}: ${randomPractice.content}`;
    } else if (topic.techniques) {
        const techniqueKeys = Object.keys(topic.techniques);
        const randomTechnique = topic.techniques[techniqueKeys[0]];
        response = `${randomTechnique.title}: ${randomTechnique.content}`;
    } else if (topic.commonIssues) {
        const issueKeys = Object.keys(topic.commonIssues);
        const randomIssue = topic.commonIssues[issueKeys[0]];
        response = `${randomIssue.title}: ${randomIssue.solutions}`;
    }

    return response || "I have information about that topic. What specifically would you like to know?";
}

function determineClimateZone(latitude) {
    if (latitude === undefined || latitude === null) return 'temperate';
    
    const absLat = Math.abs(latitude);
    if (absLat <= 23.5) return 'tropical';
    if (absLat <= 35) return 'mediterranean';
    if (absLat <= 66.5) return 'temperate';
    return 'arid';
}

function getCurrentSeason(latitude, month = new Date().getMonth()) {
    if (latitude === undefined || latitude === null) return 'spring';
    
    const seasons = {
        northern: {
            spring: [2, 3, 4],    // March to May
            summer: [5, 6, 7],    // June to August
            fall: [8, 9, 10],     // September to November
            winter: [11, 0, 1]    // December to February
        },
        southern: {
            spring: [8, 9, 10],   // September to November
            summer: [11, 0, 1],   // December to February
            fall: [2, 3, 4],      // March to May
            winter: [5, 6, 7]     // June to August
        }
    };
    
    const hemisphere = latitude >= 0 ? 'northern' : 'southern';
    const currentSeasons = seasons[hemisphere];
    
    for (const [season, months] of Object.entries(currentSeasons)) {
        if (months.includes(month)) {
            return season;
        }
    }
    
    return 'spring';
}

const locationBasedFarming = {
    getRecommendations(latitude, longitude, season) {
        const zone = determineClimateZone(latitude);
        const currentSeason = season || getCurrentSeason(latitude);
        
        const recommendations = {
            zone,
            season: currentSeason,
            recommendedCrops: [],
            seasonalTips: ''
        };
        
        if (climateZones[zone]) {
            recommendations.recommendedCrops = climateZones[zone].recommendedCrops;
            recommendations.seasonalTips = climateZones[zone].seasonalTips[currentSeason] || 
                                         climateZones[zone].seasonalTips.general || 
                                         'Focus on crops suitable for your climate zone.';
        }
        
        return recommendations;
    }
};

// General-answer fallback for common gardening questions
function answerGeneralQuestion(userInput = '') {
    const text = userInput.toLowerCase();

    // Watering schedules
    if (/\b(water|watering|irrigation|schedule)\b/.test(text)) {
        return (
`Watering fundamentals:
- Seedlings: keep top 2–3 cm moist; frequent, light watering.
- Established plants: deep water 1–2×/week; adjust for heat/wind.
- Morning watering reduces disease; water at the base.
- Mulch 2–5 cm to stabilize moisture and reduce frequency.
- Check soil: if the top 2–3 cm are dry, it’s time to water.
- Drip or soaker hoses are efficient and reduce foliage wetting.`
        );
    }

    // Soil improvement
    if (/\b(soil|compost|mulch|pH|clay|sandy|drainage|fertility)\b/.test(text)) {
        return (
`Soil improvement plan:
- Structure: add compost; for clay mix coarse sand and organic matter; for sandy add compost and biochar.
- pH: most veggies prefer 6.0–7.0; use lime to raise, sulfur to lower (test first).
- Drainage: raised beds, avoid compaction; incorporate organic matter.
- Fertility: balanced fertilizer or compost; avoid over-fertilizing (salt buildup).
- Ongoing: mulch 2–5 cm, rotate crops, use cover crops.`
        );
    }

    // Spacing
    if (/\b(spacing|distance|depth|row spacing)\b/.test(text)) {
        return (
`General spacing & depth:
- Leafy greens: 20–30 cm plants, shallow sow (6–12 mm).
- Root crops: thin to 5–8 cm; rows 25–30 cm; shallow sow.
- Fruiting crops (tomatoes/peppers): 45–60 cm plants; rows 75–90 cm; transplant deep enough to cover roots.
- Vining (cucumbers/squash): 60–120 cm plants; trellis for space saving.`
        );
    }

    // Pest control
    if (/\b(pest|aphid|caterpillar|whitefly|snail|slug|borer|mite)\b/.test(text)) {
        return (
`Integrated pest management:
- Identify pest and threshold; hand-pick or trap early.
- Encourage beneficials (ladybugs, lacewings); avoid broad-spectrum sprays.
- Cultural: rotate, clean debris, avoid overfertilizing.
- Spot-treat only as needed (neem/insecticidal soap); follow labels.`
        );
    }

    // Fertilizer
    if (/\b(fertilizer|feed|npk|nitrogen|phosphorus|potassium)\b/.test(text)) {
        return (
`Fertilizing guidelines:
- Leafy crops: more nitrogen early; avoid excess (soft growth, pests).
- Fruiting crops: balanced feed; add phosphorus/potassium at bud set.
- Root crops: moderate nitrogen to avoid forked/hairy roots.
- Use soil tests; side-dress compost during growth; don’t over-apply.`
        );
    }

    // Seed starting
    if (/\b(seed starting|start seeds|germination|seed tray|hardening off)\b/.test(text)) {
        return (
`Seed starting:
- Use sterile mix; sow at recommended depth; keep evenly moist.
- Provide warmth and light; thin crowded seedlings.
- Harden off 7–10 days before transplant (gradual outdoor exposure).
- Transplant on cloudy days or late afternoon; water in well.`
        );
    }

    // Default help text
    return (
`I can help with planting, watering, soil, spacing, pests, fertilizer, and seed starting.
Try: “how to plant tomatoes”, “watering schedule for beans”, “improve clay soil”, “spacing for lettuce”.
If you share your location (latitude) I can tailor seasonal timing.`
    );
}

// Export all required functions and data
export {
    farmingTopics,
    climateZones,
    seasonalPlanting,
    findRelevantTopics,
    generateResponse,
    determineClimateZone,
    getCurrentSeason,
    locationBasedFarming,
    answerGeneralQuestion
}