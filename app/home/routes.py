from app.home import blueprint
from flask import render_template, request
from jinja2 import TemplateNotFound


@blueprint.route('/<template>')
def route_template(template):
    try:
        if not template.endswith('.html'):
            template += '.html'

        segment = get_segment() # Detect the current page

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except Exception:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment():
    try:
        segment = request.path.split('/')[-1]
        if segment == '':
            segment = 'dashboard'

        return segment

    except Exception:
        return None
