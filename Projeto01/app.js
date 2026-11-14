// Nomes base para gerar o catálogo de 500 itens
const catalogosBase = {
    "Boticário": ["Malbec", "Lily", "Egeo Dolce", "Floratta Blue", "Quasar", "Coffee Woman", "Zaad", "Glamour", "Nativa SPA Ameixa", "Boti Baby"],
    "Avon": ["Far Away", "Pur Blanca", "300 Km/h", "Lov|U", "Attraction", "Surreal", "Musk Marine", "Luiza Brunet", "Imari", "Exclusive"],
    "Eudora": ["Siàge", "La Victorie", "Club 6", "Impression", "Velvet Cristal", "Instance", "Lúmis", "Magnific", "H Acqua", "Diva"]
};

const perfumes = [];
const marcas = ["Boticário", "Avon", "Eudora"];

// Gera exatamente 500 perfumes distribuídos entre as 3 marcas
for (let i = 1; i <= 500; i++) {
    const marcaAtual = marcas[i % 3];
    const listaNomes = catalogosBase[marcaAtual];
    const nomeBase = listaNomes[i % listaNomes.length];
    
    perfumes.push({
        codigo: `COD-${String(i).padStart(4, '0')}`,
        nome: `${nomeBase} Edição ${Math.ceil(i / 3)}`,
        marca: marcaAtual,
        preco: (79.90 + (i % 15) * 10).toFixed(2).replace('.', ',')
    });
}

const grade = document.getElementById('gradePerfumes');
const contador = document.getElementById('contadorResultados');
const campoBusca = document.getElementById('campoBusca');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

let marcaSelecionada = 'todos';

// Função para desenhar os cards na tela
function renderizarPerfumes(lista) {
    grade.innerHTML = '';
    contador.textContent = `Exibindo ${lista.length} perfumes`;

    lista.forEach(perfume => {
        const classeMarca = perfume.marca === 'Boticário' ? 'marca-boticario' : 
                            perfume.marca === 'Avon' ? 'marca-avon' : 'marca-eudora';

        const card = document.createElement('div');
        card.className = 'card-perfume';
        card.innerHTML = `
            <div>
                <span class="etiqueta-marca ${classeMarca}">${perfume.marca}</span>
                <h3>${perfume.nome}</h3>
                <p class="codigo">Código: ${perfume.codigo}</p>
            </div>
            <p class="preco">R$ ${perfume.preco}</p>
        `;
        grade.appendChild(card);
    });
}

// Função que combina filtro de marca e pesquisa por texto
function filtrarCatalogo() {
    const termoBusca = campoBusca.value.toLowerCase();

    const filtrados = perfumes.filter(perfume => {
        const bateMarca = marcaSelecionada === 'todos' || perfume.marca === marcaSelecionada;
        const bateTexto = perfume.nome.toLowerCase().includes(termoBusca) || 
                          perfume.codigo.toLowerCase().includes(termoBusca);
        return bateMarca && bateTexto;
    });

    renderizarPerfumes(filtrados);
}

// Eventos dos botões de categoria
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');
        marcaSelecionada = botao.getAttribute('data-marca');
        filtrarCatalogo();
    });
});

// Evento da barra de busca
campoBusca.addEventListener('input', filtrarCatalogo);

// Carrega os 500 perfumes ao abrir a página
renderizarPerfumes(perfumes);
