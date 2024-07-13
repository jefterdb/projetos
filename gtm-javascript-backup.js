//EMAIL

function() {
  var email = document.getElementsByName("nome do campo email")[0].value;
  return email;
}


//EMAIL - SUBIDO PRO CODE

function() {
  // Substitua o "xxxxxx" pelo name do campo email, pode ser apenas uma parte do name
  var inputs = document.querySelectorAll('input[name*="xxxxxxxxxxx"]');
  var lastValue = null;
  // Itera sobre todos os campos para encontrar o último valor não vazio
  for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].value.trim() !== "") {
  lastValue = inputs[i].value;
  }
  }
  return lastValue;
}


//-----------------------------------------------------------------------------------------------------


//NOME

function() {
  var nome = document.getElementsByName("nome do campo nome")[0].value;
  return nome;
}


//-----------------------------------------------------------------------------------------------------


//PRIMEIRO NOME

function() {
  var nome = {{jsp - NomeLead}};
  var fnome = nome.split(" ")[0];
  return fnome;
}


//PRIMEIRO NOME - SUBIDO PRO

function getName() {
  // Substitua o xxxxxxxxxx pelo name do campo name
  var inputs = document.querySelectorAll('input[name*="xxxxxxxxxxxxx"]');
  var name = null;
  // Itera sobre todos os campos para encontrar o último valor não vazio
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() !== "") {
      name = inputs[i].value;
      }
      }
      // Dividindo o nome em partes usando o espaço em branco para separar
      var names = name.split(' ');
      // Verificando se há mais de um nome
      if (names.length > 1) {
      // Removendo o último nome
      names.pop();
      }
      // Juntando os nomes novamente em uma única string
      var result = names.join(' ');
      return result;
      }


//-----------------------------------------------------------------------------------------------------


//ÚLTIMO NOME

function() {
  var nome = {{jsp - NomeLead}};
  var qtdnome = nome.split(" ").length;
  var sobrenome = nome.split(" ")[qtdnome-1];
  return sobrenome;
}


//ÚLTIMO NOME - SUBIDO PRO

function getLastname() {
  // Substitua o xxxxxxxxxx pelo name do campo name
  var inputs = document.querySelectorAll('input[name*="xxxxxxxxxxxxxx"]');
  var name = null;
  // Itera sobre todos os campos para encontrar o último valor não vazio
  for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].value.trim() !== "") {
  name = inputs[i].value;
  }
  }
  // Dividindo o nome em partes usando o espaço em branco para separar
  var names = name.split(' ');
  // Verificando se há mais de um nome
  if (names.length > 1) {
  // Retorne o último nome
  return names[names.length - 1];
  } else {
  // Se houver apenas um nome, retorne uma string vazia
  return '';
  }
  }
  

//-----------------------------------------------------------------------------------------------------


//TELEFONE

function() {
  var phone = document.getElementsByName("nome do campo telefone")[0].value;
  phone = phone.replace(/[^0-9]/g,'');
  return phone;
}


//TELEFONE - SUBIDO PRO

function () {
  // Substitua o xxxxxxxxxx pelo name do campo telefone
  var inputs = document.querySelectorAll('input[name*="xxxxxxxxxxxxxxx"]');
  var lastValue = null;
  // Itera sobre todos os campos para encontrar o último valor não vazio
  for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].value.trim() !== "") {
  lastValue = inputs[i].value;
  }
  }
  var phoneNumber = lastValue;
// Verificar se o campo de telefone está vazio ou nulo
if (!phoneNumber) {
  return ''; // Retorna uma string vazia
  }
  // Remover espaços, hífens, parênteses, acentos e caracteres especiais
  phoneNumber = phoneNumber.replace(/\s/g, '').replace(/-/g, '').replace(/\(|\)/g,
  '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Verificar se o número começa com "0" e remover
  if (phoneNumber.startsWith('0')) {
  phoneNumber = phoneNumber.substring(1);
  }
  // Verificar se o número começa com "55" (com ou sem o "+")
  if (phoneNumber.startsWith('55') || phoneNumber.startsWith('+55')) {
  // Remover "0" após o "55"
  phoneNumber = phoneNumber.replace(/^55(0\d+)/, '55$1');
  } else {
  // Adicionar "55" no início
  phoneNumber = '55' + phoneNumber;
  }
  return phoneNumber;
  }


//-----------------------------------------------------------------------------------------------------


//EVENT TIME

function() {
  return Math.round(new Date().getTime() / 1000);
}


//-----------------------------------------------------------------------------------------------------


//Identificador por ID para nome (Elements no plural)
function() {
  var nome = document.getElementById('nome do campo id').value;
  return nome;
}

//Identificador por ID para telefone (Element no singular)
function() {
  var phone = document.getElementById('celular').value;
  phone = phone.replace(/[^0-9]/g,'');
  return phone;
}

//Identificador por ID para telefone para TikTok ou concatenar
function() {
  var phone = document.getElementsByName("personal_phone")[0].value;
  phone = phone.replace(/[^0-9]/g,'');
  var plus = '+';
  var phoneFinal = plus.concat(phone);
  return phoneFinal;
}

//Identificador por ID para email (Element no singular)
function() {
  var email = document.getElementById('email').value;
  email = email.toLowerCase();
  return email;
}


//-----------------------------------------------------------------------------------------------------


//ARMAZENAR DADOS LOCAIS PELOS COOCKIES

//Cookie de Armazenamento Local (Variável Javascript Personalizado)
function() {
  var keyValue = localStorage.getItem('exemplo'); //Eu preciso achar o valor certo e substituir o valor do exemplo
  return keyValue;
}

//Cookie de Armazenamento de Sessão (Variável Javascript Personalizado)
function() {
  var keyValue = sessionStorage.getItem('exemplo'); //Eu preciso achar o valor certo e substituir o valor do exemplo
  return keyValue;
}


//-----------------------------------------------------------------------------------------------------


//RECUPERAR LOCALMENTE OS DADOS

//1- Criar um HTML com o Código abaixo:
<script>
	localStorage.setItem(‘lead_cadastrado’, true);
	localStorage.setItem(‘nome_lead’, ({nome});
	localStorage.setItem(‘telefone_lead’, ({telefone});
	localStorage.setItem(‘email_lead’, ({email});
</script>


//2- Depois criar um Código de variável do tipo JavaScript
function() {
  var nome = localStorage.getItem(‘nome’);
  return nome;
}


//-----------------------------------------------------------------------------------------------------


//Como depurar
//Ir em > Rede > Marcar a opção desativar cache > Colocar na busca collect?
//Para ver se tem tag manager duplicada e buscar: gtm.js


//-----------------------------------------------------------------------------------------------------


//Códigos extras para formatar javascript

//.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
//.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos


//-----------------------------------------------------------------------------------------------------


//LOCALIZAÇÃO - VISITOR API - SUBIDO PRO

//Faça uma exceção no Evento Personalizado de "gtm.js" e configure para disparar apenas em eventos específicos, utilizando a nova variável de JavaScript personalizado que compartilho abaixo.

function verificarPrimeiroPageView() {
  const isFirstPageview = sessionStorage.getItem('isFirstPageview');
  let verificador = false; // Usando 'let' porque 'verificador' pode ser alterado
  if (!isFirstPageview) {
  verificador = true;
  }
  return verificador;
  }


//Usando VIsitor API, seguem as variáveis (Subido Pro)

//VARIÁVEL DE PAÍS (Visitor API)
visitorApiCountryCode

//VARIÁVEL DE ESTADO (VisitorAPI)
visitorApiRegion

//VARIÁVEL DE CIDADE (VisitorAPI)
visitorApiCity


//-----------------------------------------------------------------------------------------------------


//VARIÁVEL DE GÊNERO - SUBIDO PRO

function() {
var inputs = document.querySelectorAll('input[name*="xxxxxxxxxxxxxxx"]');
var name = null;
var nameField = null;
// Itera sobre todos os campos para encontrar o último valor não vazio
for (var i = 0; i < inputs.length; i++) {
if (inputs[i].value.trim() !== "") {
  nameField = inputs[i]
name = inputs[i].value;
}
}
// ATUALIZAÇÃO - PARA A EXECUÇÃO SE O CAMPO DO FORMULÁRIO FOR VAZIO
if (!nameField || !nameField.value) {
return "";
}
// Tratar o nome
var cleanedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g,
"").replace(/[^a-zA-ZÀ-ÿ ]/g, '');
// Obter o primeiro nome
var firstName = cleanedName.split(' ')[0];
// Fazer uma requisição para a API Genderize.io para obter o gênero associado ao nome
var xhr = new XMLHttpRequest();
var url = "https://api.genderize.io?name=" + encodeURIComponent(firstName);
xhr.open("GET", url, false);
xhr.send();
if (xhr.readyState === 4 && xhr.status === 200) {
var response = JSON.parse(xhr.responseText);
var gender = response.gender;
if (gender === "male") {
return "62c66a7a5dd70c3146618063c344e531e6d4b59e379808443ce962b3abd63c5a";
} else if (gender === "female") {
return "252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111";
}
}
return ""; // Retornar vazio para gênero desconhecido ou não identificado
}