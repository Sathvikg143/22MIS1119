# Campus Notification System Design

---

# Stage 1

## REST API Design

### Endpoints

#### Get Notifications
GET /notifications

#### Mark Notification as Read
PATCH /notifications/:id/read

#### Delete Notification
DELETE /notifications/:id

#### Create Notification
POST /notifications

---

## Notification Schema

{
  "id": "string",
  "studentId": "string",
  "type": "Placement | Event | Result",
  "message": "string",
  "isRead": false,
  "createdAt": "timestamp"
}

---

## Real-time Notification Strategy

- WebSockets for instant delivery
- Fallback polling every 30 seconds
- Redis Pub/Sub for scalable event broadcasting

---

# Stage 2

## Database Choice

PostgreSQL is preferred because:
- Structured notification data
- ACID compliance
- Efficient indexing
- Better relational querying

---

## DB Schema

Notifications Table

| Column | Type |
|---|---|
| id | UUID |
| student_id | UUID |
| type | VARCHAR |
| message | TEXT |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

---

## Scaling Strategy

- Indexing on student_id and is_read
- Pagination
- Archiving old notifications
- Read replicas for scaling

---

# Stage 3

## Problem with Existing Query

Issues:
- Large table scan
- Sorting huge unread dataset
- Missing composite indexes

---

## Better Index

CREATE INDEX idx_notifications_student_read_created
ON notifications(studentId, isRead, createdAt DESC);

---

## Why Indexing Every Column is Bad

- Increased storage
- Slower writes
- Unnecessary maintenance overhead

---

## Query for Placement Notifications

SELECT *
FROM notifications
WHERE studentId = 12345
AND notificationType = 'Placement'
ORDER BY createdAt DESC;

---

# Stage 4

## Performance Improvements

### Recommended Solutions

- Redis caching
- Notification pagination
- Lazy loading
- WebSocket updates
- CDN for static assets

---

## Tradeoffs

| Strategy | Advantage | Disadvantage |
|---|---|---|
| Caching | Faster reads | Cache invalidation |
| Pagination | Reduced payload | Multiple requests |
| WebSockets | Real-time updates | Persistent connections |

---

# Stage 5

## Problems in Current Implementation

- Sequential email sending
- Blocking operations
- Slow response times
- Failure affects entire batch

---

## Better Design

### Recommended Architecture

- Queue-based processing
- RabbitMQ/Kafka
- Worker services
- Retry mechanism
- Bulk notification batching

---

## Why Async Processing

- Faster API responses
- Better scalability
- Fault tolerance
- Parallel execution

---

# Stage 6

## Priority Inbox System

### Priority Factors

- Notification type
- Recency
- User preference
- Placement notifications have highest weight

---

## Efficient Top-N Strategy

Use:
- Min Heap / Priority Queue
- O(N log K) complexity

---

## Sample Priority Logic

priorityScore =
(typeWeight * 0.5)
+
(recencyWeight * 0.3)
+
(userPreferenceWeight * 0.2)

---

## Scalability Improvements

- Cache top notifications
- Background ranking workers
- Incremental priority updates
- Partition notifications by user