        // ==================== PAGE 1: QUESTION PAGE ====================
        const gifs = [
            'https://gifdb.com/images/high/hunter-x-hunter-cute-bleh-72v2f9ht1cfjt2lr.webp',
            'https://gifdb.com/images/high/hunter-x-hunter-sad-gon-pdywpiruz1i4xvlj.gif',
            'https://gifdb.com/images/thumbnail/hunter-x-hunter-protagonist-gon-crying-si1cgi5ktuo72m9x.webp',
            'https://gifdb.com/images/high/gon-freecss-oblivious-while-emitting-nen-31eqmd2hyomydu5a.webp',
            'https://gifdb.com/images/high/gon-freecss-smiling-awkwardly-hunter-x-hunter-wj095tfp0bn137o7.webp',
            'https://gifdb.com/images/high/gon-freecss-overwhelmed-with-numbers-tj7g93xizm9rp128.webp'
        ];

        const subTexts = [
            'I really really like you~ ❤️',
            'Why not?? :(',
            'But I\'m your boyfriend... 😢',
            'I got something special for you!',
            'Ok this is getting awkward...',
            'JUST PRESS YES ALREADY!! 😤'
        ];

        const noButtonTexts = ['No', 'Please?', 'What...', 'Press Yes!', 'Cmon!', 'YES!'];

        const bgColors = [
            'var(--cream)',
            'var(--flamingo)',
            'var(--salmon)',
            'var(--peach)',
            'var(--coral)',
            'var(--watermelon)'
        ];

        let noClickCount = 0;
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const mainGif = document.getElementById('main-gif');
        const subText = document.getElementById('sub-text');

        noBtn.addEventListener('click', function() {
            noClickCount++;
            
            if (noClickCount < 6) {
                mainGif.src = gifs[noClickCount];
                subText.textContent = subTexts[noClickCount];
                noBtn.textContent = noButtonTexts[noClickCount];
                document.body.style.background = bgColors[noClickCount];
                
                // Make yes button bigger
                const currentFontSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
                const currentPaddingV = parseFloat(window.getComputedStyle(yesBtn).paddingTop);
                const currentPaddingH = parseFloat(window.getComputedStyle(yesBtn).paddingLeft);
                
                yesBtn.style.fontSize = (currentFontSize * 1.18) + 'px';
                yesBtn.style.padding = `${currentPaddingV * 1.12}px ${currentPaddingH * 1.12}px`;
                
                // Shake animation
                mainGif.style.animation = 'shake 0.4s ease';
                setTimeout(() => mainGif.style.animation = '', 400);
            }
            
            if (noClickCount >= 5) {
                noBtn.textContent = 'YES! 💕';
                noBtn.style.background = 'var(--red)';
                noBtn.style.color = 'white';
                noBtn.style.border = '3px solid var(--dark-shadow)';
                noBtn.onclick = handleYes;
            }
        });

        function handleYes() {
            showConfetti();
            mainGif.src = 'https://gifdb.com/images/thumbnail/gon-freecss-playing-with-fire-3yh3uavy5hm9bqec.webp';
            subText.textContent = 'YAY!! I KNEW IT!! ❤️💕';
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
            
            setTimeout(() => {
                switchPage('game-page');
                startGame();
            }, 2000);
        }

        yesBtn.addEventListener('click', handleYes);

        // ==================== CONFETTI ====================
        function showConfetti() {
            const container = document.getElementById('confetti');
            container.style.display = 'block';
            container.innerHTML = '';
            
            const items = ['❤️', '❤️', '💕', '✨', '🌟', '💖'];
            
            for (let i = 0; i < 40; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent = items[Math.floor(Math.random() * items.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 1.5 + 's';
                confetti.style.fontSize = (18 + Math.random() * 16) + 'px';
                container.appendChild(confetti);
            }
            
            setTimeout(() => {
                container.style.display = 'none';
                container.innerHTML = '';
            }, 4000);
        }

        // ==================== PAGE SWITCHING ====================
        function switchPage(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
        }

        // ==================== PAGE 2: HEART GAME ====================
        let score = 0;
        let gameActive = false;
        let gameInterval;
        const gameArea = document.getElementById('game-area');
        const basket = document.getElementById('basket');
        const scoreDisplay = document.getElementById('score');

        function startGame() {
            score = 0;
            scoreDisplay.textContent = score;
            gameActive = true;
            basket.style.left = '50%';
            gameInterval = setInterval(spawnHeart, 900);
        }

        function spawnHeart() {
            if (!gameActive) return;
            
            const heart = document.createElement('img');
            heart.className = 'falling-heart';
            heart.src = 'heart.png';
            heart.alt = 'Heart';
            
            const gameWidth = gameArea.offsetWidth;
            heart.style.left = (Math.random() * (gameWidth - 50) + 25) + 'px';
            heart.style.top = '-40px';
            
            gameArea.appendChild(heart);
            
            const fallDuration = 2000 + Math.random() * 1000;
            const startTime = Date.now();
            
            function fall() {
                if (!gameActive || !heart.parentNode) return;
                
                const elapsed = Date.now() - startTime;
                const progress = elapsed / fallDuration;
                const top = -40 + (progress * (gameArea.offsetHeight + 80));
                heart.style.top = top + 'px';
                
                // Check collision
                const heartRect = heart.getBoundingClientRect();
                const basketRect = basket.getBoundingClientRect();
                
                if (heartRect.bottom >= basketRect.top &&
                    heartRect.top <= basketRect.bottom &&
                    heartRect.left < basketRect.right - 10 &&
                    heartRect.right > basketRect.left + 10) {
                    
                    heart.remove();
                    
                    // Catch effect
                    const effect = document.createElement('div');
                    effect.className = 'catch-effect';
                    effect.textContent = '+1!';
                    effect.style.left = basket.style.left;
                    effect.style.bottom = '70px';
                    effect.style.transform = 'translateX(-50%)';
                    gameArea.appendChild(effect);
                    setTimeout(() => effect.remove(), 500);
                    
                    score++;
                    scoreDisplay.textContent = score;
                    
                    if (score >= 5) endGame();
                    return;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(fall);
                } else {
                    heart.remove();
                }
            }
            
            requestAnimationFrame(fall);
        }

        function endGame() {
            gameActive = false;
            clearInterval(gameInterval);
            document.querySelectorAll('.falling-heart').forEach(h => h.remove());
            showConfetti();
            setTimeout(() => switchPage('envelope-page'), 1500);
        }

        // Basket movement
        gameArea.addEventListener('mousemove', function(e) {
            if (!gameActive) return;
            const rect = gameArea.getBoundingClientRect();
            let x = Math.max(35, Math.min(e.clientX - rect.left, rect.width - 35));
            basket.style.left = x + 'px';
        });

        gameArea.addEventListener('touchmove', function(e) {
            if (!gameActive) return;
            e.preventDefault();
            const rect = gameArea.getBoundingClientRect();
            let x = Math.max(35, Math.min(e.touches[0].clientX - rect.left, rect.width - 35));
            basket.style.left = x + 'px';
        }, { passive: false });

        // ==================== PAGE 3: ENVELOPE ====================
        const envelope = document.getElementById('envelope');
        const letterOverlay = document.getElementById('letter-overlay');
        const letterClose = document.getElementById('letter-close');

        envelope.addEventListener('click', function() {
            envelope.classList.add('open');
            setTimeout(() => {
                letterOverlay.classList.add('active');
                showConfetti();
            }, 500);
        });

        letterClose.addEventListener('click', () => letterOverlay.classList.remove('active'));
        letterOverlay.addEventListener('click', (e) => {
            if (e.target === letterOverlay) letterOverlay.classList.remove('active');
        });

        // Shake animation keyframe
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0) rotate(0); }
                25% { transform: translateX(-8px) rotate(-5deg); }
                75% { transform: translateX(8px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);

        // Set background music volume
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.volume = 0.5;
        }