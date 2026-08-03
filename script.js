document.addEventListener('DOMContentLoaded', () => {
    
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const toolContents = document.querySelectorAll('.tool-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            toolContents.forEach(c => c.classList.add('hidden'));
            toolContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab') + '-tool';
            const targetContent = document.getElementById(targetId);
            targetContent.classList.remove('hidden');
            targetContent.classList.add('active');
        });
    });

    // --- SEO HEADLINE ANALYZER LOGIC ---
    const analyzeBtn = document.getElementById('analyze-btn');
    const headlineInput = document.getElementById('headline-input');
    const analyzerResults = document.getElementById('analyzer-results');
    const scorePath = document.getElementById('score-path');
    const scoreText = document.getElementById('score-text');
    const lengthVal = document.getElementById('length-val');
    const powerVal = document.getElementById('power-val');
    const analyzerFeedback = document.getElementById('analyzer-feedback');

    const powerWords = [
        'como', 'segredo', 'guia', 'completo', 'passo a passo', 
        'rápido', 'fácil', 'comprovado', 'definitivo', 'incrível',
        'poderoso', 'estratégia', 'dinheiro', 'grátis', 'novo', 'agora'
    ];

    analyzeBtn.addEventListener('click', () => {
        const headline = headlineInput.value.trim();
        if (!headline) {
            alert("Por favor, digite um título para analisar!");
            return;
        }

        analyzerResults.classList.remove('hidden');
        
        let score = 50; // Base score
        let feedback = [];
        let pWordsCount = 0;

        // Length Check (Optimal: 50-65 chars)
        const len = headline.length;
        lengthVal.textContent = `${len} chars`;
        if (len >= 50 && len <= 65) {
            score += 20;
            lengthVal.style.color = 'var(--primary)';
        } else if (len < 50) {
            feedback.push("Seu título está um pouco curto. Adicione mais contexto.");
            lengthVal.style.color = 'var(--accent)';
        } else {
            feedback.push("Seu título está muito longo. O Google pode cortá-lo.");
            score -= 10;
            lengthVal.style.color = 'var(--accent)';
        }

        // Power Words Check
        const lowerHeadline = headline.toLowerCase();
        powerWords.forEach(word => {
            if (lowerHeadline.includes(word)) pWordsCount++;
        });

        powerVal.textContent = pWordsCount;
        if (pWordsCount > 0) {
            score += 20;
            powerVal.style.color = 'var(--primary)';
        } else {
            feedback.push("Tente adicionar 'palavras de poder' (ex: guia, segredo, como) para gerar mais emoção.");
            powerVal.style.color = 'var(--accent)';
        }

        // Numbers Check
        if (/\d/.test(headline)) {
            score += 10;
        } else {
            feedback.push("Títulos com números tendem a ter maior taxa de clique (CTR).");
        }

        // Cap score at 100 and min at 0
        score = Math.max(0, Math.min(100, score));

        // Animate Score
        animateScore(score);

        if (score >= 80) {
            analyzerFeedback.innerHTML = "🔥 <strong>Excelente!</strong> Esse título tem alto potencial de conversão.";
            scorePath.style.stroke = "var(--primary)";
        } else if (score >= 60) {
            analyzerFeedback.innerHTML = "👍 <strong>Bom!</strong> " + feedback.join(" ");
            scorePath.style.stroke = "#FBBF24"; // Yellow
        } else {
            analyzerFeedback.innerHTML = "⚠️ <strong>Precisa Melhorar.</strong> " + feedback.join(" ");
            scorePath.style.stroke = "var(--accent)";
        }
    });

    function animateScore(targetScore) {
        let current = 0;
        const increment = targetScore / 50; // frames
        const interval = setInterval(() => {
            current += increment;
            if (current >= targetScore) {
                current = targetScore;
                clearInterval(interval);
            }
            scoreText.textContent = Math.round(current);
            scorePath.setAttribute('stroke-dasharray', `${current}, 100`);
        }, 20);
    }

    // --- IDEA GENERATOR LOGIC ---
    const generateBtn = document.getElementById('generate-btn');
    const keywordInput = document.getElementById('keyword-input');
    const generatorResults = document.getElementById('generator-results');
    const ideaList = document.getElementById('idea-list');

    const templates = [
        "O Guia Definitivo sobre {keyword} em 2026",
        "7 Erros Fatais sobre {keyword} que Você Precisa Evitar",
        "Como Começar com {keyword}: Passo a Passo Prático",
        "O Segredo que os Especialistas não te contam sobre {keyword}",
        "{keyword}: Tudo que você precisa saber antes de começar"
    ];

    generateBtn.addEventListener('click', () => {
        let keyword = keywordInput.value.trim();
        if (!keyword) {
            alert("Por favor, digite um nicho ou assunto!");
            return;
        }

        // Capitalize first letter
        keyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

        generatorResults.classList.remove('hidden');
        ideaList.innerHTML = '';

        // Generate 3 random ideas
        const shuffled = templates.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        shuffled.forEach((template, index) => {
            setTimeout(() => {
                const li = document.createElement('li');
                li.textContent = template.replace('{keyword}', keyword);
                ideaList.appendChild(li);
            }, index * 200); // Staggered animation
        });
    });
});
