from flask import Blueprint, render_template, request

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/mergeFiles', methods=['POST'])
def mergeFiles():
    import pandas as pd
    from flask import jsonify

    if request.method == 'POST':
        fileBase = request.files['fileOne']
        fileBase = pd.read_csv(fileBase, encoding='utf8', dtype= pd.StringDtype)

        fileRel = request.files['fileTwo']
        fileRel = pd.read_csv(fileRel, encoding='utf8', dtype= pd.StringDtype)
    else:
       return render_template("home.html")

    return jsonify(fileOne = fileBase.head().to_html(), fileTwo = fileRel.head().to_html(), fileCollumnsBase = fileBase.columns.values.tolist(), fileCollumnsRel = fileRel.columns.values.tolist())

@views.route('/FileLoad', methods=['POST'])
def FileLoad():
    import pandas as pd
    from flask import jsonify

    if request.method == 'POST':
        file = request.files['file']
        file = pd.read_csv(file, encoding='utf8', dtype= pd.StringDtype)

    else:
       return render_template("home.html")

    return jsonify(file = file.head().to_html(classes="table  table-striped  table-dark"), fileCollumns = file.columns.values.tolist())



@views.route('/resultado', methods=['POST'])
def resultado():
    import pandas as pd
    from flask import jsonify

    if request.method == 'POST':
        fileBase = request.files['fileOne']
        fileBase = pd.read_csv(fileBase, encoding='utf8', dtype= pd.StringDtype)

        fileRel = request.files['fileTwo']
        fileRel = pd.read_csv(fileRel, encoding='utf8', dtype= pd.StringDtype)

        fileMerge = fileBase.merge(fileRel, left_on=request.values['optionOne'], right_on=request.values['optionTwo'], suffixes=("_fileOne", "_fileTwo"))

    else:
        return render_template("home.html")
    
    return jsonify(fileMerge = fileMerge.head().to_html(classes="table  table-striped  table-dark"))

@views.route('/downloadCSV', methods=['POST'])
def downloadCSV():
    import io, flask, pandas
    fileBase = request.files['fileOne']
    fileBase = pandas.read_csv(fileBase, encoding='utf8', dtype= pandas.StringDtype)

    fileRel = request.files['fileTwo']
    fileRel = pandas.read_csv(fileRel, encoding='utf8', dtype= pandas.StringDtype)

    fileMerge = fileBase.merge(fileRel, left_on=request.values['optionOne'], right_on=request.values['optionTwo'], suffixes=("_fileOne", "_fileTwo"))

    proxyIO = io.StringIO()
    fileMerge.to_csv(proxyIO, index=False, encoding="utf-8")

    mem = io.BytesIO()
    mem.write(proxyIO.getvalue().encode("utf-8"))
    mem.seek(0)
    print(fileMerge)
    return flask.send_file(
        mem,
        mimetype="text/csv",
        download_name = "teste"
    )