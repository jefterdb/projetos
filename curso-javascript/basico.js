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
