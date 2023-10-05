from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_marshmallow import Marshmallow
from werkzeug.security import check_password_hash, generate_password_hash
from secretKey import secret_key
import json


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
    users_email = db.Column(db.String(60), nullable=False, unique=True)
    users_password = db.Column(db.String(88), nullable=False)
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
    products_description = db.Column(db.String(300), nullable=False)
    products_price = db.Column(db.Float, nullable=False)
    products_img_url = db.Column(db.String(1000), nullable=False)

    def __init__(
        self, products_name, products_description, products_price, products_img_url
    ):
        self.products_name = products_name
        self.products_description = products_description
        self.products_price = products_price
        self.products_img_url = products_img_url


class ProductSchema(ma.Schema):
    class Meta:
        fields = (
            "products_id",
            "products_name",
            "products_description",
            "products_price",
            "products_img_url",
        )


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


class Blog(db.Model):
    __tablename__ = "blogs"
    blogs_id = db.Column(db.Integer, nullable=False, primary_key=True, unique=True)
    blogs_title = db.Column(db.String(50), nullable=False, unique=True)
    blogs_content = db.Column(db.String(500), nullable=False)
    blogs_img_url = db.Column(db.String(1000), nullable=False)

    def __init__(self, blogs_title, blogs_content, blogs_img_url):
        self.blogs_title = blogs_title
        self.blogs_content = blogs_content
        self.blogs_img_url = blogs_img_url


class BlogSchema(ma.Schema):
    class Meta:
        fields = ("blogs_id", "blogs_title", "blogs_content", "blogs_img_url")


blog_schema = BlogSchema()
blogs_schema = BlogSchema(many=True)


class Invoice(db.Model):
    __tablename__ = "invoices"
    invoices_id = db.Column(db.Integer, nullable=False, primary_key=True, unique=True)
    invoices_name = db.Column(db.String(50), nullable=False)
    invoices_lastname = db.Column(db.String(50), nullable=False)
    invoices_products = db.Column(db.String(100), nullable=False)
    invoices_total = db.Column(db.Float, nullable=False)
    invoices_date = db.Column(
        db.TIMESTAMP, nullable=False, default=func.current_timestamp()
    )

    def __init__(
        self, invoices_name, invoices_lastname, invoices_products, invoices_total
    ):
        self.invoices_name = invoices_name
        self.invoices_lastname = invoices_lastname
        self.invoices_products = invoices_products
        self.invoices_total = invoices_total


class InvoiceSchema(ma.Schema):
    class Meta:
        fields = (
            "invoices_id",
            "invoices_name",
            "invoices_lastname",
            "invoices_products",
            "invoices_total",
            "invoices_date",
        )


invoice_schema = InvoiceSchema()
invoices_schema = InvoiceSchema(many=True)


@app.route("/")
def index():
    return jsonify({"message": "Bienvenidos a la API y eCommerce de Ekaitz"})


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
        order_by = request.args.get("order_by", "id")
        direction = request.args.get("direction", "asc")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))
        total = Product.query.count()

        if len(all_products) > 0:
            if order_by == "id":
                if direction == "asc":
                    all_products = Product.query.order_by(Product.products_id.asc())

                    return products_schema.dump(all_products)

                if direction == "desc":
                    all_products = Product.query.order_by(Product.products_id.desc())

                    return products_schema.dump(all_products)

            if order_by == "price":
                if direction == "asc":
                    all_products = Product.query.order_by(Product.products_price.asc())
                    all_products = all_products.paginate(page=page, per_page=per_page)

                    return jsonify(
                        {
                            "total": total,
                            "page": page,
                            "per_page": per_page,
                            "products": [
                                {
                                    "products_id": p.products_id,
                                    "products_name": p.products_name,
                                    "products_description": p.products_description,
                                    "products_price": p.products_price,
                                    "products_img_url": p.products_img_url,
                                }
                                for p in all_products.items
                            ],
                        }
                    )

                if direction == "desc":
                    all_products = Product.query.order_by(Product.products_price.desc())
                    all_products = all_products.paginate(page=page, per_page=per_page)

                    return jsonify(
                        {
                            "total": total,
                            "page": page,
                            "per_page": per_page,
                            "products": [
                                {
                                    "products_id": p.products_id,
                                    "products_name": p.products_name,
                                    "products_description": p.products_description,
                                    "products_price": p.products_price,
                                    "products_img_url": p.products_img_url,
                                }
                                for p in all_products.items
                            ],
                        }
                    )

            if order_by == "name":
                if direction == "asc":
                    all_products = Product.query.order_by(Product.products_name.asc())
                    all_products = all_products.paginate(page=page, per_page=per_page)

                    return jsonify(
                        {
                            "total": total,
                            "page": page,
                            "per_page": per_page,
                            "products": [
                                {
                                    "products_id": p.products_id,
                                    "products_name": p.products_name,
                                    "products_description": p.products_description,
                                    "products_price": p.products_price,
                                    "products_img_url": p.products_img_url,
                                }
                                for p in all_products.items
                            ],
                        }
                    )

                if direction == "desc":
                    all_products = Product.query.order_by(Product.products_name.desc())
                    all_products = all_products.paginate(page=page, per_page=per_page)

                    return jsonify(
                        {
                            "total": total,
                            "page": page,
                            "per_page": per_page,
                            "products": [
                                {
                                    "products_id": p.products_id,
                                    "products_name": p.products_name,
                                    "products_description": p.products_description,
                                    "products_price": p.products_price,
                                    "products_img_url": p.products_img_url,
                                }
                                for p in all_products.items
                            ],
                        }
                    )

        return jsonify({"products": []})

    if request.method == "POST":
        name = request.json["products_name"]
        description = request.json["products_description"]
        price = request.json["products_price"]
        img_url = request.json["products_img_url"]

        new_product = Product(name, description, price, img_url)
        db.session.add(new_product)
        db.session.commit()

        return product_schema.jsonify(new_product)


@app.route("/products/search")
def search_products():
    all_products = Product.query.order_by(Product.products_name.asc())

    return products_schema.dump(all_products)


@app.route("/products/<int:product_id>", methods=["GET", "PATCH", "DELETE"])
def alter_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"status": 404})

    if request.method == "GET":
        return product_schema.jsonify(product)

    if request.method == "PATCH":
        data = request.json

        for attribute, value in data.items():
            if hasattr(product, attribute):
                setattr(product, attribute, value)

            else:
                return jsonify({"status": 404})

        db.session.commit()
        return product_schema.jsonify(product)

    if request.method == "DELETE":
        db.session.delete(product)
        db.session.commit()

        return product_schema.jsonify(product)


@app.route("/products/img/<int:product_id>", methods=["DELETE"])
def delete_product_img(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"status": 404})

    product.products_img_url = "https://firebasestorage.googleapis.com/v0/b/capstone-project-react-fd52b.appspot.com/o/no-photo.png?alt=media&token=0a408421-4e47-4d8b-8ab4-3b4ce112692f"
    db.session.commit()

    return product_schema.jsonify(product)


@app.route("/blog", methods=["GET", "POST"])
def blogs():
    if request.method == "GET":
        all_blogs = Blog.query.all()
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))
        total = Blog.query.count()

        if len(all_blogs) > 0:
            all_blogs = Blog.query.order_by(Blog.blogs_id.desc())
            all_blogs = all_blogs.paginate(page=page, per_page=per_page)

            return jsonify(
                {
                    "total": total,
                    "page": page,
                    "per_page": per_page,
                    "blogs": [
                        {
                            "blogs_id": b.blogs_id,
                            "blogs_title": b.blogs_title,
                            "blogs_content": b.blogs_content,
                            "blogs_img_url": b.blogs_img_url,
                        }
                        for b in all_blogs.items
                    ],
                }
            )

        return jsonify({"blogs": []})

    if request.method == "POST":
        title = request.json["blogs_title"]
        content = request.json["blogs_content"]
        img_url = request.json["blogs_img_url"]

        new_blog = Blog(title, content, img_url)
        db.session.add(new_blog)
        db.session.commit()

        return blog_schema.jsonify(new_blog)


@app.route("/blog/<int:blog_id>", methods=["GET", "PATCH", "DELETE"])
def blog(blog_id):
    blog = Blog.query.get(blog_id)

    if not blog:
        return jsonify({"status": 404})

    if request.method == "GET":
        return blog_schema.jsonify(blog)

    if request.method == "PATCH":
        data = request.json

        for attribute, value in data.items():
            if hasattr(blog, attribute):
                setattr(blog, attribute, value)

            else:
                return jsonify({"status": 404})

        db.session.commit()
        return blog_schema.jsonify(blog)

    if request.method == "DELETE":
        db.session.delete(blog)
        db.session.commit()

        return blog_schema.jsonify(blog)


@app.route("/blog/img/<int:blog_id>", methods=["DELETE"])
def delete_blog_img(blog_id):
    blog = Blog.query.get(blog_id)

    if not blog:
        return jsonify({"status": 404})

    blog.blogs_img_url = "https://firebasestorage.googleapis.com/v0/b/capstone-project-react-fd52b.appspot.com/o/no-photo.png?alt=media&token=0a408421-4e47-4d8b-8ab4-3b4ce112692f"
    db.session.commit()

    return product_schema.jsonify(blog)


@app.route("/dropzone", methods=["GET", "POST"])
def dropzone_img():
    return jsonify({"status": 200})


@app.route("/invoice", methods=["POST"])
def invoice():
    name = request.json["invoices_name"]
    lastname = request.json["invoices_lastname"]
    products = request.json["invoices_products"]
    total = request.json["invoices_total"]

    new_invoice = Invoice(name, lastname, products, total)
    db.session.add(new_invoice)
    db.session.commit()

    return invoice_schema.jsonify(new_invoice)


@app.route("/invoice/<int:invoice_id>")
def get_invoice(invoice_id):
    invoice = Invoice.query.get(invoice_id)

    if not invoice:
        return jsonify({"status": 404})

    product_ids = json.loads(invoice.invoices_products)

    products = Product.query.filter(Product.products_id.in_(product_ids)).all()

    formatted_date = invoice.invoices_date.strftime("%d-%m-%Y %T")

    product_data = []
    for product in products:
        product_data.append(
            {
                "products_id": product.products_id,
                "products_name": product.products_name,
                "products_description": product.products_description,
                "products_price": product.products_price,
            }
        )

    return jsonify(
        {
            "id": invoice.invoices_id,
            "name": invoice.invoices_name,
            "lastname": invoice.invoices_lastname,
            "products": product_data,
            "total": invoice.invoices_total,
            "date": formatted_date,
        }
    )


if __name__ == "__main__":
    app.secret_key = secret_key
    app.run(debug=True)
