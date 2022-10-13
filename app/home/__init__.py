from flask import Blueprint, render_template

blueprint = Blueprint(
    'home_blueprint',
    __name__,
    url_prefix='',
    template_folder='templates',
    static_folder='static'
)


@blueprint.app_errorhandler(404)
def not_found_error(error):
    return render_template('home/page-404.html'), 404


@blueprint.app_errorhandler(500)
def internal_error(error):
    return render_template('home/page-500.html'), 500


@blueprint.route('/internal-error')
def error():
    return render_template('home/page-500.html'), 500
