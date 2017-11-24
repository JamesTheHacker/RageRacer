# 🚗 🏁 Rage Racer

![rageracer in the terminal](https://i.imgur.com/jbZHkU6.png "rageracer in the terminal")

**Experimental**: This is an experimental project. It works, but I am looking for feedback and help from the community to improve this tool.

Rage Racer is an easy to use HTTP race condition testing tool. It fires off multiple requests instantly allowing you to test for race conditions in web applications.

For example, imagine a store allows you to redeem a gift card. You enter a voucher code, press a button, and your credit is applied to your account. What if you was able to send 10 requests instantly, very quickly, and have your account credited 10 times?

... this is a common problem and is one attackers often exploit.

## Installing

**Yarn**

    yarn global add rage-racer

**NPM**

    npm install -g rage-racer

## Creating a session

A session is a .json file that contains data required to replay a request.

    {
      "url": "https://requestb.in/q1zrf3q2",
      "method": "POST",
      "payload": "a=1&b=2&c=3",
      "tries": 10,
      "headers": {
        "cookie": "username=lul&password=dank",
        "user-agent": "DankBro"
      },
      "redirect": "follow"
    }

* `url`: (required) The URL to make the request to
* `method`: (optional) HTTP method. Default: `GET`
* `payload`: (optional) Payload for `POST` requests only
* `tries`: (optional) Number of times to send a request. Default: `10`
* `headers`: (optional) HTTP headers
* `redirect`: (optional) Set to manual to disable location following. Default: `follow`

Note: To send cookies include the cookie string with the headers.

## Usage

    rageracer --config session.json

Once complete Rage Racer returns the response data for each request in `json` format to `STDOUT`. Each request returns the following object:

    {
      "url": "...",
      "body": "...",
      "status": "...",
      "headers": "..."
    }

* `url`: Response URL
* `body`: Response body
* `status`: Response status code
* `headers`: Response headers

This is useful for piping into files, or other software.

## TODO

* Write more tests. Tests are good.
* Create web frontend, or port to Electron application.

## Contributing

This is an open source project. If you can improve it create a fork and submit a PR :)