from app.dashboard import blueprint, controller as dashboard_controller
from flask import abort, redirect, render_template


@blueprint.route('/')
def index():
    try:
        return render_template('home/dashboard.html', segment='dashboard', page_name='Dashboard')
    except Exception:
        abort(500)


@blueprint.route('/dashboard')
@blueprint.route('/index')
def dashboard():
    return redirect('/')


@blueprint.route('/initial-dashboard-data')
def get_initial_dashboard_data():
    try:
        response = dashboard_controller.get_initial_data()
        return response.json(), response.status_code
    except Exception as e:
        abort(500, e)
