let cidades = {
    minasGerais:["Contagem", "Betim", "Belo Horizonte"],
    saoPaulo:["Engenheiro Coelho", "São Paulo", "Cajamar"]
};

let igreja = {
    "Contagem": ["Central de Contagem", "Eldorado"],
    "Betim": ["Alterosa", "Central Betim"],
    "Belo Horizonte": ["Central de Belo Horizonte", "Céu Azul"],
    "Engenheiro Coelho": ["Central de Engenheiro Coelho", "Universitários"],
    "São Paulo": ["Moema", "Gurujá"],
    "Cajamar": ["Polvilho", "Jordanésia"]
};

let estadoSelect = document.getElementById("estado");
let cidadeSelect = document.getElementById("cidade");
let igrejaSelect = document.getElementById("igreja");

function popularCidade() {
    cidadeSelect.innerHTML='<option value="">Selecione uma Cidade</option>';
    igrejaSelect.innerHTML='<option value="">Selecione uma Igreja</option>';
    
    let selectedEstado = estadoSelect.value;
        if (selectedEstado) {
            let selectedCidade = cidade[selectedEstado];
            selectedCidade.forEach (
                function(cidade) {
                    let option = document.createElement("option");
                    option.value = cidade;
                    option.text = cidade;
                    cidadeSelect.appendChild(option);
                }
            );
        }
}

function popularIgreja() {
    igrejaSelect.innerHTML='<option value="">Selecione uma Igreja</option>';
    
    let selectedCidade = cidadeSelect.value;
        if (selectedCidade) {
            let selectedIgreja = igreja [selectedCidade];
            selectedIgreja.forEach(
                function(igreja) {
                    let option = document.createElement("option");
                    option.value = igreja;
                    option.text = igreja;
                    igrejaSelect.appendChild(option);
                }
            );
        }
}