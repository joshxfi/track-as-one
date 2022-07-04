<div align=center>
  <img src='https://user-images.githubusercontent.com/69457996/134120876-10ead589-0540-401b-9845-b2101d028130.png' />
</div>

## About
[trackAsOne](https://trackasone.me) is a collaborative platform for tracking school activities or homework along with your friends or classmates. You can create up to 5 rooms and invite your friends! Add due dates, URLs, and images to your tasks for your convenience. You can also assign room admins to help you manage your room.

## Installation
You can use this application using your browser, visit [trackasone.me](https://trackasone.me) or [dev.trackasone.me](https://dev.trackasone.me) (pre-release). This project is a Progressive Web App (**PWA**) and you can install it as a mobile or desktop app. [Installation Guide](https://support.google.com/chrome/answer/9658361) (optional)

## Contributing
If you like this project, please consider giving it a star! 🌠 Make sure to review our [CODE OF CONDUCT](https://github.com/joshxfi/trackAsOne/blob/main/CODE_OF_CONDUCT.md). For bugs and feature requests, feel free to [open an issue](https://github.com/joshxfi/trackAsOne/issues). 

### Contributor List
<a href="https://github.com/joshxfi/trackAsOne/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=joshxfi/trackAsOne" />
</a>

### Contributing Guide

1. Fork this [repository](https://github.com/joshxfi/trackAsOne) and clone your fork.
3. Create a new branch for your changes:
```sh
$ cd <your_cloned_fork>
$ git checkout dev
$ git checkout -b my-new-branch
```
- To create another branch:
```sh
$ git checkout dev
$ git pull
$ git checkout -b my-new-branch
```
3. Create a `.env.local` file with this content:
```sh
NEXT_PUBLIC_API_KEY=AIzaSyD0nP1qf9Fhi0jCH8YM99LTJEeKAqWiuL4
NEXT_PUBLIC_AUTH_DOMAIN=trackasone-dev.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=trackasone-dev
NEXT_PUBLIC_STORAGE_BUCKET=trackasone-dev.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=293327465838
NEXT_PUBLIC_APP_ID=1:293327465838:web:6ab9ecc3289a0f24e6257f
NEXT_PUBLIC_MEASUREMENT_ID=G-P87XJ4TX93
```
5. To run locally:

```sh
# NOTE: use yarn when installing dependencies
$ yarn
$ yarn dev
```
5. Commit your changes and push your branch.
```sh
$ git add .
$ git commit -m "chore: some changes"

# Make sure to stop the dev server before pushing
$ git push origin HEAD
```
6. Submit a pull request on the `dev` branch. (resolve conflicts if present)

## License
**trackAsOne** is licensed under the [GPL-3.0 license](https://github.com/joshxfi/trackAsOne/blob/main/LICENSE).
