# What is this for?
A Password Manager, without the need to sync or store states for passwords. 

It even works without Internet connection in case you live in North Korea.

And, perhaps more importantly, without a master key.

Unique Application Passwords are derived from your Passkey locally, in a consistent and reproducible manner.

Your Passkey now becomes a unique set of passwords just for you and for any website on earth, as long as they have a password input box.

# How does it work?
$Application\ Password = KDF_c(Origin)$

As simple as that.

Where KDF can be anything provided that it is one-way and deterministic.

C is the secret Credential preventing some random guys from forging your invaluable password.

We use the prf extension from WebAuthn Standard as our KDF, the Credential is generated and hold by the authenticator - your passkey,

you don't need to remember anything, anymore.

*: Actually instead of the origin we use eTLD+1 for the sake of compatibility.

# Security Considerations

## Cross-origin Iframes
## Hash Length Extension

# Design Decisions
We considered using argon2 as the KDF in the earliest prototype.

And C is a secret masterkey the user set upon installation.

Until I realized that we can do it even better!

To use a FIDO authenticator as our Secret Master Key.


~~Unfortunately, this seems not feasible in its current status.~~ It works thanks to the prf extension described below.

We need something in the WebAuthn standard that can produce a consistent signature using the same secret in the authenticator for a message chosen by us.

[WebAuthn PRF](https://github.com/w3c/webauthn/wiki/Explainer:-PRF-extension)


# Known Limitations

## Limited Cross Browser Support

Requiring the same extension ID

For those not tied to browsers with the same rendering engine, it serves more as a proof of concept instead of being something that is practical for everyday use.

## Password Rotation

## Supported Authenticators
Only CTAP2 Authenticators implementing the HMAC-Secret extension (the physical and external ones, e.g. Yubikey) are currently supported.
Platform Authenticators (those embedded in your laptops/phones) are not.

# Abbreviation
"nya" stands for "not yet another"