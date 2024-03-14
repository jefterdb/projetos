import pandas as pd

# Caminho para a sua planilha Excel
caminho_planilha = 'C:\\Users\\jefter.barony\\Downloads\\codigo.xlsx'
# Caminho onde você deseja salvar a planilha modificada
caminho_planilha_modificada = 'C:\\Users\\jefter.barony\\Downloads\\planilha_modificada.xlsx'
# Nome da coluna que contém os códigos
coluna_codigo = 'Código'

# Lendo a planilha
df = pd.read_excel(caminho_planilha)

# Função para adicionar o código ao link principal
def adicionar_codigo_ao_link_principal(codigo):
    link_base = "https://vestibular.unasp.br/?pIDPS=&pModalidade=PRESENCIAL&curso=&unidade=&pFormaingresso=&cupom="
    return link_base + str(codigo)

# Função para adicionar o código ao segundo link
def adicionar_codigo_ao_segundo_link(codigo):
    link_base = "go.unasp.br/"
    return link_base + str(codigo)

# Aplicando a função a cada código na coluna para criar as novas colunas com os links modificados
df['Link Modificado Principal'] = df[coluna_codigo].apply(adicionar_codigo_ao_link_principal)
df['Link Modificado Secundário'] = df[coluna_codigo].apply(adicionar_codigo_ao_segundo_link)

# Salvar a planilha modificada no caminho especificado
df.to_excel(caminho_planilha_modificada, index=False)

print(f"Planilha modificada salva com sucesso em: {caminho_planilha_modificada}")