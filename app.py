from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

new_df = pickle.load(open("movies.pkl","rb"))
similarity = pickle.load(open("similarity.pkl","rb"))

@app.route('/recommend', methods=["POST"])
def recommend():
    data = request.get_json()
    print(data)
    try:
        movie_index = new_df[new_df["title"].str.lower() == data['searchInput'].lower()].index[0]
        distances = similarity[movie_index]
        mostSimilar = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]
        movienames = []
        for i in mostSimilar:
            movienames.append(new_df.iloc[i[0]].to_dict())
        return jsonify({"data":movienames})

    except:
        return jsonify({"error": "Movie not found"}), 404



@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)