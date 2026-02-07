document.addEventListener('DOMContentLoaded', () => {
    const aiAvatarButton = document.getElementById('ai-avatar-button');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const closeChatButton = document.getElementById('close-chat');
    const sendChatButton = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('ai-chat-body');
    const langButtons = document.querySelectorAll('.lang-btn');

    let currentLang = 'en';

    const responses = {
        en: {
            greeting: "Hello! How can I help you today? Ask me about services, portfolio, or booking.",
            services: "We offer fashion photography, catalog shoots, brand campaigns, and creative direction.",
            portfolio: "You can see our portfolio just above this chat. Let me know if you are looking for something specific.",
            booking: "To book a shoot, please contact us at contact@spotlightscreation.com.",
            default: "I'm sorry, I can only answer questions about services, portfolio, and booking. Please try one of those."
        },
        hi: {
            greeting: "नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ? सेवाओं, पोर्टफोलियो, या बुकिंग के बारे में पूछें।",
            services: "हम फैशन फोटोग्राफी, कैटलॉग शूट, ब्रांड अभियान और रचनात्मक दिशा प्रदान करते हैं।",
            portfolio: "आप इस चैट के ठीक ऊपर हमारा पोर्टफोलियो देख सकते हैं। यदि आप कुछ विशिष्ट ढूंढ रहे हैं तो मुझे बताएं।",
            booking: "शूट बुक करने के लिए, कृपया हमसे contact@spotlightscreation.com पर संपर्क करें।",
            default: "मुझे खेद है, मैं केवल सेवाओं, पोर्टफोलियो और बुकिंग के बारे में सवालों के जवाब दे सकता हूं। कृपया उनमें से एक का प्रयास करें।"
        },
        mr: {
            greeting: "नमस्कार! मी आज तुम्हाला कशी मदत करू शकेन? सेवा, पोर्टफोलिओ किंवा बुकिंगबद्दल विचारा.",
            services: "आम्ही फॅशन फोटोग्राफी, कॅटलॉग शूट, ब्रँड मोहिम आणि सर्जनशील दिशा देतो.",
            portfolio: "तुम्ही आमचा पोर्टफोलिओ या चॅटच्या वर पाहू शकता. तुम्ही काही विशिष्ट शोधत असाल तर मला कळवा.",
            booking: "शूट बुक करण्यासाठी, कृपया आमच्याशी contact@spotlightscreation.com वर संपर्क साधा.",
            default: "मला माफ करा, मी फक्त सेवा, पोर्टफोलिओ आणि बुकिंगबद्दलच्या प्रश्नांची उत्तरे देऊ शकेन. कृपया त्यापैकी एक प्रयत्न करा."
        }
    };

    aiAvatarButton.addEventListener('click', () => {
        aiChatWindow.style.display = 'flex';
        aiAvatarButton.style.display = 'none';
    });

    closeChatButton.addEventListener('click', () => {
        aiChatWindow.style.display = 'none';
        aiAvatarButton.style.display = 'flex';
    });

    sendChatButton.addEventListener('click', () => {
        handleUserMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            chatBody.innerHTML = '';
            addBotMessage(responses[currentLang].greeting);
        });
    });

    function handleUserMessage() {
        const userInput = chatInput.value.trim().toLowerCase();
        if (userInput) {
            addUserMessage(chatInput.value);
            generateBotResponse(userInput);
            chatInput.value = '';
        }
    }

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message user';
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message bot';
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function generateBotResponse(userInput) {
        let response = responses[currentLang].default;
        if (userInput.includes('service') || userInput.includes('काम')) {
            response = responses[currentLang].services;
        } else if (userInput.includes('portfolio') || userInput.includes('काम')) {
            response = responses[currentLang].portfolio;
        } else if (userInput.includes('book') || userInput.includes('बुक')) {
            response = responses[currentLang].booking;
        }
        
        setTimeout(() => addBotMessage(response), 500);
    }
    
    // Initial greeting
    addBotMessage(responses[currentLang].greeting);

});
