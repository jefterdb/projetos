import os

def read_files_from_folder(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'r') as file:
                # Adicione seu código aqui para fazer algo com o conteúdo do arquivo
                print(file.read())

folder_path = r'C:\Users\jefter.barony\Documents\GPT Learning'
read_files_from_folder(folder_path)