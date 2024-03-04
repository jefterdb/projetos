'''
# Importação das bibliotecas necessárias
import requests
from bs4 import BeautifulSoup

# URL do site alvo
url = 'https://www.saoluisead.com.br/cursos-graduacao-a-distancia-ead'

# Headers para simular um navegador
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Realiza a requisição HTTP GET para a URL especificada com os headers definidos
response = requests.get(url, headers=headers)

# Imprime o código de status da resposta
print(response.status_code)  # Espera-se 200, indicando sucesso

# Cria um objeto BeautifulSoup para parsear o HTML da resposta
soup = BeautifulSoup(response.text, 'html.parser')

# Busca no HTML parseado todos os elementos div com a classe especificada
elementos = soup.find_all('div', class_='valor-item')

# Verifica se algum elemento foi encontrado
if elementos:
    for elemento in elementos:
        print(elemento.text)  # Imprime o texto de cada elemento encontrado
else:
    print("Elementos não encontrados.")  # Mensagem caso nenhum elemento seja encontrado
'''

import requests
from bs4 import BeautifulSoup

# Defina os headers para evitar o erro 403 Forbidden
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Lista para armazenar os elementos encontrados
elementos_encontrados = []

# Vamos supor que você quer pegar dados de 5 páginas diferentes
numero_de_paginas = 5
base_url = "https://www.unip.br/cursos/graduacao/tradicionais/"

for i in range(1, numero_de_paginas + 1):
    # Constrói a URL para a página atual
    url_atual = f"{base_url}{i}"
    response = requests.get(url_atual, headers=headers)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Encontra todos os elementos com a classe desejada na página atual
        elementos = soup.find_all('span', class_='valor-mensalidade')
        
        for elemento in elementos:
            elementos_encontrados.append(elemento.text)
    else:
        print(f"Erro {response.status_code} ao acessar {url_atual}")

# Imprime ou processa os dados coletados
for elemento in elementos_encontrados:
    print(elemento)
