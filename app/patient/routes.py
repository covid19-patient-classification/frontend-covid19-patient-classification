from app.patient import blueprint
from app.patient import controller as patient_controller, mapper as patient_mapper
from flask import abort, render_template, request


@blueprint.route('/classify-patient', methods=['GET', 'POST'])
def classify_patient():
    try:
        if request.method == 'GET':
            return render_template('home/classify-patient.html', segment='patient', page_name='Clasificar Paciente')

        patient_data = patient_mapper.patient_form_to_json(request.form)
        response = patient_controller.classify_patient(patient_data)
        return response.json(), response.status_code
    except Exception as e:
        abort(500, e)
