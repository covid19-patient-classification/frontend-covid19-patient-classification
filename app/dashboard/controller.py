import os
import requests


def get_initial_data():
    dashboard_endpoint = os.environ.get('DASHBOARD_MICROSERVICE_ENDPOINT')
    headers_payload = {
        'accept': 'application/json',
        'content-type': 'application/json'
    }
    response = requests.get(f'{dashboard_endpoint}/api/v1/patients', headers=headers_payload)
    return response
