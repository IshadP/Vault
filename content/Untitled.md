**Question Bank** 

Q 1. Explain RSA Algorithm with Suitable Example (24W)
Q 2. Explain Chinese remainder theorem with suitable example and state its advantages 
Q 3. Elaborate on Euler's totient Function with suitable Example 
Q 4. In public Key cryptosystem using RSA cipher text C =10 send to user whose public key is e = 5, n =35 what is the plaintext? Also write steps of RSA. (23W)

---

Q 5. Explain Kerberos authentication protocols (24W)
Q 6. Explain Digital Standard Authentication with suitable example 
Q 7.  Define MAC's and explain requirement of MAC's (24W) 
Q 8. Explain SHA with suitable example (24W)

# Answer

The **RSA Algorithm** is a fundamental public-key cryptosystem used for secure data transmission and digital signatures. It is based on **asymmetric cryptography**, using a pair of mathematically linked keys: a **public key** for encryption (which anyone can know) and a **private key** for decryption (which only the recipient knows). RSA's security relies on the computational difficulty of factoring the product of two very large prime numbers.

---

## RSA Algorithm Steps

The RSA process is divided into three stages: Key Generation, Encryption, and Decryption.

### 1. Key Generation

This stage creates the public and private key pair for the recipient (let's call them Bob).

a. **Choose Two Prime Numbers:** Bob selects two large, distinct prime numbers, p and q. _Example:_ Let p=11 and q=13.

b. **Calculate Modulus (n):** Calculate n, the modulus for both the public and private keys, by multiplying p and q. _Example:_ n=p×q=11×13=143.

c. **Calculate Euler's Totient Function (ϕ(n)):** Calculate ϕ(n), which is the number of integers less than n that are coprime to n. _Formula:_ ϕ(n)=(p−1)(q−1) _Example:_ ϕ(n)=(11−1)(13−1)=10×12=120.

d. **Choose Public Exponent (e):** Choose an integer e such that 1<e<ϕ(n) and e is **coprime** to ϕ(n) (i.e., gcd(e,ϕ(n))=1). This value becomes the **Public Key Exponent**. _Example:_ Let's choose e=7. Since gcd(7,120)=1, this is valid.

e. **Calculate Private Exponent (d):** Calculate the private key exponent d, which is the multiplicative inverse of e modulo ϕ(n). _Formula:_ d×e≡1(modϕ(n)) _Example:_ 7d≡1(mod120). Using the Extended Euclidean Algorithm (or by inspection), we find d=103, because 7×103=721, and 721≡1(mod120) (721=6×120+1).

**Resulting Keys:**

- **Public Key (PK):** (e,n)=(7,143)
    
- **Private Key (SK):** (d,n)=(103,143)
    

---

### 2. Encryption

A sender (Alice) encrypts a plaintext message M using Bob's Public Key (e,n).

a. **Plaintext Message (M):** The message must be converted into an integer M, where 0≤M<n. _Example:_ Alice wants to send the message M=9.

b. **Ciphertext Calculation (C):** _Formula:_ C=Me(modn) _Example:_ C=97(mod143) 97=4,782,969. C=4,782,969(mod143). 4,782,969=33,447×143+18. **Ciphertext C=18.**

---

### 3. Decryption

The recipient (Bob) decrypts the ciphertext C using their Private Key (d,n).

a. **Plaintext Calculation (M):** _Formula:_ M=Cd(modn) _Example:_ M=18103(mod143). _Note on calculation:_ Raising a large number to a high power is computationally complex, but in modular arithmetic, it is simplified using modular exponentiation. 18103(mod143)=9.

**Decrypted Plaintext M=9.**

The resulting plaintext M=9 matches the original message sent by Alice, demonstrating the successful encryption and decryption process. The security of this exchange lies in the fact that an attacker who intercepts the public key (7,143) and the ciphertext C=18 must be able to factor n=143 back into p=11 and q=13 to calculate the private key exponent d=103, which is computationally hard when p and q are hundreds of digits long.