from app.dashboard import blueprint
from flask import abort, redirect, render_template


@blueprint.route('/')
def index():
    try:
        return render_template('home/dashboard.html', segment='dashboard')
    except Exception:
        abort(500)


@blueprint.route('/dashboard')
@blueprint.route('/index')
def dashboard():
    return redirect('/')
