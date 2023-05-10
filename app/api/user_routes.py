from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditUserForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def user_edit(id):
    print("WHERE IN THE USER ROUTE ========================================")
    user = User.query.get(id)
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.username = form.data['username']
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.bio = form.data['bio']

        db.session.commit()
        return user.to_dict()
    else:
        return "Bad Data"
