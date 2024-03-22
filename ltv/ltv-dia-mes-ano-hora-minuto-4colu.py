import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta

# Carrega o arquivo Excel
arquivo_excel = 'D:\\Download\\1.xlsx'  # Certifique-se de substituir 'seu_arquivo.xlsx' pelo caminho correto do seu arquivo
df = pd.read_excel(arquivo_excel)

# Certifica-se de que as colunas de data são interpretadas como datetime
colunas_datas = ['a', 'b', 'c', 'd']  # Substitua pelos nomes das suas colunas
for coluna in colunas_datas:
    df[coluna] = pd.to_datetime(df[coluna], errors='coerce')  # Converte para datetime, tratando erros

# Função para calcular a diferença entre as datas
def calcula_diferenca(d1, d2):
    # Verifica se d1 e d2 não são NaT (Not a Time - equivalente a NaN para datetimes)
    if pd.notnull(d1) and pd.notnull(d2):
        delta = relativedelta(d2, d1)
        return delta.years, delta.months, delta.days, delta.hours, delta.minutes
    else:
        return None  # Retorna None se alguma das datas for NaT

# Calcula a diferença e armazena em um dicionário de médias
medias = {}
for i in range(len(colunas_datas) - 1):
    coluna_atual = colunas_datas[i]
    proxima_coluna = colunas_datas[i + 1]
    df[f'Diferença_{coluna_atual}_{proxima_coluna}'] = df.apply(lambda row: calcula_diferenca(row[coluna_atual], row[proxima_coluna]), axis=1)
    # Filtra linhas onde ambas as colunas têm valores não nulos
    df_filtrado = df.dropna(subset=[coluna_atual, proxima_coluna])
    dias_totais = df_filtrado[f'Diferença_{coluna_atual}_{proxima_coluna}'].apply(lambda x: x[0] * 365 + x[1] * 30 + x[2]).mean()
    medias[f'{coluna_atual}_{proxima_coluna}'] = dias_totais

# Converte a média de dias de volta para anos, meses, dias, horas e minutos
for coluna_media, dias_totais in medias.items():
    if dias_totais is not None:
        anos_media = dias_totais // 365
        dias_restantes = dias_totais % 365
        meses_media = dias_restantes // 30
        dias_media = dias_restantes % 30
        horas_media = df_filtrado[f'Diferença_{coluna_media}'].apply(lambda x: x[3]).mean()
        minutos_media = df_filtrado[f'Diferença_{coluna_media}'].apply(lambda x: x[4]).mean()

        print(f'Média de tempo entre as colunas {coluna_media}: {int(anos_media)} anos, {int(meses_media)} meses, {int(dias_media)} dias, {int(horas_media)} horas e {int(minutos_media)} minutos.')
    else:
        print(f'Não há dados suficientes para calcular a média entre as colunas {coluna_media}.')
