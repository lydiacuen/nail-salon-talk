#!/bin/bash

# TOKEN=46705d8688fe0ba252e40e9c860b0a03 NAME="Video Regular" ADDRESS="11th street and 5th Ave, Brooklyn, NY, 11232" HOUR="7am-7pm" sh curl-scripts/videos/create.sh

API="http://localhost:4741"
URL_PATH="/videos"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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