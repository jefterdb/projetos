import pandas as pd
import os
import fnmatch
import phonenumbers
from email_validator import validate_email, EmailNotValidError

def buscar_arquivo(nome_arquivo, diretorios_raiz):
    for diretorio_raiz in diretorios_raiz:
        for pasta, subpastas, arquivos in os.walk(diretorio_raiz):
            for nome in fnmatch.filter(arquivos, nome_arquivo):
                return os.path.join(pasta, nome)
    return None

def validar_email(email):
    try:
        validate_email(email)
        return "Ok"
    except EmailNotValidError:
        return "Erro"

def validar_telefone(telefone):
    try:
        if phonenumbers.is_valid_number(phonenumbers.parse(telefone, None)):
            return "Ok"
        else:
            return "Erro"
    except phonenumbers.NumberParseException:
        return "Erro"

# Modifique esta lista para incluir todos os diretórios raízes desejados
diretorios_raiz = ['C:\\', 'D:\\', 'E:\\']  # Exemplo para Windows

nome_arquivo_pesquisa = 'rd-final.xlsx'
caminho_arquivo_original = buscar_arquivo(nome_arquivo_pesquisa, diretorios_raiz)

if caminho_arquivo_original is not None:
    diretorio, nome_arquivo = os.path.split(caminho_arquivo_original)
    nome_base, extensao = os.path.splitext(nome_arquivo)
    caminho_arquivo_novo = os.path.join(diretorio, f'{nome_base}_modificado{extensao}')
    
    df = pd.read_excel(caminho_arquivo_original)
    
    # Verifica se as colunas 'Email' e 'Telefone' existem
    if 'Email' in df.columns:
        df['Emails Válidos'] = df['Email'].apply(validar_email)
    if 'Telefone' in df.columns:
        df['Telefones Válidos'] = df['Telefone'].apply(validar_telefone)
    
    df.to_excel(caminho_arquivo_novo, index=False)
    
    print(f'Arquivo salvo como: {caminho_arquivo_novo}')
else:
    print(f'Arquivo "{nome_arquivo_pesquisa}" não encontrado nos diretórios especificados.')