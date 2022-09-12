from app.patient import blueprint
from flask import render_template, jsonify


@blueprint.route('/new-patient')
def index():
    return render_template('home/new-patient.html', segment='patient', page_name='Clasificar Paciente')


@blueprint.route('/classify-patient', methods=['POST'])
def classify_patient():
    return jsonify({'type': 'critical'}, 200)
