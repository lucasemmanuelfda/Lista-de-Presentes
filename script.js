document.addEventListener('DOMContentLoaded', () => {
    const giftList = document.getElementById('gift-list');
    const modal = document.getElementById('pixModal');
    const closeBtn = document.querySelector('.close');

    // Lista de presentes - você pode personalizar aqui
    const gifts = [
        {
            name: 'Jantar Romântico',
            value: 150.00,
            description: 'Um jantar especial para dois em um restaurante aconchegante.',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
        },
        {
            name: 'Viagem dos Sonhos',
            value: 500.00,
            description: 'Contribuição para nossa lua de mel ou viagem especial.',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'
        },
        {
            name: 'Eletrodoméstico Novo',
            value: 250.00,
            description: 'Para equipar nossa casa com o que precisamos.',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
        },
        {
            name: 'Kit Spa em Casa',
            value: 120.00,
            description: 'Para momentos de relaxamento e autocuidado.',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop'
        },
        {
            name: 'Curso Online',
            value: 200.00,
            description: 'Investimento em conhecimento e desenvolvimento pessoal.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
        },
        {
            name: 'Decoração para Casa',
            value: 180.00,
            description: 'Itens especiais para deixar nosso lar ainda mais bonito.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
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

