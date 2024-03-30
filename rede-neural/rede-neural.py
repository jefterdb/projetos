import networkx as nx
import matplotlib.pyplot as plt
import numpy as np

# Configuração para evitar o uso excessivo de recursos durante a renderização
plt.rcParams['figure.figsize'] = (12, 12)

def gerar_grafo_aleatorio(num_nos, num_arestas_por_no):
    G = nx.DiGraph()
    
    # Adicionando nós
    for i in range(1, num_nos + 1):
        G.add_node(f"No {i}")
    
    # Adicionando arestas de maneira aleatória
    for _ in range(num_nos * num_arestas_por_no):
        origem = np.random.randint(1, num_nos + 1)
        destino = np.random.randint(1, num_nos + 1)
        if origem != destino:
            G.add_edge(f"No {origem}", f"No {destino}")
    
    return G

# Gerando o grafo
num_nos = 500
num_arestas_por_no = 2  # Ajuste conforme necessário para densidade de arestas desejada
G = gerar_grafo_aleatorio(num_nos, num_arestas_por_no)

# Desenhando o grafo (pode ser muito denso para visualizar claramente)
pos = nx.spring_layout(G, seed=42)  # Posicionamento dos nós
nx.draw(G, pos, with_labels=False, node_size=20, node_color="blue", alpha=0.5)

# Mostrando o gráfico
plt.show()
