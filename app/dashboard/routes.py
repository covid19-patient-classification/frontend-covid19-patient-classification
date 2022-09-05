from app.dashboard import blueprint
from flask import abort, jsonify, redirect, render_template


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
    data = {
        "weekly_ranking": {
            "date": "30 de agosto - 05 de septiembre",
            "labels": ["30 ago", "31 ago", "01 sep", "02 sep", "03 sep", "04 sep", "05 sep"],
            "values": {
                "moderate_patients": {
                    "label": "Pacientes Moderados",
                    "data": [10, 7, 5, 7, 5, 5, 5],
                    "total": 42,
                    "percentage": 10,
                    "percentage_label": "desde la semana pasada"
                },
                "serius_patients": {
                    "label": "Pacientes Graves",
                    "data": [3, 3, 3, 5, 3, 3, 3],
                    "total": 23,
                    "percentage": 5,
                    "percentage_label": "desde la semana pasada"
                },
                "critical_patients": {
                    "label": "Pacientes Críticos",
                    "data": [3, 3, 3, 5, 3, 3, 3],
                    "total": 20,
                    "percentage": -20,
                    "percentage_label": "desde la semana pasada"
                }
            }
        },
        "annual_ranking": {
            "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"],
            "values": {
                "moderate_patients": {
                    "label": "Pacientes Moderados",
                    "data": [50, 40, 300, 220, 500, 250, 400, 30, 100],
                },
                "serius_patients": {
                    "label": "Pacientes Graves",
                    "data": [30, 90, 40, 140, 290, 290, 340, 90, 50],
                },
                "critical_patients": {
                    "label": "Pacientes Críticos",
                    "data": [40, 80, 70, 90, 30, 90, 140, 80, 75],
                }
            },
            "total": 150,
            "total_percentage": 20
        },
        "total_ranking": {
            "values": {
                "moderate_patients": {
                    "label": "Pacientes Moderados",
                    "total": 140,
                },
                "serius_patients": {
                    "label": "Pacientes Graves",
                    "total": 60,
                },
                "critical_patients": {
                    "label": "Pacientes Críticos",
                    "total": 18,
                }
            },
            "total": 218
        }
    }
    return jsonify(data)
