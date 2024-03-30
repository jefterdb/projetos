from notion_client import Client

notion = Client(auth="secret_FGVz3Cxtpc2i5hikgquMAzSHzIbvdh6anyswwjiqqX1")

database_id = "teste-8521193469f345e38481bfe286ce08d3"

# Lendo a base de dados
response = notion.databases.query(database_id=database_id)

for item in response['results']:
    # Aqui você extrairia suas palavras-chave da base de dados
    print(item)  # Este comando é só um placeholder
