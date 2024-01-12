# What is this for?
A minimalist Password Manager eliminates the complexity of syncing and storing password states.

It works without Internet connection in case you live in North Korea.

And, perhaps more importantly, without a master key.

Unique Application Passwords are derived from your Passkey locally, in a consistent and reproducible manner.

Your Passkey now becomes a unique set of passwords for any website with a password input box, regardless of whether they natively support WebAuthn.

# How does this thing work?
$\text{Password} = KDF(\text{Origin}, \text{Secret})$

As simple as that.

Where KDF can be anything provided that it is one-way and deterministic.

The secret prevents some random guys from forging your invaluable passwords.

We utilize the prf extension from the WebAuthn Standard as our KDF. This generates a random secret and binds it to a credential in the authenticator - your passkey. 

From now on, you are free to forget all your credentials once and for all.

Note: For compatibility reasons, we use eTLD+1 instead of the origin.

# Security Considerations

## Cross-origin Iframes
TBD
## Hash Length Extension
TBD

# Known Limitations

## Limited Cross-Browser Support

Requiring the same relying party ID
The same Relying Party ID is required, which was set to the origin for both standard web apps and web extensions. 

To maintain the same credential-bound Pseudorandom Function (PRF), we need to keep the same extension ID, which implies the origin and RpId for the extension.

However, this makes it impossible for the extension to use the same PRF across different Browser Engines, as the extension ID (and consequently the RpId used to access our PRF) would change.

Fortunately, this rule has been relaxed for Chrome 122+. More details can be found below.

Please note that Firefox and Safari currently do not support this feature.

## Password Rotation


## Supported Browsers
Chrome 122+ Only

The extension of support to other browsers in the future will depend on the availability of [something like this](https://chromiumdash.appspot.com/commit/cfea6b18ede2a8fe0d7ea32e6bba967a7f2de6f8).

## Supported Authenticators 
The Current WebAuthn PRF implementations heavily rely on the CTAP2 HMAC-Secret extension.

At present, only CTAP2 Authenticators that implement the HMAC-Secret extension are supported. These are typically physical and external devices, such as Yubikey.

However, Platform Authenticators, which are embedded in your laptops or phones, are not currently supported.

Platform authenticators without CTAP2 might support this feature in the future, as per [the standard](https://w3c.github.io/webauthn/#prf-extension)


# Acronym
"nya" stands for "not yet another"
