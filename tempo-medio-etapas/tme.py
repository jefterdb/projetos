import pandas as pd

# Caminho do arquivo Excel
# Certifique-se de substituir 'caminho/para/seu/arquivo.xlsx' pelo caminho correto até seu arquivo
caminho_arquivo = 'C:\\Users\\jefter.barony\\Downloads\\u.xls'

# Carregar o arquivo Excel usando openpyxl
df = pd.read_excel(caminho_arquivo, usecols=['H', 'J'], engine='openpyxl')

# Converter as colunas para datetime, ignorando erros para manter os NaT onde não for possível converter
df['H'] = pd.to_datetime(df['H'], errors='coerce')
df['J'] = pd.to_datetime(df['J'], errors='coerce')

# Remover linhas onde qualquer uma das colunas H ou J contêm NaT (anteriormente espaços em branco)
df.dropna(subset=['H', 'J'], inplace=True)

# Calcular a diferença de tempo entre as colunas J e H
df['Intervalo'] = df['J'] - df['H']

# Calcular o tempo médio entre as etapas
tempo_medio = df['Intervalo'].mean()

# Imprimir o tempo médio
print(f"O tempo médio entre as etapas é de: {tempo_medio}")
