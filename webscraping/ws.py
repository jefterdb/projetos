import requests
from bs4 import BeautifulSoup

url = 'https://unasp.br/cursos/ec/graduacao/administracao/'
response = requests.get(url)

print(response.status_code)  # Deve imprimir 200

soup = BeautifulSoup(response.text, 'html.parser')

elemento = soup.find('li', class_='data-shift-index')
print(elemento.text)
