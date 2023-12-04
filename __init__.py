from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "djabdOUQH2n8hbeiw737n8121__95+63423867&"

    from .views import views

    app.register_blueprint(views, url_prefix='/')

    return app