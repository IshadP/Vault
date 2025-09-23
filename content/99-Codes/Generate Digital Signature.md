---
title: Generate Digital Signature
draft: false
date: 2025-09-23
obsidianUIMode: preview
tags:
- 
---

```Java
// paste code here
import java.io.*;
import java.security.*;
import java.security.spec.*;

public class GenerateDigitalSignature {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: java GenerateDigitalSignature datafile");
            return;
        }
        try {
            // Step 1: Generate key pair (DSA, 2048-bit)
            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("DSA", "SUN");
            SecureRandom random = SecureRandom.getInstance("SHA1PRNG", "SUN");
            keyGen.initialize(2048, random);
            KeyPair pair = keyGen.generateKeyPair();
            PrivateKey priv = pair.getPrivate();
            PublicKey pub = pair.getPublic();

            // Step 2: Initialize signature object with private key
            Signature dsa = Signature.getInstance("SHA1withDSA", "SUN");
            dsa.initSign(priv);

            // Step 3: Supply data to be signed
            FileInputStream fis = new FileInputStream(args[0]);
            BufferedInputStream bufin = new BufferedInputStream(fis);
            byte[] buffer = new byte[1024];
            int len;
            while ((len = bufin.read(buffer)) >= 0) {
                dsa.update(buffer, 0, len);
            }
            bufin.close();

            // Step 4: Generate signature bytes
            byte[] realSig = dsa.sign();

            // Save the signature in a file
            FileOutputStream sigfos = new FileOutputStream("signature.txt");
            sigfos.write(realSig);
            sigfos.close();

            // Save the public key in a file
            byte[] key = pub.getEncoded();
            FileOutputStream keyfos = new FileOutputStream("publicKey.txt");
            keyfos.write(key);
            keyfos.close();

            System.out.println("Signature generated and saved to signature.txt");
            System.out.println("Public key saved to publicKey.txt");
        } catch (Exception e) {
            System.err.println("Caught exception: " + e.toString());
        }
    }
}

```
##### Output:
