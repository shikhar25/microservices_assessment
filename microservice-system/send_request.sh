
# URL of the receiver service
URL="http://localhost:3000/receiver"

# JSON data to send
DATA='{
  "user": "Harry",
  "class": "Comics",
  "age": 22,
  "email": "harry@potter.com"
}'

# Send POST request to receiver service
curl -X POST $URL -H "Content-Type: application/json" -d "$DATA"
