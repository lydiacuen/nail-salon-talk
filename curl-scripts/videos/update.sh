#!/bin/bash

API="http://localhost:4741"
URL_PATH="/videos"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "video": {
      "name": "'"${NAME}"'",
      "episodeNumber": "'"${EPISODE_NUMBER}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo