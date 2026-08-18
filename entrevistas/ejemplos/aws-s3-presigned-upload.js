/**
 * VOICE INTERVIEW: "How do you handle file uploads on AWS without overloading your API?"
 *
 * Say out loud:
 * 1. API generates presigned S3 URL (short TTL, e.g. 5 min)
 * 2. Client uploads directly to S3 (PUT)
 * 3. API stores metadata in RDS (key, size, mime)
 * 4. Optional: S3 event → Lambda for resize/scan
 * 5. CloudFront serves public files; private files use presigned GET
 */

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET = process.env.S3_BUCKET;

/**
 * Step 1: Client requests upload URL
 * POST /api/uploads/presign { filename, contentType }
 */
async function createPresignedUpload(req, res) {
  const { filename, contentType } = req.body;
  const userId = req.user.id;

  // Unique key per user — prevents overwrites
  const key = `uploads/${userId}/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    // Optional: max size enforcement via conditions in POST policy
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min

  // Save pending record — confirm after client reports success
  // await db.files.insert({ userId, key, status: 'pending' });

  res.json({ uploadUrl, key });
}

/**
 * Step 2: Client PUTs file directly to uploadUrl (not through your server)
 *
 * Step 3: Client confirms → API marks file active
 * POST /api/uploads/confirm { key }
 */
async function confirmUpload(req, res) {
  const { key } = req.body;
  // Verify key belongs to req.user, object exists in S3 (HeadObject)
  // await db.files.update({ key }, { status: 'active' });
  res.json({ url: `https://cdn.example.com/${key}` });
}

/**
 * Private file download — presigned GET
 */
async function createPresignedDownload(key) {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

/**
 * VOICE: Architecture summary
 *
 * React → API (ECS/Lambda) → presigned URL
 * React → S3 direct upload
 * S3 → Lambda (optional thumbnail)
 * CloudFront → S3 origin for public assets
 * RDS → file metadata only
 */

module.exports = { createPresignedUpload, confirmUpload, createPresignedDownload };
