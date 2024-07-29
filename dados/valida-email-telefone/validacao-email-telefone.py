#Este código valida o email e o telefone, retira caracteres especiais do telefone.

import pandas as pd
import re

def is_valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return bool(re.match(regex, email))

def clean_phone(phone):
    return re.sub(r'[^\d]', '', phone)

def is_sequential(phone):
    return len(set(phone)) == 1

def is_valid_phone(phone):
    phone = clean_phone(phone)
    if len(phone) < 7 or phone.lstrip('0') == '' or is_sequential(phone):
        return False
    return True

def process_phone(phone):
    if pd.isna(phone):
        return ''
    phones = re.split(r',|;|\s', str(phone))
    for phone in phones:
        cleaned_phone = clean_phone(phone.strip())
        if cleaned_phone.startswith('0'):
            cleaned_phone = cleaned_phone.lstrip('0')
        if len(cleaned_phone) <= 11 and is_valid_phone(cleaned_phone):
            return cleaned_phone
        if len(cleaned_phone) > 11 and not cleaned_phone.startswith('55'):
            return ''  # Número inválido
        if is_valid_phone(cleaned_phone):
            return cleaned_phone
    return ''

def process_emails(email):
    if pd.isna(email):
        return ''
    emails = re.split(r',|;|\s', str(email))
    for email in emails:
        if is_valid_email(email.strip()):
            return email.strip()
    return ''

def validate_data(file_path):
    df = pd.read_excel(file_path)

    email_keywords = ['email', 'e-mail', 'emails', 'e-mails']
    phone_keywords = ['telefone', 'phone', 'tel', 'celular']

    email_col = next((col for col in df.columns if any(keyword in col.lower() for keyword in email_keywords)), None)
    phone_col = next((col for col in df.columns if any(keyword in col.lower() for keyword in phone_keywords)), None)

    if email_col:
        df['Processed Email'] = df[email_col].apply(process_emails)
        df['Validação E-mails'] = df['Processed Email'].apply(lambda x: 'ok' if is_valid_email(x) else 'Erro')
    else:
        print("Coluna de email não encontrada.")

    if phone_col:
        df['Processed Phone'] = df[phone_col].apply(process_phone)
        df['Validação Telefones'] = df['Processed Phone'].apply(lambda x: 'ok' if is_valid_phone(x) else 'Erro')
    else:
        print("Coluna de telefone não encontrada.")

    output_file_path = file_path.replace('.xlsx', '_validado.xlsx')
    df.to_excel(output_file_path, index=False)

    print(f"Arquivo processado e salvo como {output_file_path}")

file_path = 'C:\\Users\\jefter.barony\\Downloads\\validando.xlsx'
validate_data(file_path)
