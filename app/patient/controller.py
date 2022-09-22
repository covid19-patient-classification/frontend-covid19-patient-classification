import os
import requests


def classify_patient(patient_data):
    classify_patient_endpoint = os.environ.get('CLASSIFY_PATIENT_MICROSERVICE_ENDPOINT')
    headers_payload = {
        'accept': 'application/json',
        'content-type': 'application/json'
    }
    response = requests.post(f'{classify_patient_endpoint}/api/v1/patient/', json=patient_data, headers=headers_payload)
    return response
