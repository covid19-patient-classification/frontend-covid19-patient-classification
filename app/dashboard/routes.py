from app.dashboard import blueprint
from flask import render_template, redirect


@blueprint.route('/')
def index():
    return render_template('home/dashboard.html', segment='dashboard')


@blueprint.route('/dashboard')
@blueprint.route('/index')
def dashboard():
    return redirect('/')
