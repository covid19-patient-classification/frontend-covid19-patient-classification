# [COVID-19 Patient Classification](https://covid19-patient-classification.herokuapp.com/) Aplication

**Thesis project** provided by the @UTPL on **COVID-19 Patient Classification**, The project could help medical personnel to know more efficiently and quickly the severity of a patient confirmed by COVID-19. UI to a legacy Python-based project compatible with Jinja Template Engine Flask.

---
- Modular design with **Blueprints**
- Deployment actions: HEROKU
- Support via **Github** (issues tracker) and [email](mailto:carloscastillo090916@gmail.com).

<br />

> Links: 
> * Production environment deployment (Disabled for now) - Google Cloud Run
> * [Development environment deployment](https://covid19-patient-classification.herokuapp.com/) - Heroku

## How to use it
```
$ # Use the template
$ Select the option of <Use this template >
$
$ # Virtualenv modules installation (Unix based systems)
$ virtualenv env -p python3
$ source env/bin/activate
$
$ # Virtualenv modules installation (Windows based systems)
$ # virtualenv env -p python3
$ # .\env\Scripts\activate
$
$ # Install requirements
$ pip3 install -r requirements.txt
$
$ # Set the FLASK_APP configuration
$ (Unix/Mac) . unix_configuration.sh
$ (Windows) windows_configuration.bat
$
$ # Start the application (development mode)
$ flask run
$
$ # Access the dashboard in browser: http://127.0.0.1:5000/
```
---
## Code-Base structure
The project is coded using blueprints, app factory pattern, dual configuration profile (development and production) and an intuitive structure presented bellow:


```bash
< PROJECT ROOT >
   |
   |-- app/
   |    |-- home/                                # Base Blueprint - serve app pages
   |         |-- static/
   |         |    |-- <css, JS, images>          # CSS files, Javascripts files
   |         |
   |         |-- templates/                      # Templates used to render pages
   |              |-- home.html                  # Used by common pages
   |              |-- index.html                 # Default page
   |
   |         |-- __init__.py                     # Initialize the blueprint
   |         |-- routes.py                       # App pages routes
   |    |
   |    |-- __init__.py                          # Initialize the app
   |    |-- config.py                            # Set up the app
   |
   |-- unix_configuration.sh                     # Set application configuration on Unix-based systems
   |-- windows_configuration.bat                 # Set application configuration on Windows-based systems
   |-- requirements.txt                          # Development modules 
   |-- run.py                                    # Start the app - WSGI gateway
   |
   |-- ************************************************************************
```
