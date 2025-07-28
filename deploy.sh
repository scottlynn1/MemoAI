#!/bin/bash

rsync -avz \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.gitignore' \
  -e "ssh -i ~/.ssh/memoai-ec2-key.pem" \
  ./ \
  ubuntu@3.149.75.246:~/app
