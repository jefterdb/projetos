# Filtrar as datas de criação de registro, etapa matriculado, data na etapa há X dias

import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta

# Carrega o arquivo Excel
arquivo_excel = 'C:\\Users\\jefter.barony\\Downloads\\users.xlsx'  # Certifique-se de substituir 'seu_arquivo.xlsx' pelo caminho correto do seu arquivo
df = pd.read_excel(arquivo_excel)

# Certifica-se de que as colunas de data são interpretadas como datetime
df['inicio'] = pd.to_datetime(df['inicio'], errors='coerce')  # Converte para datetime, tratando erros
df['fim'] = pd.to_datetime(df['fim'], errors='coerce')  # Converte para datetime, tratando erros

# Função para calcular a diferença entre as datas
def calcula_diferenca(d1, d2):
    # Verifica se d1 e d2 não são NaT (Not a Time - equivalente a NaN para datetimes)
    if pd.notnull(d1) and pd.notnull(d2):
        delta = relativedelta(d2, d1)
        return delta.years, delta.months, delta.days
    else:
        return 0, 0, 0  # Retorna 0 anos, 0 meses, 0 dias se alguma das datas for NaT

# Calcula a diferença para cada linha usando os nomes das colunas diretamente
df['Diferença'] = df.apply(lambda row: calcula_diferenca(row['inicio'], row['fim']), axis=1)

# Converte as diferenças em dias para uma média geral
dias_totais = df['Diferença'].apply(lambda x: x[0] * 365 + x[1] * 30 + x[2]).mean()

# Converte a média de dias de volta para anos, meses, dias
anos_media = dias_totais // 365
dias_restantes = dias_totais % 365
meses_media = dias_restantes // 30
dias_media = dias_restantes % 30

print(f'Média de tempo entre as datas: {int(anos_media)} anos, {int(meses_media)} meses e {int(dias_media)} dias.')