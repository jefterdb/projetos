document.getElementById('modalidadeBase').addEventListener('change', updateForm);
document.getElementById('modalidade').addEventListener('change', updateCampus);
document.getElementById('campus').addEventListener('change', updateCursos);

// Adiciona eventos de input para ocultar o link gerado ao modificar qualquer campo
document.querySelectorAll('#formFields input, #formFields select').forEach(element => {
    element.addEventListener('input', () => {
        document.getElementById('linkResult').style.display = 'none';
    });
});

const cursos = {
    'Engenheiro Coelho': [
        'Administração', 'Arquitetura e Urbanismo', 'Ciências Contábeis', 'Comunicação Social - Publicidade e Propaganda',
        'Comunicação Social - Rádio e Televisão', 'Direito', 'Engenharia Agronômica', 'Engenharia Civil', 
        'Engenharia de Computação', 'Jornalismo', 'Letras - Inglês', 'Letras - Português', 'Medicina Veterinária', 
        'Música', 'Pedagogia', 'Psicologia', 'Tradutor e Intérprete'
    ],
    'Hortolândia': [
        'Administração', 'Ciências Contábeis', 'Comunicação Social - Publicidade e Propaganda', 'Direito', 
        'Educação Física', 'Enfermagem', 'Engenharia de Computação', 'Psicologia', 'Sistemas de Informação'
    ],
    'São Paulo': [
        'Administração', 'Análise e Desenvolvimento de Sistemas', 'Arquitetura e Urbanismo', 'Ciências Contábeis',
        'Comunicação Social - Publicidade e Propaganda', 'Direito', 'Educação Física', 'Enfermagem', 
        'Engenharia de Computação', 'Fisioterapia', 'Nutrição', 'Pedagogia', 'Psicologia'
    ],
    'EAD': [
        'Administração', 'Análise e Desenvolvimento de Sistemas', 'Banco de Dados', 'Ciências Biológicas - Licenciatura', 
        'Ciências Contábeis', 'Ciências Sociais', 'Comércio Exterior', 'Comunicação Social - Publicidade e Propaganda', 
        'Design Gráfico', 'Engenharia de Produção', 'Engenharia de Software', 'Física', 'Fotografia', 'Geografia', 
        'Gestão Comercial', 'Gestão da Qualidade', 'Gestão da Tecnologia da informação', 'Gestão de Recursos Humanos', 
        'Gestão Financeira', 'História', 'Jogos Digitais', 'Jornalismo', 'Letras - Inglês', 'Letras - Português', 
        'Logística', 'Marketing', 'Matemática', 'Pedagogia', 'Processos Gerenciais', 'Produção Audiovisual', 
        'Produção Multimídia', 'Química', 'Redes de Computadores', 'Secretariado', 'Sistemas de Informação', 'Serviço Social'
    ],
    'Mestrado': [
        'Educação', 'Saúde'
    ]
};

function updateForm() {
    const modalidadeBase = document.getElementById('modalidadeBase').value;
    const formFields = document.getElementById('formFields');
    const psGroup = document.getElementById('psGroup');
    const modalidadeGroup = document.getElementById('modalidadeGroup');
    const cursoGroup = document.getElementById('cursoGroup');
    const campusGroup = document.getElementById('campusGroup');
    const formaIngressoGroup = document.getElementById('formaIngressoGroup');

    if (modalidadeBase) {
        formFields.style.display = 'block';
        formaIngressoGroup.style.display = (modalidadeBase.includes('vestibular') || modalidadeBase.includes('teologia')) ? 'block' : 'none';
        if (modalidadeBase.includes('teologia')) {
            psGroup.style.display = 'block';
            modalidadeGroup.style.display = 'none';
            cursoGroup.style.display = 'none';
            campusGroup.style.display = 'none';
            document.getElementById('campus').innerHTML = '<option value="1-2">Engenheiro Coelho</option>';
        } else if (modalidadeBase.includes('pos.unasp.br')) {
            psGroup.style.display = 'block';
            modalidadeGroup.style.display = 'block';
            cursoGroup.style.display = 'block';
            campusGroup.style.display = 'block';
            document.getElementById('cursoGroup').innerHTML = `
                <label for="curso">Curso</label>
                <input type="text" id="curso">
            `;
            updateCampus();  // Atualiza a exibição do campo de campus e cursos
        } else if (modalidadeBase.includes('mestrado.unasp.br')) {
            psGroup.style.display = 'block';
            modalidadeGroup.style.display = 'none';
            cursoGroup.style.display = 'block';
            campusGroup.style.display = 'block';
            document.getElementById('campus').innerHTML = `
                <option value="">Selecione</option>
                <option value="1-2">Engenheiro Coelho</option>
                <option value="1-1">São Paulo</option>
            `;
            document.getElementById('cursoGroup').innerHTML = `
                <label for="curso">Curso</label>
                <select id="curso">
                    <option value="">Selecione</option>
                    <option value="Educação">Educação</option>
                    <option value="Saúde">Saúde</option>
                </select>
            `;
            updateCursos();  // Atualiza a exibição do campo de campus e cursos
        } else {
            psGroup.style.display = 'block';
            modalidadeGroup.style.display = 'block';
            cursoGroup.style.display = 'block';
            campusGroup.style.display = 'block';
            document.getElementById('cursoGroup').innerHTML = `
                <label for="curso">Curso</label>
                <select id="curso">
                    <option value="">Selecione</option>
                </select>
            `;
            updateCampus();  // Atualiza a exibição do campo de campus e cursos
        }
    } else {
        formFields.style.display = 'none';
    }
}

function updateCampus() {
    const modalidade = document.getElementById('modalidade').value;
    const campusGroup = document.getElementById('campusGroup');
    const campusSelect = document.getElementById('campus');
    const modalidadeBase = document.getElementById('modalidadeBase').value;

    if (modalidade === 'EAD') {
        campusGroup.style.display = 'none';
        campusSelect.innerHTML = '<option value="1-4">Educação a Distância</option>';
        updateCursos();
    } else if (modalidadeBase.includes('teologia')) {
        campusGroup.style.display = 'none';
        campusSelect.innerHTML = '<option value="1-2">Engenheiro Coelho</option>';
    } else if (modalidadeBase.includes('vestibular') && modalidade === '') {
        campusGroup.style.display = 'block';
        campusSelect.innerHTML = `
            <option value="">Selecione</option>
            <option value="1-2">Engenheiro Coelho</option>
            <option value="1-3">Hortolândia</option>
            <option value="1-1">São Paulo</option>
            <option value="1-4">Educação a Distância</option>
        `;
        updateCursos();
    } else if (modalidadeBase.includes('mestrado.unasp.br')) {
        campusGroup.style.display = 'block';
        campusSelect.innerHTML = `
            <option value="">Selecione</option>
            <option value="1-2">Engenheiro Coelho</option>
            <option value="1-1">São Paulo</option>
        `;
        updateCursos();
    } else if (modalidadeBase.includes('pos.unasp.br') && modalidade === '') {
        campusGroup.style.display = 'block';
        campusSelect.innerHTML = `
            <option value="">Selecione</option>
            <option value="1-2">Engenheiro Coelho</option>
            <option value="1-3">Hortolândia</option>
            <option value="1-1">São Paulo</option>
            <option value="1-4">Educação a Distância</option>
        `;
        updateCursos();
    } else {
        campusGroup.style.display = 'block';
        campusSelect.innerHTML = `
            <option value="">Selecione</option>
            <option value="1-2">Engenheiro Coelho</option>
            <option value="1-3">Hortolândia</option>
            <option value="1-1">São Paulo</option>
        `;
    }
    updateCursos();
}

function updateCursos() {
    const modalidadeBase = document.getElementById('modalidadeBase').value;
    const modalidade = document.getElementById('modalidade').value;
    const campus = document.getElementById('campus').value;
    const cursoSelect = document.getElementById('curso');

    let cursosDisponiveis = [];

    if (modalidadeBase.includes('vestibular') && (modalidade === 'Presencial' || modalidade === '')) {
        switch (campus) {
            case '1-2':
                cursosDisponiveis = cursos['Engenheiro Coelho'];
                break;
            case '1-3':
                cursosDisponiveis = cursos['Hortolândia'];
                break;
            case '1-1':
                cursosDisponiveis = cursos['São Paulo'];
                break;
            case '1-4':
                cursosDisponiveis = cursos['EAD'];
                break;
            default:
                cursosDisponiveis = [...cursos['Engenheiro Coelho'], ...cursos['Hortolândia'], ...cursos['São Paulo'], ...cursos['EAD']];
                break;
        }
    } else if (modalidade === 'EAD') {
        cursosDisponiveis = cursos['EAD'];
    } else if (modalidadeBase.includes('mestrado.unasp.br')) {
        cursosDisponiveis = cursos['Mestrado'];
        if (campus === '1-2') {
            cursosDisponiveis = ['Educação'];
        } else if (campus === '1-1') {
            cursosDisponiveis = ['Saúde'];
        }
    } else {
        switch (campus) {
            case '1-2':
                cursosDisponiveis = cursos['Engenheiro Coelho'];
                break;
            case '1-3':
                cursosDisponiveis = cursos['Hortolândia'];
                break;
            case '1-1':
                cursosDisponiveis = cursos['São Paulo'];
                break;
            default:
                cursosDisponiveis = [...cursos['Engenheiro Coelho'], ...cursos['Hortolândia'], ...cursos['São Paulo'], ...cursos['EAD']];
                break;
        }
    }

    cursosDisponiveis = [...new Set(cursosDisponiveis)].sort();

    if (!modalidadeBase.includes('pos.unasp.br')) {
        cursoSelect.innerHTML = '<option value="">Selecione</option>';
        cursosDisponiveis.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso;
            cursoSelect.appendChild(option);
        });
    }
}

function generateLink() {
    const modalidadeBase = document.getElementById('modalidadeBase').value;
    const processoSeletivo = document.getElementById('processoSeletivo').value;
    const modalidade = document.getElementById('modalidade').value;
    const curso = modalidadeBase.includes('teologia') ? '' : document.getElementById('curso').value;
    const campus = modalidadeBase.includes('teologia') ? '1-2' : document.getElementById('campus').value;
    const formaIngresso = document.getElementById('formaIngresso').value;
    const voucher = document.getElementById('voucher').value;

    let link = `${modalidadeBase.toLowerCase().replace('teologia', '')}idps=${processoSeletivo}&modalidade=${modalidade}&curso=${encodeURIComponent(curso)}&campus=${campus}`;
    if (modalidadeBase.includes('vestibular') || modalidadeBase.includes('teologia')) {
        link += `&formaingresso=${encodeURIComponent(formaIngresso)}`;
    }
    link += `&voucher=${encodeURIComponent(voucher)}`;

    document.getElementById('generatedLink').value = link.toLowerCase();
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

function resetFields() {
    document.getElementById('modalidadeBase').value = "";
    document.getElementById('processoSeletivo').value = "";
    document.getElementById('modalidade').value = "";
    document.getElementById('campus').value = "";
    document.getElementById('curso').innerHTML = '<option value="">Selecione</option>';
    document.getElementById('formaIngresso').value = "";
    document.getElementById('voucher').value = "";
    document.getElementById('formFields').style.display = 'none';
}

document.querySelector('.new-link-button').addEventListener('click', resetFields);