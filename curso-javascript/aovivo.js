let coresListadas = [
    {nome: 'azul', qt: 10},
    {nome: 'amarelo', qt: 13},
    {nome: 'vermelho', qt: 14}
];

for(let i in coresListadas) {
    coresListadas[i].nome = coresListadas[i].nome.toUpperCase();
    console.log(coresListadas[i].nome);
}