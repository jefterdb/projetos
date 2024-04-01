
import os
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Metric, Dimension

# Configura o caminho para o seu arquivo de credenciais do Google Cloud
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'D:\\Download\\key.json'

# Substitua pelo ID da propriedade do GA4
property_id = 'G-TT3ECPVC9E'

client = BetaAnalyticsDataClient()

# Configura os parâmetros da solicitação
request = RunReportRequest(
    property='properties/' + property_id,
    date_ranges=[DateRange(start_date='2023-01-01', end_date='today')],
    metrics=[Metric(name='activeUsers')],
    dimensions=[Dimension(name='pageTitle')]
)

# Faz a solicitação à API e imprime os resultados
try:
    response = client.run_report(request)
    for row in response.rows:
        print(f"Page Title: {row.dimension_values[0].value}, Active Users: {row.metric_values[0].value}")
except Exception as e:
    print(f"An error occurred: {e}")
