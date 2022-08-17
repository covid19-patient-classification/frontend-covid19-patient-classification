from app.home import blueprint
from flask import abort, render_template, request
from jinja2 import TemplateNotFound


@blueprint.route('/<template>')
def route_template(template):
    try:
        if not template.endswith('.html'):
            template += '.html'

        segment = get_segment()  # Detect the current page

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("homes/" + template, segment=segment)

    except TemplateNotFound:
        abort(404)


# Helper - Extract current page name from request
def get_segment():
    segment = request.path.split('/')[-1]
    if segment == '':
        segment = 'dashboard'

    return segment
