import os
import requests

headers_payload = {
        'accept': 'application/json',
        'content-type': 'application/json'
}

dashboard_endpoint = os.environ.get('DASHBOARD_MICROSERVICE_ENDPOINT')


def get_initial_data():
    response = requests.get(f'{dashboard_endpoint}/api/v1/patients', headers=headers_payload)
    return response


def filter_data(request):
    params = request.args.to_dict()
    response = requests.get(f'{dashboard_endpoint}/api/v1/patients', headers=headers_payload, params=params)
    return response
