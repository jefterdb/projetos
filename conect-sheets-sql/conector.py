from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Configurações da API
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SERVICE_ACCOUNT_FILE = r'C:\\Users\\jefter.barony\\OneDrive - Adventistas\\Base de dados Relatório\\chave-servico-relatorio-midia.json'

credentials = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = build('sheets', 'v4', credentials=credentials)

# O ID da sua planilha e o intervalo de leitura
SPREADSHEET_ID = '1AcLp_bojwS_um5zJNKQOGJndUQAF9M8AAlN6_OZ4Cu4'
range_name = 'facebook!A1:N100'  # Exemplo de intervalo

sheet = service.spreadsheets()
result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=range_name).execute()
rows = result.get('values', [])

print('Dados lidos do Google Sheets:')
for row in rows:
    print(row)

import pyodbc

# Configurações do banco de dados SQL Server
server = 'your_server.database.windows.net'
database = 'your_database'
username = 'your_username'
password = 'your_password'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server +
                      ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password)
cursor = cnxn.cursor()

# Supondo que você esteja inserindo dados em uma tabela com colunas correspondentes
# ao que foi lido do Google Sheets  
insert_query = 'INSERT INTO YourTableName (Column1, Column2, Column3, Column4) VALUES (?, ?, ?, ?)'

for row in rows:
    # Assegure-se de que 'row' contém todos os campos necessários para a inserção
    cursor.execute(insert_query, row)

cnxn.commit()
print('Dados enviados para o SQL Server com sucesso.')