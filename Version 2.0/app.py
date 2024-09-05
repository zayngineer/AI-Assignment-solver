from flask import Flask, request, redirect, url_for, render_template, send_from_directory
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    message = None  # Initialize message to None for GET request

    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', message='No file part in the request')
        
        file = request.files['file']
        
        if file.filename == '':
            return render_template('index.html', message='No file selected')
        
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            message = f'File {filename} successfully uploaded'
            return render_template('index.html', message=message)
    
    return render_template('index.html', message=message)

if __name__ == "__main__":
    app.run(debug=True)
