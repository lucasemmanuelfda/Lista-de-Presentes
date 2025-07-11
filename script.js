document.addEventListener('DOMContentLoaded', () => {
    const giftList = document.getElementById('gift-list');
    const modal = document.getElementById('pixModal');
    const closeBtn = document.querySelector('.close');

    // Lista de presentes - você pode personalizar aqui
    const gifts = [
        {
            name: 'Air fryer',
            value: 450.00,
            description: 'Fritadeira sem óleo, ideal para refeições mais saudáveis.',
            image: 'https://images.unsplash.com/photo-1617196038026-9f862ba4b42d?w=400&h=300&fit=crop'
        },
        {
            name: 'Microondas',
            value: 550.00,
            description: 'Micro-ondas para aquecimento rápido e prático no dia a dia.',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001daed?w=400&h=300&fit=crop'
        },
        {
            name: 'Armário de cozinha',
            value: 900.00,
            description: 'Armário para organizar utensílios e otimizar espaço na cozinha.',
            image: 'https://images.unsplash.com/photo-1586201372330-4a2b2b171bb0?w=400&h=300&fit=crop'
        },
        {
            name: 'Mesa de jantar e cadeiras',
            value: 1800.00,
            description: 'Conjunto completo de mesa com cadeiras para até 6 pessoas.',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
        },
        {
            name: 'Sofá',
            value: 1800.00,
            description: 'Sofá confortável para sala com 2–3 lugares.',
            image: 'https://images.unsplash.com/photo-1587502536263-3cac92676308?w=400&h=300&fit=crop'
        },
        {
            name: 'Jogo de prato e talheres',
            value: 200.00,
            description: 'Conjunto completo de pratos e talheres para refeições.',
            image: 'https://images.unsplash.com/photo-1543351611-10410a230a63?w=400&h=300&fit=crop'
        },
        {
            name: 'Jogo de panela',
            value: 550.00,
            description: 'Conjunto de panelas antiaderentes ou inox, ideal para cozinha.',
            image: 'https://images.unsplash.com/photo-1556911073-52527ac437a9?w=400&h=300&fit=crop'
        },
        {
            name: 'Jogo de cama',
            value: 380.00,
            description: 'Lençóis, fronhas e edredom para cama de casal, 400–1000 fios.',
            image: 'https://images.unsplash.com/photo-1600180758895-4ecb9b668c36?w=400&h=300&fit=crop'
        },
        {
            name: 'Cama e colchão',
            value: 2000.00,
            description: 'Cama box casal com colchão de qualidade média.',
            image: 'https://images.unsplash.com/photo-1585386959984-a41552248650?w=400&h=300&fit=crop'
        },
        {
            name: 'Guarda-roupa',
            value: 1200.00,
            description: 'Roupeiro com portas e divisórias para organização de roupas.',
            image: 'https://images.unsplash.com/photo-1589812323595-3d3c91f558c6?w=400&h=300&fit=crop'
        },
        {
            name: 'TV',
            value: 1800.00,
            description: 'TV LED Smart de 43–50″ para sala, com resolução Full HD ou 4K.',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
        },
        {
            name: 'Ar condicionado',
            value: 1800.00,
            description: 'Split 9 000–12 000 BTU, ideal para climatizar ambientes.',
            image: 'https://images.unsplash.com/photo-1586471234910-29cf0bc736f1?w=400&h=300&fit=crop'
        },
        {
            name: 'Espelho',
            value: 300.00,
            description: 'Espelho decorativo de parede para quarto ou sala.',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
        }
    ];

    // Configuração da chave Pix - ALTERE AQUI PARA SUA CHAVE
    const pixKey = 'sua.chave@pix.com'; // Substitua pela sua chave Pix real

    // Renderizar presentes
    gifts.forEach(gift => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');
        giftItem.innerHTML = `
            <img src="${gift.image}" alt="${gift.name}" loading="lazy">
            <h2>${gift.name}</h2>
            <p>${gift.description}</p>
            <p class="price">R$ ${gift.value.toFixed(2)}</p>
            <button data-name="${gift.name}" data-value="${gift.value}">💝 Presentear</button>
        `;
        giftList.appendChild(giftItem);
    });

    // Event listener para os botões de presentear
    giftList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const giftName = event.target.dataset.name;
            const giftValue = parseFloat(event.target.dataset.value);
            
            // Preencher informações no modal
            document.getElementById('selectedGift').textContent = giftName;
            document.getElementById('selectedValue').textContent = `R$ ${giftValue.toFixed(2)}`;
            document.getElementById('pixKey').textContent = pixKey;
            
            // Mostrar modal
            modal.style.display = 'block';
        }
    });

    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar modal clicando fora dele
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Função para copiar a chave Pix
function copyPixKey() {
    const pixKey = document.getElementById('pixKey').textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(pixKey).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopyTextToClipboard(pixKey);
        });
    } else {
        fallbackCopyTextToClipboard(pixKey);
    }
}

// Fallback para navegadores que não suportam clipboard API
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Erro ao copiar texto: ', err);
        alert('Não foi possível copiar automaticamente. Por favor, copie manualmente a chave Pix.');
    }
    
    document.body.removeChild(textArea);
}

// Mostrar feedback visual quando a chave for copiada
function showCopyFeedback() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '✅ Copiado!';
    copyBtn.style.background = '#28a745';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '#007bff';
    }, 2000);
}

