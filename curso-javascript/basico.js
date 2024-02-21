//declarando uma função
//normalmente coloca a primeira palavra minuscula e outra maiuscula
//funções são caixas isoladas que são executadas quando eu chamo, posso por onde quiser no código.
//Dou um nome para a função, quando eu quiser usar o que está dentor dela eu apenas chamo ela pelo nome que eu dei.

function gravidade() {
    console.log('A gravidade do planeta é:');
    console.log(9.8);
}

//Como usar uma função
//Usando o código acima, se eu digitar apenas gravidade (nome que eu dei para a função, nada acontece)
//Existe o momento de definir a função e a hora de usar a função. Crio o motor e depois uso ele.

gravidade(); //agora sim vai rodar a função usando o ();


//Passando parâmetros em funções
function somar(n1, n2) { //Dentro do () recebe as entradas, o motor está lá e eu coloco 2 coisas diferentes dentro dele. São variáveis disponíveis apenas dentro da função.
    let resultado = n1 + n2;
    console.log('resultado: ' + resultado);
}
//O n1 e n2 são as variáveis que eu vou poder receber dentro da função, variáveis que só existem nela.
somar(10, 15); //Neste caso como chamei o nome da variável, o 10 entra no lugar do n1 e na outra abertura entra no parâmetro n2

//Outro exemplo
function nomeCompleto(nome, sobrenome) {
    console.log(`${nome} ${sobrenome}`);
}
nomeCompleto("João", "Silva");
nomeCompleto("Miriu", "Antunes"); //O sistema vai mostrar os dois nomes.


//Retorno da função
//Entrada -> Processamento -> Saída, Depois desse processo a função não serve para mais nada.

function nomesCompletos(nomes, sobrenomes) {
    return `${nomes} ${sobrenomes}`
    console.log(`${nome} ${sobrenome}`); //Não vai executar, pois o return finaliza a operação, nada abaixo dele é executado
}
// nomesCompletos("João", "Silva"); Se estivesse assim, não estaria retornando nada, não estaria gravando os dados.
let completo = nomesCompletos("João", "Silva"); //Deste modo o return vai vir para a variável completo
console.log('Completo '+ completo);

//Eu sempre armazeno em uma variável o retorno da função


//Criando funções de retorno condicional

function maiorDeIdade(idade) { //dentro da função só pode ter um return, mas quando tem condicional, ele vai validar o que é verdadeiro.
    if(idade >= 18) {
        return true; //Ou vai ser esse. Poderia usar aqui o que eu quisesse.
    } else {
        return false; //Ou vai ser esse
    }
}

//let verificacao = maiorDeIdade(14); Posso fazer assim, como nessas 2 linhas ou como abaixo
//console.log(verificacao);

let idade = 20;
let verificacao = maiorDeIdade(idade);

if(verificacao) {
    console.log('É maior de idade');
} else {
    console.log('É menor de idade');
}


//Exercício
function calcPct (n1, n2) {
    let pct = (n2 / n1)*100;
    return pct;
}

let x = 30;
let y = 10;

let pct = calcPct(x, y);
console.log(`${pct}% é a porcentagem de ${x} é ${y}`);



//Exercício
function calcularImovel (metragem, quartos) {
    let m2 = 3000;
    let preco = 0;

    switch(quartos) {
        case 1:
        default:
            preco = metragem * m2;
            break;
        case 2:
            preco = metragem * (m2 * 1.2);
            break;
        case 3:
            preco = metragem * (m2 * 1.5);
            break;    
    }
    return preco;
}


let metragem = 123;
let quartos = 3;
let preco = calcularImovel(metragem, quartos);

console.log(`A casa custa R$ ${preco}`);



//Exercício

function validar (usuario, senha) {
    if (usuario === 'jeff' && senha === '123') {
        return true;
    } else {
        return false;
    }
}

let usuario = 'jeff';
let senha = '123';
let validacao = validar (usuario, senha);

if (validacao) {
    console.log(`Acesso concedido`);
} else {
    console.log(`Acesso negado`);
}



//Arrow Function
/*
function somar (x, y){
    return x + y;
}
console.log(somar(10,5));
*/

//Crio como se fosse uma variável. Acima é como faria de modo padrão, abaixo com arrow function.
/*
const somar = (x, y) => x + y; //aqui é quando eu tenho apenas uma linha
console.log(somar(10,5));
*/

//Dá pra simplificar ainda mais
/*
function sobrenome (sob) {
    return 'Bonieke' + sob;
}
console.log(sobrenome('Lacerda'));
*/
const sobrenome = sob => 'Bonieke' + sob;
console.log(sobrenome('Lacerda'));
//Abaixo mais exemplos de como posso fazer a mesma coisa que essas linhas acima
/*
Modo 1
const sobrenome = (sob) => 'Bonieke' + sob;

Modo 2
const sobrenome = (sob) => {
    return 'Bonieke' + sob;
} 

Modo 3
const sobrenome = (sob) => {
    let nomeCompleto = 'Bonieke' + sob;
    return nomeCompleto
} 
*/





//Variáveis dentro de funções
/*
function add() {
    let count = 0;
    count++; //Isso aqui é como 1+1, poderia ser declarado como count = count + 1 ou count+=1
}

add();
add();

console.log(count);
*/
//Aqui não vai ler porque eu criei a variável dentro da função.

//Vamos para outro cenário
function add() {
    count++;
}

let count = 0; //Criei fora da função

add();
add();

console.log(count);

//Se eu crio uma variável dentro, não posso usar ela fora da função, mas se eu crio a variável fora da função eu posso usar ela dentro da função.

//Variável de escopo global e variável de escopo local (dentro de fora da função)
//Se eu criar uma variável global e uma local com o mesmo nome, a função vai dar preferência para a variável local.




//Funções dentro de funções
/*
function square(x) {
    return x * x;
}
//Vai somar a raiz quadrada de dois números
function addSquare (a, b) {
    let sqrA = square(a);
    let sqrB = square(b);
    return sqrA + sqrB;
}

console.log(addSquare(2, 3));
*/

//Posso fazer com que a variável square fique dentro de addSquare

function addSquare (a, b) {
    function square(x) {
        return x * x;
    }

    let sqrA = square(a);
    let sqrB = square(b);
    return sqrA + sqrB;
}

console.log(addSquare(2, 3));

//Função dentro de função posso usar arrow function como abaixo
/*
function addSquare (a, b) {
    const square = (x) => {
        return x * x;
    }

    let sqrA = square(a);
    let sqrB = square(b);
    return sqrA + sqrB;
}

console.log(addSquare(2, 3));
*/



//Introdução a Array
let color = 'blue' //armazeno uma cor

let colors = ['blue', 'red', 'green'] //Posso armazenar número, string, bolean, o que eu quiser

console.log(colors[1]); //Todo array começa pelo 0, ou seja, o 1 é o red e o blue é 0

//Posso ter array dentro de array
let lista2 = ['teste', [xx2, yy2]];
console.log(lista2[1][1]); //Aqui eu pego um array dentro de outro, no caso aqui vai acessar o yy



//Operações básicas de array
let ingredientes = [
    'agua',
    'ovo',
    'corante',
    'sal'
]

//ingredientes[5] = 'cebola';
//Estou dizendo que o item 5 recebe a cebola, mas neste caso vai dar erro, o correto é usar o push como abaixo.
ingredientes.push('cebola'); //uso a função push. Poderia deixar vazio e usado o push
ingredientes.pop(); //remove o último item do array
ingredientes.shift(); //remove o primeiro item do array

console.log('Total de ingredientes: ${ingredientes.length}'); //o length semnpre retorna número

//Exercícios
let carros = ['BMW', 'Ferrari', 'Mercedes'];
let x1 = 1;

console.log('1. ' + carros[x1]);


//O que são objetos?
//Similar ao array, tem o mesmo princípio
let nomenclatura = 'Jef';
let nomenclaturas = ['Jeff', 'Ev']; //assim eu coloco os arrays
//Para objetos o síbolo é {}
let personagem = {
    //Preciso por o nome da chave e o valor, mas não é um número
    nome: 'Jeff', //Propriedade e valor
    idade: 20, //Propriedade e valor
    pais: 'Brasil', //Propriedade e valor
    caracteristicas: {
        cabelo: 'branco',
        olhos: ['preto', 'azul'], //Posso por um array dentro de um objeto
        altura: 1.72,
        peso: 56
    }
}

//console.log(personagem.nome); Posso usar mais de uma propriedade fazendo como abaixo
console.log(`${personagem.nome} tem ${personagem.idade} anos`);
console.log(`${personagem.caracteristicas.cabelo} tem ${personagem.idade} anos`);
console.log(`${personagem.caracteristicas.olhos[1]} tem ${personagem.idade} anos`);


//Array é para lista de coisas, objeto é para grupo de informações.



//Acessando e alterando objetos
//Vou usar o código anterior de personagem

personagem.nome //Assim eu acesso
personagem.nome = 'Pedro'; //assim eu defino

personagem.caracteristicas.peso += 5; //Estou alterando, está adicioando 5 kg

personagem.caracteristicas.olhos.push('verde'); //Aqui adiciono no array dentro do objeto


//Outro exemplo
let persongem2 = {
    nome: 'João',
    idade: 30,
    carros: [
        {modelo: 'Fiat', cor: 'preto'}, //Posso ter um objeto dentro do array
        {modelo: 'Ferrari', cor: 'vermelha'}
    ]
}

console.log(personagem.carros[0].modelo);




//Função dentro de objeto
let pessoinha = {
    nome: 'Jef',
    sobrenome: 'DB',
    idade: 20,
    nomeCompletasso: function() {
        return `${this.nome} ${this.sobrenome}`; //This se refere ao próprio objeto, ao item, acessa o próprio objeto
    }
}

console.log(pessoa.nomeCompletasso()); //com o () após o nome da função ele retorna a função, não tem como acessar ao this do objeto se usar um arrow function




//O loop for
//Para executar um código várias vezes

for(let n = 0; n < 10; n++) { //tenho que por o inicio do contador, a condicional para o código continuar executando, depois de definir e de por a condição ele executa o terceiro item. 
    console.log('Frase qualquer' + n); //vai executar 10 vezes e vai por os números
}




//Dando loop em arrays
let listaCores = ['preto', 'branco', 'azul', 'vermelho'];

for(let nCor = 0; nCor < listaCores.length; nCor++) { //o listaCores.length vai puxar a quantidade de itens, mesmo que eu adicione mais pelo push
    console.log(listaCores[nCor]);
}

//Tem forma mais fácil de trabalhar com o for

for(let i in listaCores) { //crio a variável i, o i vai ser a chave aqui
    console.log(listaCores[i]); //um ahora o i vai ser 0, depois 1, depois 2 e por aí em diante.
}

//Outro modo de usar o for
for(let listaCor of listaCores) { //aqui o let of está se referindo ao valor
    console.log(listaCor);
}

//Exemplo com objeto

let coresListadas = [
    {nome: 'azul', qt: 10},
    {nome: 'amarelo', qt: 13},
    {nome: 'vermelho', qt: 14},
];

/*
for (let coresListadasfinal of coresListadas) {
    console.log(`Nome: ${coresListadasfinal.nome} - ${coresListadasfinal.qt}`);
}
*/

//Também posso usar assim
for(let i in coresListadas) {
    console.log(coresListadas[i].nome); //o item do array é um objeto, aí coloco o ponto para acessar ele
}


//Posso transformar os nomes em maiúsculas com o toUpperCase

for(let i in coresListadas) {
    coresListadas[i].nome = coresListadas[i].nome.toUpperCase();
    console.log(coresListadas[i].nome);
}

//Uso o loop para acessar ou alterar informações




//O loop while
let numero = 0;

while (numero < 10) {
    console.log (`O número da vez é ${numero}`);
    numero++;
}