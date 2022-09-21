from app.patient import blueprint
from flask import abort, render_template, jsonify, request


@blueprint.route('/classify-patient', methods=['GET', 'POST'])
def classify_patient():
    try:
        if request.method == 'GET':
            return render_template('home/classify-patient.html', segment='patient', page_name='Clasificar Paciente')

        print(request.form.to_dict())
        return jsonify({'type': 'critical'}, 200)
    except Exception:
        abort(500)
