from app.patient import blueprint
from flask import render_template


@blueprint.route('/new-patient')
def index():
    return render_template('home/new-patient.html', segment='patient')
