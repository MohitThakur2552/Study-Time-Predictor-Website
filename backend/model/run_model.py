# -*- coding: utf-8 -*-
import sys
import os
import json
import pandas as pd
import numpy as np
import warnings

warnings.filterwarnings("ignore")

# -------- Helper Functions --------
def clean_books_read(val):
    """Convert string/number inputs like '10', '5-7', or 'no' to numeric."""
    if pd.isnull(val):
        return np.nan
    val = str(val).strip()
    if val.lower() == "no":
        return 0
    if "-" in val:
        try:
            parts = [float(p) for p in val.split("-")]
            return np.mean(parts)
        except:
            return np.nan
    try:
        return float(val)
    except:
        return np.nan


def clean_screen_time(val):
    """Convert values like '5 hrs', '7-8', '10 to 12' to numeric."""
    if pd.isnull(val):
        return np.nan
    val = str(val).lower().strip()
    val = val.replace("hrs", "").replace("hour", "").replace("hours", "").strip()
    val = val.replace("–", "-").replace("—", "-")
    if "to" in val:
        parts = val.split("to")
    elif "-" in val:
        parts = val.split("-")
    else:
        parts = [val]
    nums = []
    for p in parts:
        try:
            nums.append(float(p.strip()))
        except:
            continue
    if not nums:
        return np.nan
    return np.mean(nums)


def preprocess_dataframe(df):
    """Clean and prepare the DataFrame."""
    df.columns = df.columns.str.strip().str.replace("\n", "_").str.replace(" ", "_")

    rename_map = {
        "Name": "name",
        "Reads_Books": "reads_books",
        "Book_Genre_Top_1": "book_genre_top1",
        "Screen_Time_Movies/series_in_hours_per_week___(Provide_value_between_0-40)": "screen_time",
        "Books_read_past_year_Provide_in_integer_value_between_(0-50)": "books_read",
    }
    df = df.rename(columns=rename_map)

    # Clean numeric values
    if "screen_time" in df.columns:
        df["screen_time"] = df["screen_time"].apply(clean_screen_time)
        df["screen_time"].fillna(df["screen_time"].median(), inplace=True)

    if "books_read" in df.columns:
        df["books_read"] = df["books_read"].apply(clean_books_read)
        df["books_read"].fillna(df["books_read"].median(), inplace=True)

    return df


# -------- Input Handling --------
def read_input():
    """Read input CSV/Excel file."""
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        try:
            abs_path = os.path.abspath(file_path)
            if abs_path.endswith(".csv"):
                df = pd.read_csv(abs_path)
            else:
                df = pd.read_excel(abs_path)
            return preprocess_dataframe(df)
        except Exception as e:
            print(json.dumps({"error": f"Failed to read file: {str(e)}"}))
            sys.exit(1)
    else:
        print(json.dumps({"error": "No input file provided"}))
        sys.exit(1)


# -------- Prediction Logic --------
def predict_for_each(df):
    """
    Simple regression-based estimation.
    Formula (mocked): 
    Study time = 0.2 * books_read + 0.1 * (40 - screen_time) + (genre_factor)
    """

    genre_factor_map = {
        "Academic": 3.0,
        "Fiction": 1.5,
        "Comics": 1.0,
        "Biography": 2.0,
        "Science": 2.5,
        "Fantasy": 1.3,
        "Technology": 2.8,
        "History": 2.2,
        "Romance": 1.1,
        "Non-Fiction": 2.0,
        "Others": 1.2,
    }

    df["genre_factor"] = df["book_genre_top1"].map(genre_factor_map).fillna(1.0)
    df["predicted_study_time"] = (
        0.2 * df["books_read"] + 0.1 * (40 - df["screen_time"]) + df["genre_factor"]
    )

    df["predicted_study_time"] = df["predicted_study_time"].clip(lower=0)

    predictions = []
    for idx, row in df.iterrows():
        predictions.append({
            "student_id": int(idx + 1),
            "name": row.get("name", f"Student {idx + 1}"),
            "reads_books": row.get("reads_books", ""),
            "book_genre_top1": row.get("book_genre_top1", ""),
            "screen_time": float(row.get("screen_time", 0)),
            "books_read": float(row.get("books_read", 0)),
            "predicted_study_time": round(float(row["predicted_study_time"]), 2)
        })

    return {"status": "success", "predictions": predictions}


if __name__ == "__main__":
    df_input = read_input()
    result = predict_for_each(df_input)
    print(json.dumps(result))
    sys.exit(0)
