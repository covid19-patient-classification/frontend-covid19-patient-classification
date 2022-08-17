from app.dashboard import blueprint
from flask import render_template, redirect


@blueprint.route('/')
@blueprint.route('/index')
def index():
    return render_template('home/dashboard.html', segment='dashboard')


@blueprint.route('/dashboard')
def dashboard():
    return redirect('/')
