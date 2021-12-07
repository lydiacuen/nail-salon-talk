#!/bin/sh
# TOKEN="a90f6eb558026a9d61b5c3027f661482" ID="619dc2bbcaedd6ba6f9072cd" sh curl-scripts/videos/show.sh
API="http://localhost:4741"
URL_PATH="/videos"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo

# "token": "869505c354194173524a13f6afb1bd71"
# "_id": "619e51e1a213ef0e56d8e99a",

# TOKEN="4fa53db7820fa4131b02be6c72864078" ID="619dc2bbcaedd6ba6f9072cd" sh curl-scripts/videos/show.sh