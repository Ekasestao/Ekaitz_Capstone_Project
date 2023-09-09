from flask import Flask, request, jsonify
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
    products_img_name = db.Column(db.String(50), nullable=False)
    products_img_data = db.Column(db.String(15000), nullable=False)

    def __init__(
        self,
        products_name,
        products_description,
        products_price,
        products_img_name,
        products_img_data,
    ):
        self.products_name = products_name
        self.products_description = products_description
        self.products_price = products_price
        self.products_img_name = products_img_name
        self.products_img_data = products_img_data


class ProductSchema(ma.Schema):
    class Meta:
        fields = (
            "products_id",
            "products_name",
            "products_description",
            "products_price",
            "products_img_name",
            "products_img_data",
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
    same_password = request.json["same_password"]
    name = request.json["name"]
    lastname = request.json["lastname"]

    if username != "":
        if email != "":
            user_username = User.query.filter(User.users_username == username).first()
            if not user_username:
                user_email = User.query.filter(User.users_email == email).first()
                if not user_email:
                    if password != "":
                        if password == same_password:
                            hashed_pw = generate_password_hash(
                                password, method="sha256"
                            )
                            new_user = User(username, email, hashed_pw, name, lastname)
                            db.session.add(new_user)
                            db.session.commit()

                            user = User.query.filter(
                                User.users_username == username
                            ).first()
                            id = user.users_id
                            admin = user.users_admin

                            return jsonify(
                                {
                                    "status": 200,
                                    "user": {
                                        "id": id,
                                        "username": username,
                                        "email": email,
                                        "password": hashed_pw,
                                        "name": name,
                                        "lastname": lastname,
                                        "admin": admin,
                                        "logged_in": True,
                                    },
                                }
                            )

                        return jsonify({"status": 400})

                    return jsonify({"status": 401})

                return jsonify({"status": 402})

            return jsonify({"status": 403})

        return jsonify({"status": 405})

    return jsonify({"status": 406})


@app.route("/login", methods=["POST"])
def login():
    login_credential = request.json["login_credential"]
    password = request.json["password"]

    user = User.query.filter(
        (User.users_username == login_credential)
        | (User.users_email == login_credential)
    ).first()

    if user:
        user_id = user.users_id
        user_username = user.users_username
        user_email = user.users_email
        user_password = user.users_password
        user_name = user.users_name
        user_lastname = user.users_lastname
        user_admin = user.users_admin

        if User.check_password(user_password, password) == True:
            return jsonify(
                {
                    "status": 200,
                    "user": {
                        "id": user_id,
                        "username": user_username,
                        "email": user_email,
                        "password": user_password,
                        "name": user_name,
                        "lastname": user_lastname,
                        "admin": user_admin,
                        "logged_in": True,
                    },
                }
            )

        return jsonify({"status": 400})

    return jsonify({"status": 404})


@app.route("/logout")
def logout():
    return jsonify({"status": 200, "user": {"logged_in": False}})


@app.route("/products", methods=["GET", "POST"])
def products():
    if request.method == "GET":
        all_products = Product.query.all()

        return products_schema.jsonify(all_products)

    if request.method == "POST":
        name = request.json["products_name"]
        description = request.json["products_description"]
        price = request.json["products_price"]
        img = request.json["products_img"]

        img_upload = img["upload"]
        img_name = img_upload["filename"]
        img_data = img["dataURL"]

        new_product = Product(name, description, price, img_name, img_data)
        db.session.add(new_product)
        db.session.commit()

        return product_schema.jsonify(new_product)


@app.route("/products/<int:product_id>", methods=["PATCH", "DELETE"])
def alter_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"status": 404})

    if request.method == "PATCH":
        data = request.json

        for attribute, value in data.items():
            if hasattr(product, attribute):
                setattr(product, attribute, value)

        db.session.commit()
        return product_schema.jsonify(product)

    if request.method == "DELETE":
        product = Product.query.get(product_id)

        db.session.delete(product)
        db.session.commit()

        return product_schema.jsonify(product)


if __name__ == "__main__":
    app.secret_key = secret_key
    app.run(debug=True)
