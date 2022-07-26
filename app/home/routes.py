from app.home import blueprint
from flask import render_template, request
from jinja2 import TemplateNotFound


@blueprint.route('/')
@blueprint.route('/index')
def index():
    return render_template('home/dashboard.html', segment='dashboard')


@blueprint.route('/<template>')
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        pass
        # return render_template('home/page-404.html'), 404

    except:
        pass
        # return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'dashboard'

        return segment

    except:
        return None
