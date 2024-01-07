# What is this for?
A Password Manager, without the need to sync or store states for application passwords.

Application passwords are derived from the master key locally, in a consistent and reproducible manner.

# How does it work?
$ApplicationPassword = KDF(Origin, Your Super Super Secret Password Which you reused across 100 websites)$

Where KDF can be anything as long as it is one-way and deterministic.

We use argon2 for the current version.

*: Actually we use eTLD+1 instead of Origin for the sake of compatibility.

# Credits
Inspired by [flowerpassword](https://flowerpassword.com/), with usability and security enhancements.

# Ideas which may or may not be implemented in the future
Use WebAuthn private key as our Secret Master Key.

With this we could effectively turn a passkey into traditional passwords for individual websites which do not support passkey natively.

Unfortunately, this seems not feasible in its current status.

We need something in the WebAuthn standards that can produce a consistent signature using its private key for a given message chosen by us.

For example [WebAuthn PRF](https://github.com/w3c/webauthn/wiki/Explainer:-PRF-extension)
