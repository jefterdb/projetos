import openai

class ChatGPT:
    def __init__(self, api_key, model_name='gpt-4', temperature=0.7):
        self.api_key = "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"
        self.model_name = model_name
        self.temperature = temperature

    def send_prompt(self, prompt):
        response = openai.Completion.create(
            engine=self.model_name,
            prompt=prompt,
            temperature=self.temperature,
            max_tokens=150
        )
        return response.choices[0].text.strip()

class Agente:
    def __init__(self, chatgpt_instance):
        self.gpt = chatgpt_instance

class AgentePesquisador(Agente):
    def pesquisar(self, consulta):
        return self.gpt.send_prompt(f"Pesquise sobre: SEO e como fazer buscas na internet")

class AgenteEscritor(Agente):
    def escrever(self, tema):
        return self.gpt.send_prompt(f"Escreva um artigo sobre: Melhores práticas de SEO")

# Insira mais classes de agentes conforme necessário...
