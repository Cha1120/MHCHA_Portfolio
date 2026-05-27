document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Language Toggle Logic
  // ==========================================
  const body = document.body;
  const btnKo = document.getElementById('btn-ko');
  const btnEn = document.getElementById('btn-en');

  const setLanguage = (lang) => {
    if (lang === 'en') {
      body.classList.remove('lang-ko');
      body.classList.add('lang-en');
      if (btnKo && btnEn) {
        btnKo.classList.remove('active');
        btnEn.classList.add('active');
      }
    } else {
      body.classList.remove('lang-en');
      body.classList.add('lang-ko');
      if (btnKo && btnEn) {
        btnEn.classList.remove('active');
        btnKo.classList.add('active');
      }
    }
    localStorage.setItem('portfolio-lang', lang);
  };

  // Check persisted language or fallback to 'ko'
  const savedLang = localStorage.getItem('portfolio-lang') || 'ko';
  setLanguage(savedLang);

  if (btnKo && btnEn) {
    btnKo.addEventListener('click', () => setLanguage('ko'));
    btnEn.addEventListener('click', () => setLanguage('en'));
  }


  // ==========================================
  // 2. Sticky Header Scroll Effect
  // ==========================================
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }


  // ==========================================
  // 3. Scroll Reveal Animation Logic
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', checkReveal);
  checkReveal();


  // ==========================================
  // 4. Interactive 3D Card Tilt Effect
  // ==========================================
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate mouse coordinates relative to the card center
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;
      
      // Compute tilt angles (max 12 degrees rotation)
      const maxTilt = 12;
      const rotateX = -(mouseY / (cardHeight / 2)) * maxTilt;
      const rotateY = (mouseX / (cardWidth / 2)) * maxTilt;
      
      // Apply 3D transform dynamically
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = '0 30px 40px rgba(0,0,0,0.4), 0 0 40px rgba(37, 99, 235, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      // Smoothly snap back to normal
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      // Disable transition delay during tracking for responsive feel
      card.style.transition = 'transform 0.05s ease-out, box-shadow 0.3s ease';
    });
  });


  // ==========================================
  // 5. Three.js 3D Constellation Background
  // ==========================================
  const canvas = document.getElementById('webgl-bg');
  if (canvas && typeof THREE !== 'undefined') {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Configuration
    const particleCount = 120;
    const particlesData = [];
    const positions = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();

    const range = 100; // Spread distance

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * range - range / 2;
      const y = Math.random() * range - range / 2;
      const z = Math.random() * range - range / 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        numConnections: 0
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60A5FA, // Light blue
      size: 1.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Line network geometry
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563EB,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    
    let lineGeometry = new THREE.BufferGeometry();
    let linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // Handle mouse movement for subtle camera parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - width / 2) * 0.05;
      mouseY = (e.clientY - height / 2) * 0.05;
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Camera parallax interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      const positions = particleGeometry.attributes.position.array;
      let lineIdx = 0;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const pData = particlesData[i];
        
        positions[i * 3] += pData.velocity.x;
        positions[i * 3 + 1] += pData.velocity.y;
        positions[i * 3 + 2] += pData.velocity.z;

        // Boundary checks
        if (positions[i * 3] < -range / 2 || positions[i * 3] > range / 2) pData.velocity.x *= -1;
        if (positions[i * 3 + 1] < -range / 2 || positions[i * 3 + 1] > range / 2) pData.velocity.y *= -1;
        if (positions[i * 3 + 2] < -range / 2 || positions[i * 3 + 2] > range / 2) pData.velocity.z *= -1;
      }

      // Re-draw lines based on proximity
      for (let i = 0; i < particleCount; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];

          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
          
          if (dist < 25) { // Connection threshold distance
            linePositions[lineIdx++] = x1;
            linePositions[lineIdx++] = y1;
            linePositions[lineIdx++] = z1;
            linePositions[lineIdx++] = x2;
            linePositions[lineIdx++] = y2;
            linePositions[lineIdx++] = z2;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIdx), 3));
      lineGeometry.attributes.position.needsUpdate = true;

      // Rotate group
      particleSystem.rotation.y += 0.001;
      lineSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    });
  }
});
