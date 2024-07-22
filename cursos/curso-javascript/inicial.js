let clima = "quente" //Ela nâo muda, o valor tem que ser quente sempre
clima = "frio"
console.log(clima)

//Outros tipos de variáveis
var teste = 12
const oi = 2

let testando = `${teste + 1} é o valor de teste` //${isso aqui é uma expressão regular, uso dentor das ``}
console.log(testando);

//Condicionais
let idade = 18;
//if=se | else=senão
if (idade > 17) {
    console.log("Você é maior de idade");
} else {
    console.log("Você é menor de idade");;
}
//> maior, < menor, == ou === igual, <= menor ou igual, >= maior ou igual, != diferente

let anos = 20

if (anos == 20) {
    console.log("Você tem 20 anos");
}

//== serve para algo não tão estrito, se eu declarar a variável 20 como string ou number vai dar certo.
//uso o === para ser mais restrito

let teste2 = 20

if (teste2 == 20) {
    teste2 = teste2 + 5;
    console.log(`Você tem ${teste2} anos`);
    console.log(teste2);
}


//Multiplas condicionais
//existe este primeiro jeito de fazer
let teste3 = 90

if (teste3 >= 18) {
    if (teste3 < 60) {
        console.log("Você é adulto");
    }
}

//Existe outro jeito melhor de se fazer
let teste4 = 90

if (teste4 >= 18 && teste4 < 60) { //&& é um E, ou seja, tem que corresponder as duas questões. Posso suar também o ||, que significa um OU.
        console.log("Você é adulto");
}

//Condicional dupla if else

let teste5 = 90

if (teste5 < 18) {
    console.log("Você é uma criança");
}

if (teste5 >= 18 && teste5 <= 60) {
    console.log("Você é um adulto");
}

if(teste5 > 60) {
    console.log("Você é um idoso");
}

//O modo acima são independentes, se deixar como está ele vai mostrar que é um idoso e também vai mostrar que é um adulto.
// Abaixo como corrigir e deixar dependente

let teste6 = 90

if (teste6 < 18) {
    console.log("Você é uma criança"); //se aqui for satisfeito ele ignora os demais.
} else if (teste6 >= 18 && teste6 <= 60) {
    console.log("Você é um adulto");
} else if(teste6 > 60) {
    console.log("Você é um idoso");
}


let xs = 0;
let ys = 5;
console.log(xs == ys);

let preco = 40.3
if(preco >= 40) {
    console.log("Está barato")
} else {
    console.log("Está caro")
}

//Condicional ternário, é um if em uma linha só

let isMember = true;
let age = 17;

let shipping = (isMember ? 2 : 10); //Coloco um ?, se for verdadeiro, o valor é 2, se for falso retorna 10

let isAdult = (age >= 18 ? 'Sim' : 'Não');
console.log(isAdult);



//Switch - é tipo uma condicional, é algo que eu tenha multiplos resultados.

let profession = "Policial";

switch(profession) {
    case 'fiscal':
        console.log("Sua camisa é verde");
    break;

    case 'Bombeiro':
        console.log("Sua camisa é vermelha");
    break;

    case 'Policial':
        console.log("Sua camisa é azul");
    break; //Os breaks servem para não ir para as outras condicionais se atender a uma delas.

}