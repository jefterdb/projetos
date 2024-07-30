import pandas as pd

def column_letter_to_index(letter):
    """Converts Excel column letter to 0-based index."""
    letter = letter.upper()
    index = 0
    for char in letter:
        index = index * 26 + (ord(char) - ord('A')) + 1
    return index - 1

def process_file(file_path, event_col_letter, tag_col_letter, conversion_time_col_letters):
    # Leitura do arquivo xlsx
    df = pd.read_excel(file_path)

    # Convertendo letras das colunas em índices de colunas
    event_col_index = column_letter_to_index(event_col_letter)
    tag_col_index = column_letter_to_index(tag_col_letter)
    conversion_time_col_indices = [column_letter_to_index(letter) for letter in conversion_time_col_letters]

    # Convertendo índices de colunas em nomes de colunas
    event_col = df.columns[event_col_index]
    tag_col = df.columns[tag_col_index]
    conversion_time_cols = [df.columns[idx] for idx in conversion_time_col_indices]

    # Verificando se as colunas especificadas existem no DataFrame
    if not all(col in df.columns for col in conversion_time_cols):
        print(f"Erro: Colunas {conversion_time_cols} não encontradas no arquivo.")
        print(f"Colunas disponíveis: {list(df.columns)}")
        return

    if event_col not in df.columns:
        print(f"Erro: Coluna {event_col} não encontrada no arquivo.")
        print(f"Colunas disponíveis: {list(df.columns)}")
        return

    if tag_col not in df.columns:
        print(f"Erro: Coluna {tag_col} não encontrada no arquivo.")
        print(f"Colunas disponíveis: {list(df.columns)}")
        return

    # Extraindo a média de tempo entre a primeira e a última conversão
    df['first_conversion'] = pd.to_datetime(df[conversion_time_cols[0]], errors='coerce')
    df['last_conversion'] = pd.to_datetime(df[conversion_time_cols[1]], errors='coerce')
    df['time_difference'] = df['last_conversion'] - df['first_conversion']
    df['time_difference_days'] = df['time_difference'].dt.days
    df['time_difference_years'] = df['time_difference'].dt.days / 365.25
    df['time_difference_months'] = df['time_difference'].dt.days / 30.44

    avg_time_conversion = {
        'Average_Days': df['time_difference_days'].mean(),
        'Average_Years': df['time_difference_years'].mean(),
        'Average_Months': df['time_difference_months'].mean()
    }

    avg_time_df = pd.DataFrame([avg_time_conversion])
    avg_time_file = file_path.replace('.xlsx', '_tempo_conversao.xlsx')
    avg_time_df.to_excel(avg_time_file, index=False)

    # Extraindo as 100 tags mais usadas
    tags_series = df[tag_col].dropna().str.split(',').explode()
    top_100_tags = tags_series.value_counts().head(100)
    top_100_tags_file = file_path.replace('.xlsx', '_principais_tags.xlsx')
    top_100_tags.to_excel(top_100_tags_file)

    # Contando as ocorrências de cada evento e numerando os 100 principais eventos
    events_series = df[event_col].dropna().str.split('/').explode()
    top_100_events = events_series.value_counts().head(100)
    top_100_events_file = file_path.replace('.xlsx', '_principais_eventos.xlsx')
    top_100_events.to_excel(top_100_events_file)

    # Analisando os touchpoints
    def reverse_touchpoints(x):
        if isinstance(x, list):
            return x[::-1]
        else:
            return []
    
    touchpoints_series = df[event_col].dropna().str.split('/').apply(reverse_touchpoints)
    touchpoints_flat = touchpoints_series.explode()
    top_7_touchpoints = touchpoints_flat.value_counts().head(7)
    top_7_touchpoints_file = file_path.replace('.xlsx', '_principais_touchpoints.xlsx')
    top_7_touchpoints.to_excel(top_7_touchpoints_file)

    return avg_time_file, top_100_tags_file, top_100_events_file, top_7_touchpoints_file

# Exemplo de uso
file_path = 'D:\\Downloads\\base-rd.xlsx'
event_col_letter = 'H'  # Defina a letra da coluna para eventos
tag_col_letter = 'E'    # Defina a letra da coluna para tags
conversion_time_col_letters = ['F', 'G']  # Defina as letras das colunas para Primeira_Conversão e Última_Conversão

process_file(file_path, event_col_letter, tag_col_letter, conversion_time_col_letters)
