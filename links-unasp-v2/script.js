// script.js

let data;

fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
    })
    .catch(error => console.error('Error loading JSON:', error));

document.getElementById('linkBase').addEventListener('change', updateForm);
document.getElementById('modalidade').addEventListener('change', updateAreas);
document.getElementById('area').addEventListener('change', updateCursos);
document.getElementById('curso').addEventListener('change', updateUnidades);
document.getElementById('voucher').addEventListener('input', hideLinkResult);
document.getElementById('unidade').addEventListener('change', hideLinkResult);

// Adiciona eventos de input para ocultar o link gerado ao modificar qualquer campo
document.querySelectorAll('#formFields input, #formFields select').forEach(element => {
    element.addEventListener('input', hideLinkResult);
});

function hideLinkResult() {
    document.getElementById('linkResult').style.display = 'none';
}

function toggleAdvancedOptions() {
    const advancedFields = document.querySelectorAll('.advanced');
    const linkBase = document.getElementById('linkBase').value;
    advancedFields.forEach(field => {
        field.style.display = document.getElementById('advancedOptions').checked ? 'block' : 'none';
    });

    const formaIngressoGroup = document.getElementById('formaIngressoGroup');
    formaIngressoGroup.style.display = (linkBase === 'Graduação' && document.getElementById('advancedOptions').checked) ? 'block' : 'none';
}

function updateForm() {
    const linkBase = document.getElementById('linkBase').value;
    const formFields = document.getElementById('formFields');
    const modalidadeSelect = document.getElementById('modalidade');
    const formaIngressoGroup = document.getElementById('formaIngressoGroup');
    const campusGroup = document.getElementById('campusGroup');
    const voucherGroup = document.getElementById('voucherGroup');

    // Ocultar o link gerado ao alterar o Tipo de Link Base
    hideLinkResult();

    if (linkBase) {
        formFields.style.display = 'block';
        formaIngressoGroup.style.display = (linkBase === 'Graduação' && document.getElementById('advancedOptions').checked) ? 'block' : 'none';
        campusGroup.style.display = linkBase === 'Graduação' ? 'block' : 'none';
        voucherGroup.style.display = 'block';

        // Reset modalidade e áreas
        modalidadeSelect.value = "";
        document.getElementById('area').innerHTML = '<option value="" class="placeholder">Selecione</option>';
        document.getElementById('curso').innerHTML = '<option value="" class="placeholder">Selecione</option>';
        updateCampusOptions(modalidadeSelect.value);
    } else {
        formFields.style.display = 'none';
    }
}

function updateAreas() {
    const linkBase = document.getElementById('linkBase').value;
    const modalidade = document.getElementById('modalidade').value;
    const areaSelect = document.getElementById('area');
    const campusGroup = document.getElementById('campusGroup');

    // Ocultar o link gerado ao alterar a modalidade
    hideLinkResult();

    if (linkBase && modalidade) {
        const areas = Object.keys(data[linkBase][modalidade]);
        areaSelect.innerHTML = '<option value="" class="placeholder">Selecione</option>';
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });

        updateCampusOptions(modalidade);
        campusGroup.style.display = 'block';
    }
}

function updateCursos() {
    const linkBase = document.getElementById('linkBase').value;
    const modalidade = document.getElementById('modalidade').value;
    const area = document.getElementById('area').value;
    const cursoSelect = document.getElementById('curso');

    // Ocultar o link gerado ao alterar a área
    hideLinkResult();

    if (linkBase && modalidade && area) {
        const cursos = data[linkBase][modalidade][area];
        cursoSelect.innerHTML = '<option value="" class="placeholder">Selecione</option>';
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso;
            cursoSelect.appendChild(option);
        });
    }
}

function updateCampusOptions(modalidade) {
    const unidadeSelect = document.getElementById('unidade');
    unidadeSelect.innerHTML = '<option value="" class="placeholder">Selecione</option>';
    if (modalidade === 'EAD') {
        unidadeSelect.innerHTML += '<option value="1-4">EAD</option>';
    } else {
        unidadeSelect.innerHTML += '<option value="1-1">São Paulo</option>';
        unidadeSelect.innerHTML += '<option value="1-2">Engenheiro Coelho</option>';
        unidadeSelect.innerHTML += '<option value="1-3">Hortolândia</option>';
    }
}

function generateLink() {
    const linkBase = document.getElementById('linkBase').value;
    const processoSeletivo = document.getElementById('processoSeletivo').value;
    const modalidade = document.getElementById('modalidade').value;
    const curso = document.getElementById('curso').value;
    const unidade = document.getElementById('unidade').value;
    const formaIngresso = document.getElementById('formaIngresso').value;
    const voucher = document.getElementById('voucher').value;

    let baseLink = linkBase === 'Graduação' ? 'https://vestibular.unasp.br/?' : 'https://pos.unasp.br/?';
    let link = `${baseLink}pIDPS=${processoSeletivo}&pModalidade=${modalidade}&curso=${encodeURIComponent(curso)}&unidade=${unidade}`;
    
    if (linkBase === 'Graduação') {
        link += `&pFormaingresso=${encodeURIComponent(formaIngresso)}`;
    }
    
    link += `&voucher=${encodeURIComponent(voucher)}`;

    document.getElementById('generatedLink').value = link;
    document.getElementById('linkResult').style.display = 'block';
}

function copyLink() {
    const link = document.getElementById('generatedLink');
    link.select();
    link.setSelectionRange(0, 99999);
    document.execCommand('copy');
}
