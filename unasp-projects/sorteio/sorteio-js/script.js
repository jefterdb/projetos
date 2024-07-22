let drawnNames = [];
let drawnNumbers = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileInput').addEventListener('change', function(e) {
        showDialog();
    });

    document.getElementById('keepButton').addEventListener('click', function() {
        processFile(true); // Mantém os nomes existentes
    });

    document.getElementById('discardButton').addEventListener('click', function() {
        processFile(false); // Descarta os nomes existentes
    });
});

function toggleInputType() {
    const sortType = document.getElementById('sortType').value;
    document.getElementById('entries').style.display = sortType === 'name' ? 'block' : 'none';
    document.getElementById('maxNumber').style.display = sortType === 'number' ? 'block' : 'none';
    document.getElementById('fileInput').style.display = sortType === 'name' ? 'block' : 'none';
    document.getElementById('result').textContent = "";
    document.getElementById('drawnItems').textContent = "";
}

function showDialog() {
    document.getElementById('confirmationDialog').classList.remove('dialog-hidden');
    document.getElementById('confirmationDialog').classList.add('dialog-visible');
}

function hideDialog() {
    document.getElementById('confirmationDialog').classList.remove('dialog-visible');
    document.getElementById('confirmationDialog').classList.add('dialog-hidden');
}

async function processFile(keepExisting) {
    hideDialog();
    const file = document.getElementById('fileInput').files[0];
    if (!file) return;

    if (!keepExisting) {
        document.getElementById('entries').value = "";
        drawnNames = [];
    }

    if (file.type === "text/plain") {
        const text = await file.text();
        // Ignora a primeira linha (cabeçalho) dos arquivos de texto
        const newEntries = text.trim().split(/\r?\n/).slice(1);
        processNewEntries(newEntries);
    } else if (file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Remove o cabeçalho
        const newEntries = XLSX.utils.sheet_to_json(worksheet, {header:1}).slice(1).flat();
        processNewEntries(newEntries);
    } else {
        alert('Formato de arquivo não suportado.');
    }
}

function processNewEntries(newEntries) {
    const existingEntries = document.getElementById('entries').value.trim().split(/\r?\n|,/);
    const combinedEntries = existingEntries.concat(newEntries).filter(entry => entry.trim() !== "");
    document.getElementById('entries').value = combinedEntries.join('\n');
    updateDrawnItems();
}

document.getElementById('drawButton').onclick = function() {
    const sortType = document.getElementById('sortType').value;
    let entries = document.getElementById('entries').value.trim().replace(/\n/g, ',').split(',').map(entry => entry.trim()).filter(entry => entry && !(sortType === 'name' ? drawnNames.includes(entry) : drawnNumbers.includes(entry)));

    if (entries.length > 0) {
        const index = Math.floor(Math.random() * entries.length);
        const drawnItem = entries[index];

        if (sortType === 'name') {
            drawnNames.push(drawnItem);
        } else {
            drawnNumbers.push(parseInt(drawnItem, 10));
        }

        document.getElementById('result').textContent = `Sorteado: ${drawnItem}`;
        updateDrawnItems();
    } else {
        document.getElementById('result').textContent = "Todos os itens já foram sorteados ou não há itens válidos.";
    }
};

document.getElementById('resetButton').onclick = function() {
    drawnNames = [];
    drawnNumbers = [];
    document.getElementById('result').textContent = "";
    document.getElementById('drawnItems').textContent = "";
};

function updateDrawnItems() {
    const sortType = document.getElementById('sortType').value;
    const drawnItemsText = (sortType === 'name' ? drawnNames : drawnNumbers).join(', ');
    document.getElementById('drawnItems').textContent = `Itens Sorteados: ${drawnItemsText}`;
}