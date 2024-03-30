import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from dateutil.relativedelta import relativedelta

# Carrega o arquivo Excel
df = pd.read_excel('D:\\Download\\rd.xlsx', sheet_name='rd')

# Calcula a média da coluna "Total de conversões"
media_conversoes = df['Total de conversões'].mean()
print(f'Média de conversões: {media_conversoes}')

# Calcula a diferença de tempo entre as conversões
df['Data da primeira conversão'] = pd.to_datetime(df['Data da primeira conversão'])
df['Data da última conversão'] = pd.to_datetime(df['Data da última conversão'])

def diferenca_em_anos_meses_dias(inicio, fim):
    if pd.isnull(inicio) or pd.isnull(fim):
        return np.nan  # Retorna um valor NaN se alguma das datas for NaN
    rdelta = relativedelta(fim, inicio)
    return f"{rdelta.years} anos, {rdelta.months} meses, {rdelta.days} dias"

df['tempo entre conversões'] = df.apply(lambda row: diferenca_em_anos_meses_dias(row['Data da primeira conversão'], row['Data da última conversão']), axis=1)

# Encontra os 3 nomes que mais se repetem em "Origem da primeira conversão"
origens_primeira = df['Origem da primeira conversão'].value_counts().head(3)
print('Top 3 origens da primeira conversão:')
print(origens_primeira)

# Encontra os 3 nomes que mais se repetem em "Origem da última conversão"
origens_ultima = df['Origem da última conversão'].value_counts().head(3)
print('Top 3 origens da última conversão:')
print(origens_ultima)

# Considera cada evento separado por "/" como um item único
# Primeiro, dividimos a string por "/", expandimos em linhas, depois contamos os valores
eventos = df['Eventos (Últimos 100)'].str.split('/').explode().value_counts().head(10)
print('Top 10 eventos mais repetidos:')
print(eventos)


# Gráficos

# Gráfico para a Média de Conversões
plt.figure(1)  # Cria uma nova figura
plt.bar(['Média de Conversões'], [media_conversoes], color='skyblue')
plt.ylabel('Média')
plt.title('Média de Conversões')

# Gráfico para Top 3 Origens da Primeira Conversão
plt.figure(2)  # Cria outra nova figura
origens_primeira.plot(kind='bar', color='lightgreen')
plt.title('Top 3 Origens da Primeira Conversão')
plt.ylabel('Frequência')

# Gráfico para Top 3 Origens da Última Conversão
plt.figure(3)  # Cria mais uma nova figura
origens_ultima.plot(kind='bar', color='lightblue')
plt.title('Top 3 Origens da Última Conversão')
plt.ylabel('Frequência')

# Gráfico para Top 10 Eventos Mais Repetidos
plt.figure(4)  # Cria ainda outra nova figura
eventos.plot(kind='bar', color='salmon')
plt.title('Top 10 Eventos Mais Repetidos')
plt.ylabel('Frequência')
plt.xticks(rotation=45)

plt.show()  # Mostra todos os gráficos criados