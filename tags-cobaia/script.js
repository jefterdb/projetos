const tags = [
    "comercial_#grad*_#sp*_2024_#inverno*_#teste_vocacional*",
    "comercial_#grad*_#tri*_2023_#verao*_#matricula_facil*",
    "comercial_#pos*_#ht*_2023_#m1*_#enem*",
    "comercial_#grad*_#ht*_2023_#verao*_#enem*",
    "comercial_#pos*_#ec*_2025_#verao*_#ebook*",
    "comercial_#grad*_#sp*_2024_#inverno*_#branding*",
    "comercial_#pos*_#tri*_2023_#m4*_#bolsas*",
    "comercial_#grad*_#ht*_2022_#m2*_#vitrine_unasp*",
    "comercial_#grad*_#ec*_2023_#m1*_#inscricao*",
    "comercial_#grad*_#ec*_2023_#m1*_#ebook*",
    "comercial_#pos*_#ec*_2024_#m2*_#bolsas*",
    "comercial_#grad*_#sp*_2022_#verao*_#matricula_facil*"
];

document.querySelectorAll('.filters select, .filters input').forEach(filter => {
    filter.addEventListener('change', filterTags);
});

document.getElementById('search-bar').addEventListener('input', () => {
    clearFilters();
    filterTags();
});

document.getElementById('filter-button').addEventListener('click', () => {
    document.getElementById('filter-popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('overlay').addEventListener('click', () => {
    closePopup();
});

document.getElementById('apply-filters').addEventListener('click', () => {
    filterTags();
    closePopup();
});

document.getElementById('clear-filters').addEventListener('click', () => {
    clearFilters();
    filterTags();
});

document.getElementById('close-popup').addEventListener('click', () => {
    closePopup();
});

document.addEventListener('DOMContentLoaded', () => {
    displayTags(tags.slice(-10)); // Mostrar as últimas 10 tags cadastradas ao carregar a página
});

function clearFilters() {
    document.querySelectorAll('.filters select, .filters input').forEach(filter => {
        filter.value = '';
    });
}

function filterTags() {
    const nivelEnsino = document.getElementById('nivel-ensino').value;
    const campus = document.getElementById('campus').value;
    const ano = document.getElementById('ano').value;
    const modulo = document.getElementById('modulo').value;
    const tipoCampanha = document.getElementById('tipo-campanha').value;
    const promocionais = document.getElementById('promocionais').value;
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();

    const filteredTags = tags.filter(tag => {
        return (!searchQuery || tag.toLowerCase().includes(searchQuery)) &&
               (!nivelEnsino || tag.includes(`#${nivelEnsino}`)) &&
               (!campus || tag.includes(`#${campus}`)) &&
               (!ano || tag.includes(`_${ano}_`)) &&
               (!modulo || tag.includes(`#${modulo}`)) &&
               (!tipoCampanha || tag.includes(`#${tipoCampanha}`)) &&
               (!promocionais || tag.includes(`#${promocionais}`));
    });

    displayTags(filteredTags);
}

function displayTags(tags) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        
        const tagText = document.createElement('span');
        tagText.textContent = tag;
        
        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.innerHTML = '<span class="iconify" data-icon="mdi:content-copy" data-inline="false"></span> COPIAR';
        copyButton.onclick = () => {
            copyToClipboard(tag);
            showCopyPopup(tag);
        };
        
        tagElement.appendChild(tagText);
        tagElement.appendChild(copyButton);
        
        results.appendChild(tagElement);
    });
}

function copyToClipboard(tag) {
    navigator.clipboard.writeText(tag).catch(err => {
        console.error('Erro ao copiar a tag: ', err);
    });
}

function showCopyPopup(tag) {
    const copyPopup = document.getElementById('copy-popup');
    copyPopup.textContent = `Tag copiada: ${tag}`;
    copyPopup.style.display = 'block';
    setTimeout(() => {
        copyPopup.style.display = 'none';
    }, 4000);
}

function closePopup() {
    document.getElementById('filter-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
