import pandas as pd  # Importa a biblioteca pandas

# Carrega a planilha do Excel
planilha = pd.read_excel("datausers24.xlsx", engine='openpyxl')

# Converte as colunas de datas de strings para o tipo de data
planilha['Primeira Visita'] = pd.to_datetime(planilha['Primeira Visita'])
planilha['Tornou-se Melhor Amigo'] = pd.to_datetime(planilha['Tornou-se Melhor Amigo'])

# Calcula a diferença em dias entre as datas
planilha['Dias até se tornar melhor amigo'] = (planilha['Tornou-se Melhor Amigo'] - planilha['Primeira Visita']).dt.days

# Calcula a média dos dias
media_dias = planilha['Dias até se tornar melhor amigo'].mean()

# Exibe a média
print(f"Em média, demorou {media_dias:.2f} dias entre a primeira visita e se tornar melhor amigo.")