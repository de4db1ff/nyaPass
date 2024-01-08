# What is this for?
A Password Manager, without the need to sync or store password states, and without requiring a internet connection.

And, perhaps the most importantly, without a master key.

Unique Application Passwords are derived from your Passkey locally, in a consistent and reproducible manner.

Your Passkey now becomes a unique set of passwords just for you and for every single website on earth, as long as they have a password input box.

# How does it work?
$Application\ Password = KDF_c(Origin)$

As simple as that.

Where KDF can be anything as long as it is one-way and deterministic.

C is a secret Credential from which the individual application passwords will derive.

We used argon2 as the KDF for the earliest prototype.

And C is a secret masterkey the user set upon installation.

Until I figured out we can do it even better!

We now use the PRF extension from WebAuthn as our KDF, the Credential is generated and hold by the authenticator - your passkey,

you don't even need to remember or input the Credential yourself, as long as you hold a supported passkey.

Your passkey now becomes a unique set of passwords for every single website on earth, whether they natively support WebAuthn or not, as long as they have a password input box.

*: Actually we use eTLD+1 instead of Origin for the sake of compatibility.

# Abbreviation
"nya" stands for "not yet another"

# Ideas which may or may not be implemented in the future
Use WebAuthn private key as our Secret Master Key.

With this we could effectively turn a passkey into traditional passwords for individual websites which do not support passkey natively.

Unfortunately, this seems not feasible in its current status.

We need something in the WebAuthn standards that can produce a consistent signature using its private key for a given message chosen by us.

For example [WebAuthn PRF](https://github.com/w3c/webauthn/wiki/Explainer:-PRF-extension)
