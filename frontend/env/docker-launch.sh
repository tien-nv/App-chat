## Constants
BASEDIR="D:\\thuctap\\frontend"
FRONTEND_CONTAINER_NAME="frontend"


# docker build -t $WEB_CONTAINER_NAME .
docker run -it --name $FRONTEND_CONTAINER_NAME \
    --restart=always \
    -d \
    -p 3000:8080 \
    -dp 3001:8081 \
    -e APP_MODE=dev \
    -v $BASEDIR:/var/html/:rw \
    $FRONTEND_CONTAINER_NAME
