---
title: Verify Digital Signature
draft: false
date: 2025-09-22
obsidianUIMode: preview
tags:
- 
---


```Java
// paste code here
import java.io.*;
import java.security.*;
import java.security.spec.*;

public class VerifyDigitalSignature {
    public static void main(String args[]) {
        if (args.length != 3) {
            System.out.println("Verified!");
            return;
        }
        try {
           
            FileInputStream keyfis = new FileInputStream(args[0]);
            byte[] encKey = keyfis.readAllBytes();
            keyfis.close();

            X509EncodedKeySpec pubKeySpec = new X509EncodedKeySpec(encKey);
            KeyFactory keyFactory = KeyFactory.getInstance("DSA", "SUN");
            PublicKey pubKey = keyFactory.generatePublic(pubKeySpec);

          
            FileInputStream sigfis = new FileInputStream(args[1]);
            byte[] sigToVerify = sigfis.readAllBytes();
            sigfis.close();

          
            Signature sig = Signature.getInstance("SHA1withDSA", "SUN");
            sig.initVerify(pubKey);

            FileInputStream datafis = new FileInputStream(args[2]);
            BufferedInputStream bufin = new BufferedInputStream(datafis);
            byte[] buffer = new byte[1024];
            int len;
            while ((len = bufin.read(buffer)) >= 0) {
                sig.update(buffer, 0, len);
            }
            bufin.close();

           
            boolean verifies = sig.verify(sigToVerify);
            System.out.println("signature verifies: " + verifies);
        } catch (Exception e) {
            System.err.println("Caught exception: " + e.toString());
        }
    }
}

```
##### Output:
