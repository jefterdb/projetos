import pandas as pd
import os

# Caminho do arquivo original
file_path = 'D:\\Downloads\\rd.xlsx'

# Carrega o arquivo Excel
df = pd.read_excel(file_path)

# Concatena todas as colunas em uma única série, removendo duplicados
unique_values = pd.concat([df[col] for col in df.columns]).drop_duplicates()

# Obtém o diretório do arquivo original
dir_name = os.path.dirname(file_path)

# Define o caminho completo para o novo arquivo no mesmo diretório
new_file_path = os.path.join(dir_name, 'arquivo_unico.xlsx')

# Salva os valores únicos em um novo arquivo Excel no mesmo diretório
unique_values.to_excel(new_file_path, index=False, header=False)

print(f"Arquivo salvo em: {new_file_path}")
