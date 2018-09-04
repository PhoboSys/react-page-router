#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONTAINER_NAME="react-page-router-builder"
IMAGE_NAME="mishadev/react-page-router-builder"
DOCKERFILE="Dockerfile"
BUILDER_OUTPUT_DIR_PATH="../dist"

docker rm -f $CONTAINER_NAME
echo =============================================================
echo build image $IMAGE_NAME form file $DIR/${DOCKERFILE}
echo =============================================================
docker build -t $IMAGE_NAME --file="$DIR/${DOCKERFILE}" $DIR/../

echo =============================================================
echo run image $IMAGE_NAME container name $CONTAINER_NAME
echo =============================================================
  mkdir $DIR/$BUILDER_OUTPUT_DIR_PATH
  OUTPUT="$( cd "$DIR/$BUILDER_OUTPUT_DIR_PATH" && pwd )"
  echo =============================================================
  echo output $OUTPUT
  echo =============================================================

  docker rm -f $CONTAINER_NAME
  docker run -it \
    -v "$OUTPUT:/app/dist" \
    --name $CONTAINER_NAME \
    $IMAGE_NAME

