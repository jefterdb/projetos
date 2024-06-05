let modalidadeBase = '';

document.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', () => {
        setModalidadeBase(button.getAttribute('onclick').split("'")[1]);
    });
});

document.getElementById('area').addEventListener('change', updateCursos);
document.getElementById('curso').addEventListener('change', updateUnidades);

// Adiciona eventos de input para ocultar o link gerado ao modificar qualquer campo
document.querySelectorAll('#formFields input, #formFields select').forEach(element => {
    element.addEventListener('input', () => {
        document.getElementById('linkResult').style.display = 'none';
    });
});

function setModalidadeBase(url) {
    modalidadeBase = url;
    updateForm();
}

function updateForm() {
    const formFields = document.getElementById('formFields');
    const areaSelect = document.getElementById('area');
    const formaIngressoGroup = document.getElementById('formaIngressoGroup');
    
    document.getElementById('linkResult').style.display = 'none';

    if (modalidadeBase) {
        formFields.style.display = 'block';
        formaIngressoGroup.style.display = modalidadeBase.includes('vestibular') ? 'block' : 'none';

        const areas = modalidadeBase.includes('vestibular') 
            ? ['Educação', 'Saúde'] 
            : ['Novos Negócios', 'Bonde'];
        areaSelect.innerHTML = '<option value="">Selecione</option>';
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    } else {
        formFields.style.display = 'none';
    }
}

function updateCursos() {
    const area = document.getElementById('area').value;
    const cursoSelect = document.getElementById('curso');

    let cursos = [];

    if (modalidadeBase.includes('vestibular')) {
        if (area === 'Educação') {
            cursos = ['Administração'];
        } else if (area === 'Saúde') {
            cursos = ['Enfermagem', 'Medicina'];
        }
    } else if (modalidadeBase.includes('pos')) {
        if (area === 'Novos Negócios') {
            cursos = ['Arqueologia'];
        } else if (area === 'Bonde') {
            cursos = ['Direito Compliance', 'Engenharia Bim'];
        }
    }

    cursoSelect.innerHTML = '<option value="">Selecione</option>';
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso;
        option.textContent = curso;
        cursoSelect.appendChild(option);
    });

    updateUnidades();
}

function updateUnidades() {
    const curso = document.getElementById('curso').value;
    const unidadeSelect = document.getElementById('unidade');

    let unidades = [];

    if (curso === 'Medicina' || curso === 'Administração') {
        unidades = [{ value: '1-2', text: 'Engenheiro Coelho' }];
    } else if (curso === 'Enfermagem') {
        unidades = [{ value: '1-1', text: 'São Paulo' }];
    } else if (curso === 'Direito Compliance') {
        unidades = [{ value: '1-3', text: 'Hortolândia' }];
    } else if (curso === 'Engenharia Bim' || curso === 'Arqueologia') {
        unidades = [{ value: '1-4', text: 'EAD' }];
    }

    unidadeSelect.innerHTML = '<option value="">Selecione</option>';
    unidades.forEach(unidade => {
        const option = document.createElement('option');
        option.value = unidade.value;
        option.textContent = unidade.text;
        unidadeSelect.appendChild(option);
    });
}

function generateLink() {
    const processoSeletivo = document.getElementById('processoSeletivo').value;
    const modalidade = document.getElementById('modalidade').value;
    const curso = document.getElementById('curso').value;
    const unidade = document.getElementById('unidade').value;
    const formaIngresso = document.getElementById('formaIngresso').value;
    const voucher = document.getElementById('voucher').value;

    let link = `${modalidadeBase}pIDPS=${processoSeletivo}&pModalidade=${modalidade}&curso=${encodeURIComponent(curso)}&unidade=${unidade}`;
    if (modalidadeBase.includes('vestibular')) {
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
