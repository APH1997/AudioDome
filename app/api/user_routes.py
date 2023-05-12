from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditUserForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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

        if form.data['profile_image']:
            print(form.data,'EDIT PROFILE DATA --------------------------')
            profile_pic = form.data['profile_image']
            profile_pic.filename = get_unique_filename(profile_pic.filename)
            upload = upload_file_to_s3(profile_pic)

            if 'url' not in upload:
                print('url errors if any ========>', upload['errors'])
                return upload['errors']
            aws_url = upload['url']
            user.profile_image = aws_url
        if form.data['username'] != 'giraffenostrilwidenderplusULTRA':
            user.username = form.data['username']

        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.bio = form.data['bio']

        db.session.commit()
        return user.to_dict()
    else:
        return jsonify({"message": "You DID NOT update your profile! Aw man!"})


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return "Succesfully deleted"
