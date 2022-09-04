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
        "moderate_patients": {
            "label": "Pacientes Moderados",
            "date": "28 de agosto - 03 de septiembre",
            "total": 140,
            "weekly_ranking": {
                "labels": ["28", "29", "30", "31", "01", "02", "03"],
                "values": [10, 7, 5, 7, 5, 5, 5],
                "total": 42,
                "percentage": 10,
                "percentage_label": "desde la semana pasada"
            },
            "annual_ranking": {
                "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"],
                "values": [50, 40, 300, 220, 500, 250, 400, 30, 100],
                "percentage": -20,
                "percentage_label": "Desde el año anterior"
            }
        },
        "serius_patients": {
            "label": "Pacientes Graves",
            "date": "28 de agosto - 03 de septiembre",
            "total": 60,
            "weekly_ranking": {
                "labels": ["28", "29", "30", "31", "01", "02", "03"],
                "values": [3, 3, 3, 5, 3, 3, 3],
                "total": 23,
                "percentage": 5,
                "percentage_label": "desde la semana pasada"
            },
            "annual_ranking": {
                "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"],
                "values": [30, 90, 40, 140, 290, 290, 340, 90, 50]
            }
        },
        "critical_patients": {
            "label": "Pacientes Críticos",
            "date": "28 de agosto - 03 de septiembre",
            "total": 18,
            "weekly_ranking": {
                "labels": ["28", "29", "30", "31", "01", "02", "03"],
                "values": [2, 3, 3, 3, 3, 3, 3],
                "total": 20,
                "percentage": -20,
                "percentage_label": "desde la semana pasada"
            },
            "annual_ranking": {
                "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"],
                "values": [40, 80, 70, 90, 30, 90, 140, 80, 75]
            }
        },
        "total_patients": 218
    }
    return jsonify(data)
