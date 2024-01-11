# What is this for?
A minimalist Password Manager, without the complexity to sync or store states for passwords. 

It even works without Internet connection in case you live in North Korea.

And, perhaps more importantly, without a master key.

Unique Application Passwords are derived from your Passkey locally, in a consistent and reproducible manner.

Your Passkey now becomes a unique set of passwords just for you and for any website on earth, as long as they have a password input box.

# How does this thing work?
$\text{Password} = KDF(\text{Origin}, \text{Secret})$

As simple as that.

Where KDF can be anything provided that it is one-way and deterministic.

The secret prevents some random guys from forging your invaluable passwords.

We use the prf extension from the WebAuthn Standard as the KDF, the random secret is generated and bound to the authenticator - your passkey.

You are free to forget all your credentials from now on, once and for all.

*: Actually instead of the origin we use eTLD+1 for the sake of compatibility.

# Security Considerations

## Cross-origin Iframes
TBD
## Hash Length Extension
TBD

# Known Limitations

## Limited Cross Browser Support

Requiring the same relying party ID


## Password Rotation

## Supported Authenticators
The Current WebAuthn PRF implementations heavily depend on the CTAP2 HMAC-Secret extension.
Only CTAP2 Authenticators implementing the HMAC-Secret extension (the physical and external ones, e.g. Yubikey) are currently supported.
Platform Authenticators (those embedded in your laptops/phones) are not.

That said, platform authenticators without CTAP2 might support this in the future as per [the standard](https://w3c.github.io/webauthn/#prf-extension)

## Supported Browsers
[Chrome 122+ Only](https://chromiumdash.appspot.com/commit/cfea6b18ede2a8fe0d7ea32e6bba967a7f2de6f8)
The support for other browsers in the future depends on the availability of this feature.

# Abbreviation
"nya" stands for "not yet another"