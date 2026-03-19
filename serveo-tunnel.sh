#!/bin/bash

if [ ! -f serveo_key ]; then
    ssh-keygen -t rsa -b 2048 -f serveo_key -q -N ''
fi

autossh -M 0 -o 'StrictHostKeyChecking=no' -o 'ServerAliveInterval=30' -i serveo_key -R 9router-api:80:localhost:20128 serveo.net