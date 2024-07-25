import pandas as pd
import re
import phonenumbers

def is_valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if re.match(regex, email):
        return True
    else:
        return False

def is_valid_phone(phone):
    try:
        phone_number = phonenumbers.parse(phone, "BR")
        return phonenumbers.is_valid_number(phone_number)
    except phonenumbers.NumberParseException:
        return False

def process_emails(email):
    if pd.isna(email):
        return ''
    emails = re.split(r',|;|\s', str(email))
    for email in emails:
        if is_valid_email(email.strip()):
            return email.strip()
    return ''

def process_phones(phone):
    if pd.isna(phone):
        return ''
    phones = re.split(r',|;|\s', str(phone))
    for phone in phones:
        if is_valid_phone(phone.strip()):
            return phone.strip()
    return ''

def validate_data(file_path):
    df = pd.read_excel(file_path)

    email_col = next((col for col in df.columns if 'email' in col.lower()), None)
    phone_col = next((col for col in df.columns if 'telefone' in col.lower() or 'phone' in col.lower()), None)

    if email_col:
        df['Processed Email'] = df[email_col].apply(process_emails)
        df['Validação E-mails'] = df['Processed Email'].apply(lambda x: 'ok' if is_valid_email(x) else 'Erro')
    else:
        print("Coluna de email não encontrada.")

    if phone_col:
        df['Processed Phone'] = df[phone_col].apply(process_phones)
        df['Validação Telefones'] = df['Processed Phone'].apply(lambda x: 'ok' if is_valid_phone(x) else 'Erro')
    else:
        print("Coluna de telefone não encontrada.")

    output_file_path = file_path.replace('.xlsx', '_validado.xlsx')
    df.to_excel(output_file_path, index=False)

    print(f"Arquivo processado e salvo como {output_file_path}")

file_path = 'C:\\Users\\jefter.barony\\Downloads\\validacao.xlsx'
validate_data(file_path)
