# pogo-iv
IV calculator for Pokemon Go


Install nodejs (http://www.nodejs.org)

Install gulp ('sudo npm install gulp -g')

Clone/download this repo

Run 'npm install' to install dependencies

Modify /utils/request/protos/request.proto lines 8-10 to:
	optional double latitude = 7;
	optional double longitude = 8;
	optional double altitude = 9;

Run 'gulp' to generate frontend

Run 'node index' to run server