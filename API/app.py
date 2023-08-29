from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://Ekasestao:Ekaitz1000!@Ekasestao.mysql.pythonanywhere-services.com/Ekasestao$capstoneproject"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    __tablename__ = "users"
    users_id = db.Column(db.Integer, nullable=False, primary_key=True, unique=True)
    users_username = db.Column(db.String(30), nullable=False, unique=True)
    users_email = db.Column(db.String(40), nullable=False, unique=True)
    users_password = db.Column(db.String(50), nullable=False)
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
    return jsonify({"message": "Hello to  Ekaitz's API"})


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

    return user_schema.jsonify(new_user)


@app.route("/users", methods=["GET"])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)


@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)

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
    return user_schema.jsonify(user)


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)
