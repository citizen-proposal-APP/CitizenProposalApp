import mysql.connector
import requests

config = {
    'user': 'admin',
    'password': 'admin',
    'host': '127.0.0.1',
    'port': 37591,
    'database': 'CitizenProposalApp'
}

try:
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    query = "INSERT INTO Posts (Title, Content, PostedTime, AuthorId) VALUES (%s, %s, %s, %s)"

    with open("data/train/proposal.txt", encoding="utf-8") as f:
        texts = f.read().split("\n")
    
    val = [(text, "fake data", "2024-12-01 12:34:56.123456", 1) for text in texts]
    
    cursor.executemany(query, val)
    conn.commit()
    
    print("ok")

except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
