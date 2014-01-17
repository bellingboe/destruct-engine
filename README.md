# [DestructEngine](https://destruct.co/)

DestructEngine is the source code that powers the website [Destruct.co](https://destruct.co/) - a service that encrypts a user-entered string with javascript, stores the encrypted text in MySQL, and appends the "share url" with the one-off password. After being viewed, the message is forever erased.

I owe the existence of this project to the hard work of dozens of individuals. Check the LICENSE file for a complete list.

* Source: [https://github.com/bellingboe/destruct-engine](https://github.com/bellingboe/destruct-engine)
* Homepage: [https://destruct.co/](https://destruct.co/)
* Twitter: [@NerdWhoCodes](http://twitter.com/NerdWhoCodes)


## Quick start

1. Clone the git repo — `git clone
   https://github.com/bellingboe/destruct-engine.git`
2. Rename `DatabaseCore-EXAMPLE.inc.php` to `DatabaseCore.inc.php`


## Features

* Client-side string encryption ([GibberishAES](https://github.com/mdp/gibberish-aes))
* Cross-browser compatible (Chrome, Opera, Safari, Firefox 3.6+, IE6+).
* Server never sees user-entered text, only text that's already encrypted.

## Documentation

None as of right now. Code should be cleaned up, first.


## Contributing

Anyone and everyone is welcome to contribute.