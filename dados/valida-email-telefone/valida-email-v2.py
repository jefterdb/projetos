import pandas as pd
import re
import os
import fnmatch

def buscar_arquivo(nome_arquivo, diretorios_raiz):
    for diretorio_raiz in diretorios_raiz:
        for pasta, subpastas, arquivos in os.walk(diretorio_raiz):
            for nome in fnmatch.filter(arquivos, nome_arquivo):
                return os.path.join(pasta, nome)
    return None

def validar_email(email):
    regex = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    if pd.isnull(email) or regex.match(email) is None:
        return "Erro"
    else:
        return "Válido"

# Modifique esta lista para incluir todos os diretórios raízes desejados
diretorios_raiz = ['C:\\', 'D:\\', 'E:\\']  # Exemplo para Windows

nome_arquivo_pesquisa = 'rd-email.xlsx'
caminho_arquivo_original = buscar_arquivo(nome_arquivo_pesquisa, diretorios_raiz)

if caminho_arquivo_original is not None:
    diretorio, nome_arquivo = os.path.split(caminho_arquivo_original)
    nome_base, extensao = os.path.splitext(nome_arquivo)
    caminho_arquivo_novo = os.path.join(diretorio, f'{nome_base}_modificado{extensao}')
    
    df = pd.read_excel(caminho_arquivo_original)
    df['Status do E-mail'] = df['Email'].apply(validar_email)
    df.to_excel(caminho_arquivo_novo, index=False)
    
    print(f'Arquivo salvo como: {caminho_arquivo_novo}')
else:
    print(f'Arquivo "{nome_arquivo_pesquisa}" não encontrado nos diretórios especificados.')