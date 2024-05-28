document.getElementById('modalidadeBase').addEventListener('change', updateForm);
document.getElementById('area').addEventListener('change', updateCursos);
document.getElementById('curso').addEventListener('change', updateCampus);
document.getElementById('modalidade').addEventListener('change', updateCampus);

// Adiciona eventos de input para ocultar o link gerado ao modificar qualquer campo
document.querySelectorAll('#formFields input, #formFields select').forEach(element => {
    element.addEventListener('input', () => {
        document.getElementById('linkResult').style.display = 'none';
    });
});

function updateForm() {
    const modalidadeBase = document.getElementById('modalidadeBase').value;
    const formFields = document.getElementById('formFields');
    const areaGroup = document.getElementById('areaGroup');
    const formaIngressoGroup = document.getElementById('formaIngressoGroup');
    const psGroup = document.getElementById('psGroup');
    const modalidadeGroup = document.getElementById('modalidadeGroup');
    const cursoGroup = document.getElementById('cursoGroup');
    const campusGroup = document.getElementById('campusGroup');

    if (modalidadeBase) {
        formFields.style.display = 'block';
        formaIngressoGroup.style.display = (modalidadeBase.includes('vestibular') || modalidadeBase.includes('teologia')) ? 'block' : 'none';
        areaGroup.style.display = (modalidadeBase.includes('vestibular') || modalidadeBase.includes('teologia')) ? 'none' : 'block';

        if (modalidadeBase.includes('teologia')) {
            psGroup.style.display = 'none';
            modalidadeGroup.style.display = 'none';
            cursoGroup.style.display = 'none';
            campusGroup.style.display = 'none';
        } else {
            psGroup.style.display = 'block';
            modalidadeGroup.style.display = 'block';
            cursoGroup.style.display = 'block';
            campusGroup.style.display = 'block';
        }

        const areas = modalidadeBase.includes('vestibular')
            ? []
            : ['Educação', 'Saúde', 'Novos Negócios', 'Bonde'];
        document.getElementById('area').innerHTML = '<option value="">Selecione</option>';
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            document.getElementById('area').appendChild(option);
        });
    } else {
        formFields.style.display = 'none';
    }
}

function updateCursos() {
    const area = document.getElementById('area').value;
    const cursoSelect = document.getElementById('curso');
    const modalidadeBase = document.getElementById('modalidadeBase').value;

    let cursos = [];

    if (modalidadeBase.includes('vestibular')) {
        cursos = area === '' ? [] : ['Administração', 'Enfermagem', 'Medicina'];
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

    updateCampus();
}

function updateCampus() {
    const curso = document.getElementById('curso').value;
    const modalidade = document.getElementById('modalidade').value;
    const campusGroup = document.getElementById('campusGroup');
    const campusSelect = document.getElementById('campus');

    if (modalidade === 'EAD') {
        campusGroup.style.display = 'none';
        campusSelect.innerHTML = '<option value="1-4">Educação a Distância</option>';
    } else {
        campusGroup.style.display = 'block';

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

        campusSelect.innerHTML = '<option value="">Selecione</option>';
        unidades.forEach(unidade => {
            const option = document.createElement('option');
            option.value = unidade.value;
            option.textContent = unidade.text;
            campusSelect.appendChild(option);
        });
    }
}

function generateLink() {
    const modalidadeBase = document.getElementById('modalidadeBase').value;
    const processoSeletivo = document.getElementById('processoSeletivo').value;
    const modalidade = document.getElementById('modalidade').value;
    const curso = document.getElementById('curso').value;
    const campus = modalidadeBase.includes('teologia') ? '1-2' : document.getElementById('campus').value;
    const formaIngresso = document.getElementById('formaIngresso').value;
    const voucher = document.getElementById('voucher').value;

    let link = `${modalidadeBase}pIDPS=${processoSeletivo}&pModalidade=${modalidade}&curso=${encodeURIComponent(curso)}&campus=${campus}`;
    if (modalidadeBase.includes('vestibular') || modalidadeBase.includes('teologia')) {
        link += `&pFormaingresso=${encodeURIComponent(formaIngresso)}`;
    }
    link += `&voucher=${encodeURIComponent(voucher)}`;

    document.getElementById('generatedLink').value = link;
    document.getElementById('linkPopup').style.display = 'flex';
}

function copyLink() {
    const link = document.getElementById('generatedLink');
    link.select();
    link.setSelectionRange(0, 99999);
    document.execCommand('copy');
}

function closePopup() {
    document.getElementById('linkPopup').style.display = 'none';
}
