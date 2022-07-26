from app.dashboard import blueprint, controller as dashboard_controller
from flask import abort, redirect, render_template, request
import os


@blueprint.route('/')
def index():
    try:
        return render_template('home/dashboard.html', segment='dashboard', page_name='Dashboard', websocket_server=os.environ.get('WEBSOCKET_SERVER'))
    except Exception as e:
        abort(500, e)


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


@blueprint.route('/filter-patient-card')
def filter_patient_card():
    try:
        response = dashboard_controller.filter_data(request)
        return response.json(), response.status_code
    except Exception as e:
        abort(500, e)


@blueprint.route('/filter-total-line-chart')
def filter_total_line_chart():
    response = dashboard_controller.filter_data(request)
    return response.json(), response.status_code


@blueprint.route('/filter-summary-table')
def filter_summary_table():
    response = dashboard_controller.filter_data(request)
    return response.json(), response.status_code
