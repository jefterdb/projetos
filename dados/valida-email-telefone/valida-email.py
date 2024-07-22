import pandas as pd
import re
import os

def validar_email(email):
    # Expressão regular para validar e-mail
    regex = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    if pd.isnull(email) or regex.match(email) is None:
        return "Erro"
    else:
        return "Válido"

# Substitua 'caminho_para_seu_arquivo.xlsx' pelo caminho correto do seu arquivo
caminho_arquivo_original = 'C:\\Users\\jefter.barony\\Downloads\\rd-email.xlsx'
# Gera o caminho para o novo arquivo no mesmo diretório do arquivo original
diretorio, nome_arquivo = os.path.split(caminho_arquivo_original)
nome_base, extensao = os.path.splitext(nome_arquivo)
caminho_arquivo_novo = os.path.join(diretorio, f'{nome_base}_modificado{extensao}')

# Carrega o arquivo Excel
df = pd.read_excel(caminho_arquivo_original)

# Assume que você tem uma coluna chamada 'Email' no seu DataFrame
# Cria uma nova coluna 'Status do E-mail' com base na validação dos e-mails
df['Status do E-mail'] = df['Email'].apply(validar_email)

# Salva o DataFrame modificado no novo arquivo
df.to_excel(caminho_arquivo_novo, index=False)

print(f'Arquivo salvo como: {caminho_arquivo_novo}')
