# [DestructEngine](https://destruct.co/)

DestructEngine is the source code that powers the website [Destruct.co](https://destruct.co/) - a service that encrypts a user-entered string with javascript, stores the encrypted text in MySQL, and appends the "share url" with the one-off password. After being viewed, the message is forever erased.

I owe the existence of this project to the hard work of dozens of individuals. Check the LICENSE file for a complete list.

* Source: [https://github.com/bellingboe/destruct-engine](https://github.com/bellingboe/destruct-engine)
* Homepage: [https://destruct.co/](https://destruct.co/)
* Twitter: [@NerdWhoCodes](http://twitter.com/NerdWhoCodes)


## Quick start

1. Clone the git repo — `git clone
   https://github.com/bellingboe/destruct-engine.git`
2. Create the single database table. The schema is in `schema.sql`.
3. Rename `DatabaseCore-EXAMPLE.inc.php` to `DatabaseCore.inc.php`.


## How It Works

1. A user types out a message in the text editor on [http://destruct.co](http://destruct.co).
2. [GibberishAES](https://github.com/mdp/gibberish-aes) encrypts the text with a randomly generated password (all client-side).
3. The server recieves a POST request of the encrypted text, but not the password as thatr's generated client-side.
4. Upon successful entry into the database, the server returns the unique URL.
5. The front-end appends the password as the anchor hash (#) to the returned URL.
6. The message is then decrypted using the password in the URL and removed from the database permanently.

## Documentation

None as of right now. Code should be cleaned up, first.


## Contributing

Anyone and everyone is welcome to contribute.