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

if (teste4 >= 18 && teste4 < 60) { //&& é um e, ou seja, tem que corresponder as duas questões. Posso suar também o ||, que significa um ou.
        console.log("Você é adulto");
}