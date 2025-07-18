**USER ABILITIES TO DO**

[x] create an account = POST http://localhost:3000/api/auth/register , body JSON {
"email": "rbhenderson0826@gmail.com",
"username": "ryan",
"password": "SPQr1187!",
"displayName": "ryan",
"name": "Ryan Henderson"
}
[x] login = POST http://localhost:3000/api/auth/login , body JSON {
"email": "rbhenderson0826@gmail.com",
"password": "SPQr1187!"
}
[x] logout a user = POST http://localhost:3000/api/auth/logout
[x] get current user = GET http://localhost:3000/api/users/me
[] password reset
[x] delete account = DELETE http://localhost:3000/api/auth/delete , headers Authorization: Bearer <your token>
[x] update account = PATCH http://localhost:3000/api/users/me , headers Authorization: Bearer <your token> , Content-Type: application/json , body JSON {
"email": "newemail@example.com",
"username": "newUsername",
"displayName": "newDisplay"
}
[x] upload avatar = PATCH http://localhost:3000/api/users/me , Content-Type	application/json , Cookie	token=YOUR_TOKEN_HERE , {
  "avatarUrl": "https://your-s3-bucket.com/path/to/avatar.jpg"
}

[] edit account settings
[x] become a seller = GET http://localhost:3000/api/users/become-seller , headers Authorization: Bearer <your token>
[x] revoke seller status = PATCH http://localhost:3000/api/users/revoke-seller/:userId , headers Authorization: Bearer <your admin token>
[] become an admin
[] gain xp
[] lose xp
[] xp/level display
[] gain coins
[] lose coins
[] coin purse display
[] connect user stripe

**SELLER ABILITIES TO DO**

[x] list a book = POST http://localhost:3000/api/listings , Authorization: Bearer YOUR_TOKEN_HERE , Content-Type: application/json , {
"bookId": 1,
"price": 14.99,
"condition": "Like New"
}
[x] update a listing = PATCH http://localhost:3000/api/listings/listingID , Authorization: Bearer YOUR_JWT_HERE , Content-Type: application/json , {
"price": 12.99,
"condition": "Very Good",
"available": false
}
[x] delete a listing = DELETE http://localhost:3000/api/listings/listingID , Authorization: Bearer YOUR_JWT_HERE
[x] upload photo = i forgot to do the method, oops
[] set shipping preferences
[] seller dashboard

**BUYER ABILITIES TO DO**

[] browse/search listings
[] view listing details
[] buy a book/checkout flow
[] leave verified review
[] request return/refund
[] use a deal

**LIBRARY & USER DATA TO DO**

[] add a book to library
[] remove a book from library
[] view user library
[] set genre preferences
[] list favorite authors/books
[] view user posts
[] view user badges and achievements

**SOCIAL / COMMUNITY TO DO**

[] post
[] comment
[] like a post
[] unlike a post
[] like a comment
[] unlike a comment
[] create a hyperlink on post or comment
[] send a dm
[] receive a dm

**SELLER GROWTH TOOLS TO DO**

[] view analytics?
[] create a deal

**BACKEND SUPPORT FEATURES TO DO**

[] email notifications
[] moderation?
[] connect MY stripe

**GROWTH + MONETIZATION TO DO**

[] search engine
[] affiliate aggregator
[] auto affiliate referral links
[] my affiliate referral links
[] seo metadata
[] auto email campaign builder
[] user segmentization for marketing
[] sell coin packs

/////////////////////////////////////////////////////

**DB USER-RELATED TO DO**
[] add isBanned to User
[] add isBannedFromSelling to User
[] add avatarUrl to User
[] add genrePreferences to User (array or related table)
[] create FavoriteBooks table (userId, bookId)
[] create FavoriteAuthors table (userId, authorId)

**DB LIKES / SOCIAL TO DO**
[] create Like table — store userId + either postId or commentId (polymorphic or union type)
[] add hyperlinkUrl field to Comment and Post, or create Hyperlink table if you want hyperlink history/separation

**DB MESSAGING TO DO**
[] create DMThread table (id, participants[])
[] create DMMessage table (threadId, senderId, content, timestamps)

**DB BADGES / ACHIEVEMENTS TO DO**
[] create Badge table (id, name, description, iconUrl)
[] create UserBadge table (userId, badgeId, earnedAt)

**DB LISTING PHOTOS TO DO**
[] create BookPhoto table (bookId, url, isPrimary?)
[] or: add photoUrl directly to Listing if only 1 image per listing is ever supported

**DB REVIEWS TO DO**
[] create Review table (userId, bookId, rating, text, verified, createdAt)

**DB DEALS TO DO**
[] add discountPercent to Deal
[] add maxUses and expiresAt to Deal (for time-limited or quantity-limited deals)

**DB SELLER SETTINGS TO DO**
[] create ShippingPreference table or add JSON field to User

**DB AFFILIATE SYSTEM TO DO**
[] create AffiliateReferral table (referrerId, referredUserId, linkId, earnings)

**DB COIN TRANSACTIONS TO DO**
[] create CoinTransaction table (userId, amount, type, reason, timestamp)

**DB MARKETING / SEGMENTS TO DO**
[] create UserSegment table (name, criteria)
[] create MarketingEmail table (segmentId, subject, content, scheduledAt)

**DB EVENT TRACKING / ANALYTICS TO DO**
[] create AnalyticsEvent table (userId, type, metadata JSON, timestamp)