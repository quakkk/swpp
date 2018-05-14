# AdfreeReview

Welcome to AdfreeReview!
You can evaluate and see the Adfree score and Content score of the blog post you visit.

## Instructions

Cloning git repository
- command `git clone https://github.com/swsnu/swpp17-team12.git`

Django runserver
- command `cd backend`
- command `python manage.py runserver`

Start npm
- command `cd frontend`
- command `npm start`

Upload chromeextension archive
- Load Chrome browser  
- Navigate to `chrome://extensions`  
- Check the checkbox of `Developer mode`  
- Click the button of `Load unpacked extension...`  
- Select the directory located in `chromeext/send_ratingis`  

Explore our website!  
- Navigate to `localhots:4200/welcome`  
- Make your account and log in  
- Have fun with our service!  

Check the score of the post you visited and evalutate it!  
- Navigate to the blog post you want to read. (Now blogs of `naver`, `daum`, `tistory` and `egloos` is available)
- Click the chromeestenxion button
- Check the score of the post and rating the post!

## Recent updated version (It will be merged to our master branch soon)

most recent chromeextension version
- command `git checkout chromeext`
- command `git pull --rebase origin chromeext`
- Do the same processes above

most recent frontendversion
- command `git checkout api-team`
- command `git pull --rebase origin api-team`
- Do the same processes above
