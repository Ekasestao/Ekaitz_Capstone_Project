from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.security import check_password_hash, generate_password_hash
from secretKey import secret_key


app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://root:Ekaitz22765332r,?@localhost/capstoneproject"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_COOKIE_SECURE"] = True


db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    __tablename__ = "users"
    users_id = db.Column(db.Integer, nullable=False, primary_key=True, unique=True)
    users_username = db.Column(db.String(30), nullable=False, unique=True)
    users_email = db.Column(db.String(40), nullable=False, unique=True)
    users_password = db.Column(db.String(102), nullable=False)
    users_name = db.Column(db.String(30), nullable=False)
    users_lastname = db.Column(db.String(30), nullable=False)
    users_admin = db.Column(db.Boolean, nullable=False, default=0)

    def __init__(
        self, users_username, users_email, users_password, users_name, users_lastname
    ):
        self.users_username = users_username
        self.users_email = users_email
        self.users_password = users_password
        self.users_name = users_name
        self.users_lastname = users_lastname

    @classmethod
    def check_password(self, hashed_password, password):
        return check_password_hash(hashed_password, password)


class UserSchema(ma.Schema):
    class Meta:
        fields = (
            "users_id",
            "users_username",
            "users_email",
            "users_password",
            "users_name",
            "users_lastname",
            "users_admin",
        )


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Product(db.Model):
    __tablename__ = "products"
    products_id = db.Column(db.Integer, nullable=False, primary_key=True, unique=True)
    products_name = db.Column(db.String(30), nullable=False, unique=True)
    products_description = db.Column(db.String(100), nullable=False)
    products_price = db.Column(db.Float, nullable=False)

    def __init__(self, products_name, products_description, products_price):
        self.products_name = products_name
        self.products_description = products_description
        self.products_price = products_price


class ProductSchema(ma.Schema):
    class Meta:
        fields = (
            "products_id",
            "products_name",
            "products_description",
            "products_price",
        )


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


@app.route("/")
def index():
    return jsonify({"message": "Bienvenidos a la API de Ekaitz"})


@app.route("/register", methods=["POST"])
def create_user():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
    hashed_pw = generate_password_hash(password, method="sha256")
    name = request.json["name"]
    lastname = request.json["lastname"]
    new_user = User(username, email, hashed_pw, name, lastname)

    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)


@app.route("/login", methods=["POST"])
def login():
    login_credential = request.json["login_credential"]
    password = request.json["password"]

    user = User.query.filter(
        (User.users_username == login_credential)
        | (User.users_email == login_credential)
    ).first()

    if user:
        user_password = user.users_password
        if User.check_password(user_password, password) == True:
            session["username"] = user.users_username
            session["email"] = user.users_email
            session["password"] = user.users_password
            session["name"] = user.users_name
            session["lastname"] = user.users_lastname
            session["admin"] = user.users_admin

            return {"status": 200}

        return jsonify({"status": 400})

    return jsonify({"status": 404})


@app.route("/logged_in")
def logged_in():
    if "username" in session:
        return jsonify(
            {
                "logged_in": True,
                "user": {
                    "username": session["username"],
                    "email": session["email"],
                    "password": session["password"],
                    "name": session["name"],
                    "lastname": session["lastname"],
                    "admin": session["admin"],
                },
            }
        )
    return jsonify({"logged_in": False})


@app.route("/logout")
def logout():
    session.pop("username", None)
    session.pop("email", None)
    session.pop("password", None)
    session.pop("name", None)
    session.pop("lastname", None)
    session.pop("admin", None)

    return jsonify({"logged_in": False, "status": 200})


@app.route("/user", methods=["GET"])
def get_user():
    login_credential = request.json["login_credential"]
    user = User.query.filter(
        (User.users_username == login_credential)
        | (User.users_email == login_credential)
    ).first()

    if user:
        result = {"user": user_schema.dump(user)}

        return jsonify(result)

    return jsonify({"message": "El usuario '{}' no existe".format(login_credential)})


@app.route("/users", methods=["GET"])
def get_users():
    user = User.query.all()

    result = {"users": users_schema.dump(user)}
    response = jsonify(result)

    return response


"""  @app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"})

    response = user_schema.jsonify(user)

    return response


@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"})

    username = request.json["users_username"]
    email = request.json["users_email"]
    password = request.json["users_password"]
    name = request.json["users_name"]
    lastname = request.json["users_lastname"]

    user.users_username = username
    user.users_email = email
    user.users_password = password
    user.users_name = name
    user.users_lastname = lastname

    db.session.commit()
    response = user_schema.jsonify(user)

    return response


@app.route("/users/<int:user_id>", methods=["PATCH"])
def patch_user(user_id):
    user = User.query.get(user_id)
    if not user:
        response = jsonify({"message": "Usuario no encontrado"})

        return response

    data = request.json

    for attribute, value in data.items():
        if hasattr(user, attribute):
            setattr(user, attribute, value)

    db.session.commit()
    response = user_schema.jsonify(user)

    return response


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"})

    db.session.delete(user)
    db.session.commit()
    response = user_schema.jsonify(user)

    return response
"""


""" @app.route("/sessions/", methods=["GET"])
def not_logged():
    return jsonify({"logged_in": False, "user": {}})


@app.route("/sessions/<string:username>", methods=["GET"])
def logged_in(username):
    all_sessions = Session.query.all()

    if len(all_sessions) > 0:
        for session in all_sessions:
            if username == session.sessions_username:
                return jsonify({"logged_in": True, "user": session})

        return jsonify({"logged_in": False, "user": {}})
    else:
        return jsonify({"logged_in": False, "user": {}}) """

if __name__ == "__main__":
    app.secret_key = secret_key
    app.run(debug=True)
