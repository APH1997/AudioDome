import boto3
import botocore
import os
import uuid


s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"mp3", "mp4", "wav"}
ALLOWED_IMAGES = {'png', 'jpeg', 'jpg'}

def get_unique_filename(filename):
    """ Creates unique filename
    for file uploaded to bucket """
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    """tries to upload file to bucket and
    returns the url path that we will save
    in the db if succesfully uploaded"""
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
        print('S3 UPLOAD FUNC FILE', file)
        print('S3 UPLOAD FUNC CONTENT TYPE', file.content_type)
        print('S3 UPLOAD FUNC BUCKET_NAME', BUCKET_NAME)
        print('S3 UPLOAD FUNC FILE.FILENAME', file.filename)
        print('S3 UPLOAD FUNC ACL', acl)
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    # THIS IS THE URL WE SAVE IN OUR DATABASE:
    return {"url": f"{S3_LOCATION}{file.filename}"}



def remove_file_from_s3(song_url):
    # AWS needs the image file name, not the URL,
    # so we split that out of the URL
    key = song_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
