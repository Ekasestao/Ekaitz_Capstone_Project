from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.security import check_password_hash, generate_password_hash


app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://root:Ekaitz22765332r,?@localhost/capstoneproject"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


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


class Session(db.Model):
    __tablename__ = "sessions"
    sessions_id = db.Column(db.Integer, nullable=False, primary_key=True, unique=True)
    sessions_username = db.Column(db.String(30), nullable=False, unique=True)
    sessions_email = db.Column(db.String(40), nullable=False, unique=True)
    sessions_password = db.Column(db.String(102), nullable=False)
    sessions_name = db.Column(db.String(30), nullable=False)
    sessions_lastname = db.Column(db.String(30), nullable=False)
    sessions_admin = db.Column(db.Boolean, nullable=False)

    def __init__(
        self,
        sessions_username,
        sessions_email,
        sessions_password,
        sessions_name,
        sessions_lastname,
        sessions_admin,
    ):
        self.sessions_username = sessions_username
        self.sessions_email = sessions_email
        self.sessions_password = sessions_password
        self.sessions_name = sessions_name
        self.sessions_lastname = sessions_lastname
        self.sessions_admin = sessions_admin


class SessionSchema(ma.Schema):
    class Meta:
        fields = (
            "sessions_id",
            "sessions_username",
            "sessions_email",
            "sessions_password",
            "sessions_name",
            "sessions_lastname",
            "sessions_admin",
        )


session_schema = SessionSchema()
sessions_schema = SessionSchema(many=True)


@app.route("/")
def index():
    response = jsonify({"message": "Welcome to Ekaitz's API"})

    return response


@app.route("/users", methods=["POST"])
def create_user():
    username = request.json["users_username"]
    email = request.json["users_email"]
    password = request.json["users_password"]
    name = request.json["users_name"]
    lastname = request.json["users_lastname"]

    new_user = User(username, email, password, name, lastname)
    db.session.add(new_user)
    db.session.commit()
    response = user_schema.jsonify(new_user)

    return response


@app.route("/users", methods=["GET"])
def get_users():
    all_users = User.query.all()

    result = {"users": users_schema.dump(all_users)}
    response = jsonify(result)

    return response


@app.route("/users/<int:user_id>", methods=["GET"])
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


@app.route("/login", methods=["POST"])
def login():
    login_credential = request.json["login_credential"]
    password = request.json["password"]

    all_user = User.query.all()

    for user in all_user:
        user_username = user.users_username
        user_email = user.users_email
        user_password = user.users_password

        if login_credential == user_username or login_credential == user_email:
            if User.check_password(user_password, password) == True:
                response = user_schema.jsonify(user)

                return response

            elif User.check_password(user_password, password) == False:
                response = jsonify({"status": 400})

                return response

        elif login_credential != user_username and login_credential != user_email:
            response = jsonify({"status": 404})

            return response

        else:
            response = jsonify({"status": 500})

            return response


@app.route("/sessions", methods=["POST"])
def login_session():
    username = request.json["sessions_username"]
    email = request.json["sessions_email"]
    password = request.json["sessions_password"]
    name = request.json["sessions_name"]
    lastname = request.json["sessions_lastname"]
    admin = request.json["sessions_admin"]
    new_session = Session(username, email, password, name, lastname, admin)

    db.session.add(new_session)
    db.session.commit()
    response = session_schema.jsonify(new_session)

    return response


@app.route("/sessions/<string:username>", methods=["GET"])
def logged_in(username):
    all_sessions = Session.query.all()

    if len(all_sessions) > 0:
        for session in all_sessions:
            if username in session:
                return jsonify({"logged_in": True})
            else:
                return jsonify({"logged_in": False})
    else:
        return jsonify({"logged_in": False})


@app.route("/sessions/<string:username>", methods=["DELETE"])
def logout_session(username):
    all_sessions = Session.query.all()

    if len(all_sessions) > 0:
        for session in all_sessions:
            user_username = session.sessions_username
            if username == user_username:
                db.session.delete(session)
                db.session.commit()

                return jsonify({"status": 200})
    else:
        return jsonify({"status": 404})


if __name__ == "__main__":
    app.run(debug=True)
