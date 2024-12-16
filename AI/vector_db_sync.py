import mysql.connector
import requests

# 資料庫連線設定
config = {
    'user': 'admin',
    'password': 'admin',
    'host': '127.0.0.1',
    'port': 37591,
    'database': 'CitizenProposalApp'
}

AI_url = "http://127.0.0.1:5001/add"

try:
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    query = "SELECT Id, Title FROM Posts"
    cursor.execute(query)

    results = cursor.fetchall()
    for row in results:
        print(f"Id: {row[0]}, Title: {row[1]}")
        
        try:
            response = requests.post(AI_url, data={"id":row[0], "text": row[1]})
            
            if response.status_code == 200:
                print("Ok.")
            else:
                print(f"Failed to add item. Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            print(f"An error occured: {e}")

except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
