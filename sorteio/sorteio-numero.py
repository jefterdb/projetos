import random
import os

# Definindo o nome do arquivo onde o histórico será armazenado
nome_arquivo_historico = "historico_sorteio.txt"

def sortear_numero_unico(numero_maximo):
    # Verificar se o arquivo de histórico existe e ler o conteúdo
    if os.path.exists(nome_arquivo_historico):
        with open(nome_arquivo_historico, "r") as arquivo:
            numeros_sorteados = [int(numero) for numero in arquivo.read().split() if numero.isdigit()]
    else:
        numeros_sorteados = []
    
    # Gerar uma lista de possíveis números a serem sorteados, excluindo os já sorteados
    numeros_possiveis = [numero for numero in range(1, numero_maximo + 1) if numero not in numeros_sorteados]
    
    # Verificar se ainda há números disponíveis para sortear
    if not numeros_possiveis:
        return None, numeros_sorteados  # Todos os números já foram sorteados
    
    # Sortear um novo número da lista de possíveis números
    numero_sorteado = random.choice(numeros_possiveis)
    numeros_sorteados.append(numero_sorteado)
    
    # Atualizar o arquivo de histórico com o novo número sorteado
    with open(nome_arquivo_historico, "w") as arquivo:
        arquivo.write(" ".join(str(numero) for numero in numeros_sorteados))
    
    return numero_sorteado, numeros_sorteados[:-1]  # Retornar o número sorteado e o histórico excluindo o último sorteado

# Exemplo de uso
numero_maximo = 100
numero_sorteado, historico = sortear_numero_unico(numero_maximo)

if numero_sorteado is not None:
    print(f"Número sorteado: {numero_sorteado}")
    if historico:
        print(f"Histórico de números sorteados anteriormente: {historico}")
    else:
        print("Este é o primeiro sorteio.")
else:
    print("Todos os números já foram sorteados.")
