# Este código valida as colunas que eu quiser, mas ele valida entre colunas, ele observa se tem o mesmo valor na coluna A e B, por exemplo.

import pandas as pd
import os
import string

# Função para verificar duplicidade nas colunas especificadas
def verificar_duplicidade(df, colunas):
    df['Duplicidade'] = 'ok'
    for i, row in df.iterrows():
        valores = row[colunas].dropna().values
        if len(valores) != len(set(valores)):
            df.at[i, 'Duplicidade'] = 'duplicidade'
    return df

# Função para converter letras de colunas em índices
def colunas_para_indices(colunas_letras):
    return [string.ascii_uppercase.index(letra.upper()) for letra in colunas_letras]

# Carregar o arquivo Excel
arquivo_excel = 'C:\\Users\\jefter.barony\\Downloads\\validacao_validado.xlsx'  # Substitua pelo caminho do seu arquivo
df = pd.read_excel(arquivo_excel)

# Definir manualmente as letras das colunas a serem verificadas
colunas_letras = ['B', 'C', 'D']  # Substitua pelas letras das colunas desejadas

# Converter letras das colunas para índices
colunas_indices = colunas_para_indices(colunas_letras)

# Obter os nomes das colunas a partir dos índices
colunas_interesse = [df.columns[i] for i in colunas_indices]

# Verificar duplicidade
df = verificar_duplicidade(df, colunas_interesse)

# Gerar o novo nome do arquivo
nome_base, extensao = os.path.splitext(arquivo_excel)
novo_arquivo_excel = f"{nome_base}_duplicidade_verificada{extensao}"

# Salvar o novo arquivo Excel
df.to_excel(novo_arquivo_excel, index=False)

print(f"Arquivo salvo como: {novo_arquivo_excel}")
