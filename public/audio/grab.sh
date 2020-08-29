#!/bin/bash
set -e

NEXT=$(cat next)

for ((i=$NEXT; i<=10000; i++));
do
	echo $i > next
	echo "Grabbing $i"
	curl --silent -L "https://translate.google.com/translate_tts?ie=UTF-8&tl=es&client=tw-ob&q=$i" -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Accept-Language: en-GB,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Cookie: 1P_JAR=2020-08-28-16; NID=204=RVK79STYTqMeu2QXH0JE9Ajh9QLwIVX8z87_EXmsD1ufsqEPS2nQdBksNMia6xjoLQqwF-Ceda-GzxcFDuCrujaEy_C75wWDKse2XuKgLq5Lk_0ectmIhWQvQEbjEo_YleOHZ2ISrSWooZndpCTI9_Wy8Ew-Hmi-rsTYDwiojPbxsvMz9EC0NE53SS7bv9tqAahfCQeZlV_KwfrjGLNaXC5kPDPXPMVh08zkV3gZrmUKHH-7rQskgGq27z8BzQ6KBcdAIzYp5wu90uJQBcVVlB4sHvxKfw; CONSENT=YES+GB.en-GB+V9; ANID=AHWqTUkUAzaEWbHRJ5xMh7PYpY2A9cndn4vvsTPQdQO_M61nrDz_8sGo5rdQ4aAV; SID=0AfrZu5vt1Gt3wH_e940icPkKfp21d_yF1VA4vL5jT7nnFzTu1dvEOM6eE_0CLF-CtdV6w.; __Secure-3PSID=0AfrZu5vt1Gt3wH_e940icPkKfp21d_yF1VA4vL5jT7nnFzTevpbWb3zgcBVuQF1UMaKbw.; HSID=ALzG0fOLtJV9G0kQO; SSID=Ak-BhrkDzjnQSJlni; APISID=mNH_V0ooeqtw_rHt/A1pxdq1iRBqtjovzc; SAPISID=gz5fvipr01VBWO3q/AfuPLiqqE-cuX5VvZ; __Secure-3PAPISID=gz5fvipr01VBWO3q/AfuPLiqqE-cuX5VvZ; SIDCC=AJi4QfFJldVjUjlmj7K24Zf3OMsSwxTR0INsLrzCjKL565CDFfJpLyrCzYY0fBMXB6VDluOMwL0; __Secure-3PSIDCC=AJi4QfE7krS3uoI22XWmvBq7qTa-183ie_j7kzHMVOoEHtfT4j5AWdSOuVIRXvyg6GEOcjNPpw; SEARCH_SAMESITE=CgQItJAB; S=billing-ui-v3=9FPNc8hbeRPcEIFPjIuF0LQqDgj3v84w:billing-ui-v3-efe=9FPNc8hbeRPcEIFPjIuF0LQqDgj3v84w' -H 'Upgrade-Insecure-Requests: 1' -H 'Cache-Control: max-age=0' -H 'TE: Trailers' -o "$i.mp3"	
	DETECTED=$(file "$i.mp3")
	echo $DETECTED | grep "MPEG" > /dev/null
	sleep 1
done
