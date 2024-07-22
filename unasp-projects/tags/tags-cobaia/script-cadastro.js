let tags = [
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

document.getElementById('search-bar').addEventListener('input', filterTags);

document.getElementById('add-tag-button').addEventListener('click', () => {
    const newTag = prompt('Digite a nova tag:');
    if (newTag) {
        tags.push(newTag);
        updateTags();
    }
});

document.getElementById('overlay').addEventListener('click', () => {
    closePopup();
});

document.addEventListener('DOMContentLoaded', () => {
    displayTags(tags); // Mostrar as tags cadastradas ao carregar a página
});

function updateTags() {
    // Salvar tags atualizadas em localStorage
    localStorage.setItem('tags', JSON.stringify(tags));
    displayTags(tags);
    // Enviar tags atualizadas para a página principal
    window.parent.postMessage({ tags: tags }, '*');
}

function filterTags() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();

    const filteredTags = tags.filter(tag => {
        return !searchQuery || tag.toLowerCase().includes(searchQuery);
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

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<span class="iconify" data-icon="mdi:delete" data-inline="false"></span> EXCLUIR';
        deleteButton.onclick = () => {
            deleteTag(tag);
        };
        
        tagElement.appendChild(tagText);
        tagElement.appendChild(copyButton);
        tagElement.appendChild(deleteButton);
        
        results.appendChild(tagElement);

        const hrElement = document.createElement('hr');
        hrElement.classList.add('hr-tag');
        results.appendChild(hrElement);
    });
}

function copyToClipboard(tag) {
    navigator.clipboard.writeText(tag).catch(err => {
        console.error('Erro ao copiar a tag: ', err);
    });
}

function showCopyPopup(tag) {
    const copyPopup = document.getElementById('copy-popup');
    document.getElementById('copy-text').textContent = tag;
    copyPopup.style.display = 'block';
    document.body.classList.add('blur-active');
    setTimeout(() => {
        copyPopup.style.display = 'none';
        document.body.classList.remove('blur-active');
    }, 2000);
}

function deleteTag(tag) {
    tags = tags.filter(t => t !== tag);
    updateTags();
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
}
