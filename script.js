// ===================================
// COMPLEXO TROPICANA — script.js
// ===================================

// Galeria de fotos por serviço
const galerias = {
    piscina: {
        titulo: 'Piscina',
        fotos: ['img/image52.jpeg', 'img/image48.jpeg', 'img/image49.jpeg','img/image56.jpeg']
    },
    restaurante: {
        titulo: 'Restaurante',
        fotos: ['img/image32.jpeg', 'img/image33.jpeg', 'img/lounge.jpeg']
    },
    bar: {
        titulo: 'Bar',
        fotos: ['img/image35.jpeg', 'img/image36.jpeg', 'img/image42.jpeg', 'img/image40.jpeg']
    },
    acomodacao: {
        titulo: 'Guest House',
        fotos: ['img/qrt.jpeg', 'img/qrt4.jpeg','img/qrt6.jpeg', 'img/qrt8.jpeg']
    }
};

let galeriaAtual = [];
let fotoIndex = 0;

function abrirModal(servico) {
    const dados = galerias[servico];
    galeriaAtual = dados.fotos;
    fotoIndex = 0;

    document.getElementById('modal-titulo').textContent = dados.titulo;
    atualizarFoto();
    criarDots();

    document.getElementById('galeria-modal').classList.add('open');
    document.getElementById('galeria-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    document.getElementById('galeria-modal').classList.remove('open');
    document.getElementById('galeria-modal').style.display = 'none';
    document.body.style.overflow = '';
}

function fecharModalFora(e) {
    if (e.target === document.getElementById('galeria-modal')) fecharModal();
}

function atualizarFoto() {
    const img = document.getElementById('modal-img');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = galeriaAtual[fotoIndex];
        img.style.opacity = '1';
    }, 150);
    atualizarDots();
}

function prevFoto() {
    fotoIndex = (fotoIndex - 1 + galeriaAtual.length) % galeriaAtual.length;
    atualizarFoto();
}

function nextFoto() {
    fotoIndex = (fotoIndex + 1) % galeriaAtual.length;
    atualizarFoto();
}

function criarDots() {
    const container = document.getElementById('modal-dots');
    container.innerHTML = '';
    galeriaAtual.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'g-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => { fotoIndex = i; atualizarFoto(); };
        container.appendChild(dot);
    });
}

function atualizarDots() {
    document.querySelectorAll('.g-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === fotoIndex);
    });
}

// Fechar modal com ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
    if (e.key === 'ArrowLeft') prevFoto();
    if (e.key === 'ArrowRight') nextFoto();
});

// Navbar scroll effect
const cabecalho = document.getElementById('cabecalho');
window.addEventListener('scroll', () => {
    cabecalho.classList.toggle('solid', window.scrollY > 80);
});

// Mobile nav toggle
function toggleNav() {
    document.getElementById('mobileNav').classList.toggle('open');
}

// Form envio (placeholder)
function enviarReserva() {
    alert('Obrigado! A sua reserva foi enviada. Entraremos em contacto em breve.');
}

// Scroll reveal
const revealEls = document.querySelectorAll('.card, .servico, .sobre-text, .sobre-img-col, .contacto-left, .contacto-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
});
