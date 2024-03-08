# tasks.py
import os
from agents import ChatGPT, Agente

# Coloque sua chave de API da OpenAI aqui
api_key = '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'

# Crie uma instância do GPT-4
gpt4 = ChatGPT()

# Crie uma instância do Agente
agente = Agente(gpt4, api_key)

# Definindo o diretório onde estão os arquivos a serem lidos
diretorio = 'C:\\Users\\jefter.barony\\Documents\\GPT Learning'

# Listar todos os arquivos no diretório
arquivos = os.listdir(diretorio)

# Vamos ler cada arquivo e usar o agente para realizar uma tarefa com base no conteúdo do arquivo
for arquivo in arquivos:
    caminho_completo = os.path.join(diretorio, arquivo)
    with open(caminho_completo, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    
    # Aqui, você pode usar o conteúdo do arquivo como um prompt para o GPT-4
    resultado = agente.realizar_tarefa(conteudo)
    print(f"Resultado para o arquivo {arquivo}:\n{resultado}\n")

import os

def read_files_from_folder(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'r') as file:
                # Adicione seu código aqui para fazer algo com o conteúdo do arquivo
                print(file.read())

folder_path = r'C:\Users\jefter.barony\Documents\GPT Learning'
read_files_from_folder(folder_path)
