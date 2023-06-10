const url = 'https://api.openai.com/v1/chat/completions';
const apiKey = '${{ secrets.CAPI_KEY }}';

const form = document.querySelector('form');
const promptInput = document.querySelector('#prompt');
const chatLog = document.querySelector('.chat-log');

form.addEventListener('submit', e => {
    e.preventDefault();
    let value = promptInput.value;
    if (value !== '') {
       createMessageInstace(value);
       askMattGPT(value);
       handleScroll();
       promptInput.value = ''; 
    }
})

function createMessageInstace(prompt) {
    chatLog.innerHTML +=
    `
    <div class="message-instance-container">
        <div class="message user-message">
            <div class="content">
                <div class="message-image">
                    <img src="./user.png" alt="User image">
                </div>
                <p style class="prompt">${prompt}</p>
            </div>
        </div>
        <div class="message ai-message">
            <div class="content">
                <div class="message-image">
                    <img src="./logo11.svg" alt="SymbioticBot logo">
                </div>
                <p class="thinking">Pondering</p>
            </div>
        </div>
    </div>
    `
}

function askMattGPT(prompt) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 200,
        })
    })
    .then(res => res.json())
    .then (data => updateMessage(data))
}

// scrolls chatlog to bottom
function handleScroll() {
    chatLog.scrollTop = chatLog.scrollHeight;
}

function updateMessage(message) {
    const p= document.querySelector('.thinking');
    p.textContent = message.choices[0].message.content;
    p.classList.remove('thinking');
    handleScroll();
}
