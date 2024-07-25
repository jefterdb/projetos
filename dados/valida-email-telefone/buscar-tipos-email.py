#Este código me da a relação de domínios nos e-mails.

import pandas as pd
import re
import os

def extract_email_domains(file_path):
    # Carregar o arquivo Excel
    df = pd.read_excel(file_path)

    # Procurar a coluna que contenha a palavra "email" ou variações
    email_column = None
    for col in df.columns:
        if re.search(r'\bemail\b|\bemails\b|\be-mail\b|\be-mails\b', col, re.IGNORECASE):
            email_column = col
            break

    if not email_column:
        print("Nenhuma coluna de email encontrada.")
        return

    # Extrair os domínios dos emails (converter para minúsculas)
    df['domain'] = df[email_column].apply(lambda x: '@' + x.split('@')[1].lower() if isinstance(x, str) and '@' in x else None)
    unique_domains = sorted(df['domain'].dropna().unique())

    # Mostrar os domínios na tela
    print("Domínios encontrados:")
    for domain in unique_domains:
        print(domain)

    # Obter o diretório do arquivo original
    directory = os.path.dirname(file_path)
    
    # Criar o nome do novo arquivo
    base_name = os.path.basename(file_path)
    output_file_name = f"domains_{base_name}"
    output_file_path = os.path.join(directory, output_file_name)

    # Salvar a relação completa em um novo arquivo Excel
    domains_df = pd.DataFrame(unique_domains, columns=['Email Domains'])
    domains_df.to_excel(output_file_path, index=False)
    print(f"A relação completa foi salva em {output_file_path}")

# Exemplo de uso
file_path = 'C:\\Users\\jefter.barony\\Downloads\\validacao.xlsx'  # Substitua pelo caminho do seu arquivo
extract_email_domains(file_path)
