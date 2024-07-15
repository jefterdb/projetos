META

//Documentação Parametros do Usuário API da Meta
https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gtm-server-side?locale=pt_BR

Os itens abaixo eu coloco no GA4 event em parameters para enviar direto para a meta no container web
Eu poderia usar os meus parâmetros, mas lá no servidor web teria que puxar esses parâmetros por meio da camada de dados (Dados do evento) e enviar com a tag do facebook no conatiner do servidor.

//phone_number(ph)
user_data.phone_number

//first_name(fn)
user_data.address.first_name

//last_name(ln)
user_data.address.last_name

//city(ct)
user_data.address.city

//state(st)
user_data.address.region

//postal_code(zip)
user_data.address.postal_code

//country(country)
user_data.address.country



//Elementos FBC e FBP

//x-fb-ck-fbp
//x-fb-ck-fbc


URL FBClid
Tipo de variável é URL
Tipo de componente é Consulta
fbclid


-----------------------------------------------------------


GOOGLE

//Documentação do GA4
https://developers.google.com/gtagjs/reference/ga4-events#search

https://support.google.com/analytics/answer/9267735?hl=pt-BR


Eventos GA4
https://support.google.com/analytics/answer/9267735?hl=en


Google - Cookie
Cookie primário
_ga


-----------------------------------------------------------



//CORRESPONDÊNCIA DE EVENTOS ENTRE GA4 E META

https://pt-br.facebook.com/business/help/402791146561655?id=1205376682832142

https://support.google.com/analytics/answer/9234069?hl=en

1- Pagamento
GA4: add_payment_info
META: AddPaymentinfo

2- Adicionar carrinho
GA4: add_to_cart
META: AddToCart

3- Adicionar Lista de compras
GA4: add_to_wishlist
META: AddToWishlist

4- Iniciou checkout
GA4: begin_checkout
META: InitiateCheckout

5- Lead
GA4: generate_lead
META: Lead

6- Page View
GA4: page_view
META: PageView

7- Compra
GA4: purchase
META: Purchase

8- Busca
GA4: search
META: search

9- Login
GA4: signup
META: CompleteRegistration

10- Visualizar Item
GA4: view_item
META: ViewContent


-----------------------------------------------------------

//TUTORIAIS

https://www.youtube.com/watch?v=QjpogJv9HW0



------------------------------------


LINKEDIN

https://learn.microsoft.com/en-us/linkedin/marketing/conversions/conversions-api-gtm-guide?view=li-lms-2024-03

https://www.linkedin.com/help/lms/answer/a528686



------------------------------------


GOOGLE ADS API

https://developers.google.com/google-ads/api/docs/start?hl=pt-br


PARA VER NO DEVTOOLS OS EVENTOS
/collect\?.+page_view/

Sempre buscar na aba Rede


----------------------

VER SE TEM CÓDIGO DUPLICADO DE GTM

Portanto, se você notar esse erro, verifique as solicitações de rede nas ferramentas do desenvolvedor seguindo as etapas abaixo. 

Vamos abrir o Chrome (ou qualquer navegador), vá até o canto superior direito e clique nos 3 pontos. 
Agora navegue até Mais ferramentas -> Ferramentas do desenvolvedor. 
Selecione a guia rede e pesquise gtm.js com a opção Todos selecionada. Agora atualize a página.  
Agora veja quantas vezes o gtm.js apareceu.  
Se for apenas uma vez, você está pronto para ir. Apenas ignore os avisos do Tag Assistant.  
Se for mais de uma vez, observe mais de perto os contêineres adicionados ao site e remova os irrelevantes.  