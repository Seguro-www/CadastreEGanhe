# Security Specification - Sweepstakes Platform

## Data Invariants
- `sweepstakesId` must be one of: 'iphone', 'mouse', 'yugioh'.
- `userId` must strictly match the authenticated user's UID.
- `tickets` must be a number between 1 and 1000.
- `email` must be a string (max 256 chars).
- `createdAt` is immutable after creation.
- `updatedAt` must be the current server time on every update.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Create registration with `userId: "attacker_uid"`.
2. **Resource Poisoning**: `email` field with 1MB of text.
3. **Invalid State**: `sweepstakesId: "invalid_campaign"`.
4. **Ticket Inflation**: `tickets: 999999`.
5. **Timestamp Forge**: `createdAt: "2020-01-01T00:00:00Z"`.
6. **Immutable Breach**: Update `createdAt` field after creation.
7. **Cross-User Leak**: Authenticated User A tries to 'get' User B's registration.
8. **Query Scraping**: `allow list: if isSignedIn()` (missing `resource.data.userId == request.auth.uid`).
9. **Shadow Field Injection**: `isAdmin: true` added to the registration payload.
10. **Ownership Theft**: Update `userId` to transition document ownership.
11. **Type Confusion**: Setting `tickets` as a Boolean or String.
12. **Unauthenticated Write**: Creating a document without a valid auth token.

## Test Runner Logic
Implicitly verified by the final hardened rules.
