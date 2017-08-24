# [DestructEngine](https://chat.gd/) - by [@_ellingboe](http://twitter.com/_ellingboe)

DestructEngine is the source code that powers the website [Chat.gd](https://chat.gd/) - a free service that offers various encrypotion tools

## Current Features:

* [Links](https://chat.gd/) - Encrypt small amounts of text, that generates a secure URL that can only be viewed once.
* [Keys](https://chat.gd/keys) - PGP key manager with the ability to encrypt and decrypt armored PGP messages.
* [Chat](https://chat.gd/chat) - Encrypted, 2-person chat sessions with PGP and AES 256-bit.

## Quick start

1. Clone the git repo — `git clone https://github.com/bellingboe/destruct-engine.git`
2. Import the SQL file to create the required tables. The schema is in `schema.sql`.
3. Inside the `/inc` directory, rename `Constants-EXAMPLE.php` to `Constants.php`.

## Donation
If you find this useful (as a user or dev) I' apperciate some Litecoin: `LfxKqfq2T1dApGZZ66KHcYBQ4CBop5JERr`

# [Links](https://chat.gd/)

Links is the original concept of Destruct.co.

## How It Works

1. A user types out a message in the text editor on [https://chat.gd](https://chat.gd).
2. [GibberishAES](https://github.com/mdp/gibberish-aes) encrypts the text with a randomly generated password (all client-side).
3. The server recieves a POST request of the encrypted text, but not the password as thatr's generated client-side.
4. Upon successful entry into the database, the server returns the unique URL.
5. The front-end appends the password as the anchor hash (#) to the returned URL.
6. The message is then decrypted using the password in the URL and removed from the database permanently.


# [Keys](https://chat.gd/keys)

Keys is a web-based PGP key manager where anyone can create  public and private keys, store others' public keys, and encrypt/decrypt messages in armored format.

## How It Works

1. A user creates a new account, or logs in at the Keys site - [https://chat.gd/keys](https://chat.gd/keys).
2. The `Create` button asks for a label for the new key, and a password. The private key is then locked with the chosen password, and encrypted with the same password resulting in an AES-encrypted string beofr ever being sent to the server.
3. The `Unlock` button takes a password and decrypts the AES-encrypted string from the database. Once decrypted, the browser has access to use the public and private keys, but in order to use the private key for encryption or decryption, the password must be entered *again* to ready the key for use.
4. Once a keypair is unlocked, the `Encrypt` button uses the selected private key to encrypt, and sign, user-supplied input in a form, along with the public key of the recipient.
5. The `Decrypt` button is similar to Encrypt, just the opposite. You unlock the private key for which it's public key was used to encrypt the original message, paste the armored message into the form, and choose the public key of the sender.


# [Chat](https://chat.gd/chat)

Chat is a direct result of the creation of the Keys experiment. Both features use the same account. Chat creates a new keypair with your password, and a special label. You can add people by searching for their email address, and once accepted, you can send and recieve AES-encrypted messages in semi realtime. As always, the message is encrypted before being sent to the server, and only the recipient can decrypt it. Even if someone were to gain access to the server, and database, it would be useless unless they had direct knowledge of every user's password.

## How It Works

1. A user creates a new account, or logs in at the Chat site - [https://chat.gd/chat](https://chat.gd/chat).
2. The `Add Contact` button reveals a search boxz where users can search for people they know and request to initiate an encrypted chat session.
3. Users cannot chat with people they have not added.
4. To respond to contact requests, simply click on the item under the `Contact Requests` menu item in the sidebar. and click Accept or Reject.
5. Each users public key is shared whenever they accept a contact request. The private key is never shared with anyone, and is only decrypted in the browser for the duration of the session.
