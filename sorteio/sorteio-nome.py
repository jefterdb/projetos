import random
import os
import datetime

# Caminho para o arquivo de nomes.
caminho_arquivo_nomes = "D:\\Download\\lista.txt"  # Substitua pelo caminho correto do seu arquivo.

def ler_nomes(caminho_arquivo):
    """Lê os nomes a partir do arquivo de texto especificado."""
    with open(caminho_arquivo, "r", encoding="utf-8") as arquivo:
        return arquivo.read().splitlines()

def gerar_nome_arquivo_historico(base_dir):
    """Gera um nome de arquivo único para o histórico de sorteios com base na data e hora atuais."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    nome_arquivo = f"historico_sorteio_{timestamp}.txt"
    return os.path.join(base_dir, nome_arquivo)

def sortear_nome():
    todos_nomes = ler_nomes(caminho_arquivo_nomes)
    base_dir = os.path.dirname(caminho_arquivo_nomes)
    
    # Determina o arquivo de histórico mais recente ou cria um novo.
    arquivos_historico = sorted([f for f in os.listdir(base_dir) if f.startswith("historico_sorteio_")], reverse=True)
    caminho_arquivo_historico = os.path.join(base_dir, arquivos_historico[0]) if arquivos_historico else gerar_nome_arquivo_historico(base_dir)

    nomes_sorteados = []
    if os.path.exists(caminho_arquivo_historico):
        with open(caminho_arquivo_historico, "r", encoding="utf-8") as arquivo:
            nomes_sorteados = arquivo.read().splitlines()

    nomes_disponiveis = [nome for nome in todos_nomes if nome not in nomes_sorteados]

    if not nomes_disponiveis:
        # Todos os nomes foram sorteados; cria um novo arquivo para o próximo ciclo.
        caminho_arquivo_historico = gerar_nome_arquivo_historico(base_dir)
        nomes_sorteados = []  # Reinicia a lista para o novo ciclo.

    nome_sorteado = random.choice(todos_nomes if not nomes_disponiveis else nomes_disponiveis)
    nomes_sorteados.append(nome_sorteado)

    # Atualiza o arquivo de histórico com o nome sorteado.
    with open(caminho_arquivo_historico, "w", encoding="utf-8") as arquivo:
        arquivo.write("\n".join(nomes_sorteados))
    
    return nome_sorteado, nomes_sorteados[:-1], caminho_arquivo_historico

# Exemplo de uso
nome_sorteado, historico, arquivo_historico_atualizado = sortear_nome()
print(f"Nome sorteado: {nome_sorteado}")
if historico:
    print("Histórico de nomes sorteados neste ciclo:")
    for nome in historico:
        print(nome)
else:
    print("Este é o primeiro sorteio do ciclo.")
print(f"Arquivo de histórico atualizado: {arquivo_historico_atualizado}")
