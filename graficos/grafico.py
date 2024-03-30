import matplotlib.pyplot as plt

# Dados
categorias = ['Categoria A', 'Categoria B', 'Categoria C']
valores = [23, 45, 56]

# Criando um gráfico de barras
plt.bar(categorias, valores)

# Adicionando títulos e rótulos
plt.title('Gráfico de Barras Exemplo')
plt.xlabel('Categorias')
plt.ylabel('Valores')

# Mostrando o gráfico
plt.show()