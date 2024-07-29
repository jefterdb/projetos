#Este código pega os domínios dos emails extraídos no buscador de tipo de email,  depois ele valida, neste caso o código pode demorar para terminar de rodar.

import pandas as pd
import dns.resolver
import os
from concurrent.futures import ThreadPoolExecutor

# Cache para armazenar resultados de domínio já resolvidos
domain_cache = {}

def check_mx(domain):
    if domain in domain_cache:
        return domain_cache[domain]
    try:
        records = dns.resolver.resolve(domain, 'MX')
        result = "Ok"
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.exception.Timeout):
        result = "Inválido"
    domain_cache[domain] = result
    return result

def validate_domains(file_path):
    # Ler o arquivo Excel
    df = pd.read_excel(file_path)
    
    # Usar a primeira coluna, independentemente do nome
    first_column = df.iloc[:, 0]
    
    # Validar os domínios em paralelo
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(check_mx, first_column))
    
    # Adicionar a nova coluna com os resultados
    df['validacao'] = results
    
    # Obter o nome do arquivo sem a extensão
    base_name = os.path.splitext(file_path)[0]
    
    # Criar o novo nome do arquivo
    new_file_path = f"{base_name}_dominio_validado.xlsx"
    
    # Salvar o resultado em um novo arquivo Excel
    df.to_excel(new_file_path, index=False)
    print(f"Arquivo salvo como {new_file_path}")

# Substitua 'seu_arquivo.xlsx' pelo caminho do seu arquivo
file_path = 'C:\\Users\\jefter.barony\\Downloads\\domains_base-rd.xlsx'
validate_domains(file_path)
