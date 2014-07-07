#!/bin/bash
ffmpeg -i $1 -acodec libvorbis -vcodec libtheora $2
