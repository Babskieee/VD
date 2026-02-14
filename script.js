const tulips = document.querySelectorAll('.tulip');
        const garden = document.getElementById('garden');

        function growTulips() {
            tulips.forEach((tulip) => {
                tulip.classList.add('grow');
            });
            
            // Start generating sparkles after tulips grow
            setTimeout(() => {
                setInterval(createSparkle, 800);
            }, 2500);
        }

        // Create sparkle effects
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position around the flowers
            const randomAngle = Math.random() * Math.PI * 2;
            const randomRadius = 100 + Math.random() * 150;
            const x = 50 + Math.cos(randomAngle) * (randomRadius / garden.offsetWidth * 100);
            const y = 50 + Math.sin(randomAngle) * (randomRadius / garden.offsetHeight * 100);
            
            sparkle.style.left = x + '%';
            sparkle.style.top = y + '%';
            sparkle.style.animation = `twinkle ${1 + Math.random() * 2}s ease-in-out`;
            
            garden.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 3000);
        }

        // Interactive click to bloom
        tulips.forEach(tulip => {
            tulip.style.cursor = 'pointer';
            tulip.addEventListener('click', function() {
                if (!this.classList.contains('blooming')) {
                    this.classList.add('blooming');
                    
                    // Create burst of hearts
                    createHeartBurst(this);
                    
                    setTimeout(() => {
                        this.classList.remove('blooming');
                    }, 600);
                }
            });
        });

        function createHeartBurst(tulip) {
            const tulipRect = tulip.getBoundingClientRect();
            const gardenRect = garden.getBoundingClientRect();
            
            for (let i = 0; i < 5; i++) {
                const burstHeart = document.createElement('div');
                burstHeart.className = 'heart';
                burstHeart.style.position = 'absolute';
                burstHeart.style.left = ((tulipRect.left - gardenRect.left + tulipRect.width / 2) / gardenRect.width * 100) + '%';
                burstHeart.style.bottom = ((gardenRect.bottom - tulipRect.top - tulipRect.height / 3) / gardenRect.height * 100) + '%';
                
                const angle = (Math.PI / 4) * i - Math.PI / 2;
                const distance = 100;
                const endX = Math.cos(angle) * distance;
                const endY = -Math.sin(angle) * distance;
                
                burstHeart.style.animation = 'none';
                
                const size = 12 + Math.random() * 6;
                burstHeart.style.setProperty('--heart-size', size + 'px');
                
                garden.appendChild(burstHeart);
                
                setTimeout(() => {
                    burstHeart.style.transition = 'all 0.8s ease-out';
                    burstHeart.style.opacity = '1';
                    burstHeart.style.transform = `translate(${endX}px, ${endY}px) scale(1.5)`;
                    
                    setTimeout(() => {
                        burstHeart.style.opacity = '0';
                        setTimeout(() => burstHeart.remove(), 300);
                    }, 400);
                }, 10);
            }
        }

        window.addEventListener('load', () => {
            setTimeout(growTulips, 500);
        });