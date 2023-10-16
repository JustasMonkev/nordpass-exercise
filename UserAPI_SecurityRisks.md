## Security Risks in User API Response Objects

### 1. Token Details from `/v1/user/login`:

The token seems to contain potentially sensitive data:

- **User's Name**
- **Signature Key**
- **Nonce**: is present directly within the token value. This is a major security risk, as it can be decoded
  easily.

### 2. Sensitive Info in Item Endpoints:

Both `/user/{id}/item` and `/user/item` return some quite sensitive data. A notable point:

- **Password**: The password value looks to be base64 encoded (`WW91V2VyZUg0Y2szZA==`). It can be decoded easily.

### 3. No Strong Data Protection:

Some fields, like "My strong password", there aren't encrypted or hashed.

### 4. Possible IDOR Vulnerability:

there's a potential IDOR risk. Attackers can manipulate the `{id}` in `/user/{id}/item` to access other users' items
they can pass empty any value do the id and get the item.

### 5. Exposing Sharing Data:

The `shares` section shares users have the item access, their emails, and access status.

### 6. Timestamps:

The precise `created_at` and `updated_at` timestamps might give insights about user activity patterns. This can be a
point for hackers,when trying to figure out the best attack timings.

### 7. Accessing Data Without an Authorization Header:
You can access the API endpoints without an Authorization header. This is a major security risk, as it compromises data security.


