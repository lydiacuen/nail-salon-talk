#!/bin/bash

# TOKEN="a90f6eb558026a9d61b5c3027f661482" ID="619dd2755131cfc1f6e7aeef" sh curl-scripts/videos/destroy.sh

API="http://localhost:4741"
URL_PATH="/videos"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \

echo