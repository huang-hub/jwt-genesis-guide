
export interface JwtConfig {
  algorithm: string;
  expiresIn: string;
  issuer: string;
  audience: string;
  includeJti: boolean;
  customClaims: { key: string; value: string }[];
}

export interface EnvConfig {
  secretKeyVariable: string;
  algorithmVariable: string;
  expiresInVariable: string;
}

export const defaultJwtConfig: JwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1h',
  issuer: 'your-app-name',
  audience: 'your-api',
  includeJti: true,
  customClaims: [],
};

export const algorithmOptions = [
  { value: 'HS256', label: 'HS256 (HMAC with SHA-256)', type: 'symmetric' },
  { value: 'HS384', label: 'HS384 (HMAC with SHA-384)', type: 'symmetric' },
  { value: 'HS512', label: 'HS512 (HMAC with SHA-512)', type: 'symmetric' },
  { value: 'RS256', label: 'RS256 (RSA Signature with SHA-256)', type: 'asymmetric' },
  { value: 'RS384', label: 'RS384 (RSA Signature with SHA-384)', type: 'asymmetric' },
  { value: 'RS512', label: 'RS512 (RSA Signature with SHA-512)', type: 'asymmetric' },
  { value: 'ES256', label: 'ES256 (ECDSA using P-256 and SHA-256)', type: 'asymmetric' },
  { value: 'ES384', label: 'ES384 (ECDSA using P-384 and SHA-384)', type: 'asymmetric' },
  { value: 'ES512', label: 'ES512 (ECDSA using P-521 and SHA-512)', type: 'asymmetric' },
];

export const expirationOptions = [
  { value: '5m', label: '5 minutes' },
  { value: '15m', label: '15 minutes' },
  { value: '30m', label: '30 minutes' },
  { value: '1h', label: '1 hour' },
  { value: '4h', label: '4 hours' },
  { value: '12h', label: '12 hours' },
  { value: '1d', label: '1 day' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
];

export const languageOptions = [
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'go', label: 'Go' },
  { value: 'ruby', label: 'Ruby' },
];

export const generateNodeJsCode = (config: JwtConfig): string => {
  const customClaimsString = config.customClaims.length > 0
    ? config.customClaims.map(claim => `  ${claim.key}: "${claim.value}"`).join(',\n')
    : '';

  const jwtOptions = [
    `  algorithm: process.env.JWT_ALGORITHM || "${config.algorithm}"`,
    `  expiresIn: process.env.JWT_EXPIRES_IN || "${config.expiresIn}"`,
    config.issuer ? `  issuer: "${config.issuer}"` : null,
    config.audience ? `  audience: "${config.audience}"` : null,
  ].filter(Boolean).join(',\n');

  const payloadItems = [
    config.issuer ? `  iss: "${config.issuer}"` : null,
    config.audience ? `  aud: "${config.audience}"` : null,
    config.includeJti ? '  jti: crypto.randomUUID()' : null,
  ].filter(Boolean);

  if (customClaimsString) {
    payloadItems.push(customClaimsString);
  }

  const payloadString = payloadItems.length > 0
    ? `\n${payloadItems.join(',\n')}\n`
    : '';

  return `// Install dependencies:
// npm install jsonwebtoken dotenv

require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Load your secret key from environment variables
const secretKey = process.env.JWT_SECRET_KEY;

// Function to generate a JWT token
function generateToken(userId) {
  const payload = {
    sub: userId,${payloadString}  };

  const options = {
${jwtOptions}
  };

  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey, {
      algorithms: [process.env.JWT_ALGORITHM || "${config.algorithm}"]
    });
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Example usage
const token = generateToken('user123');
console.log('Generated Token:', token);

const verification = verifyToken(token);
console.log('Verification Result:', verification);`;
};

export const generatePythonCode = (config: JwtConfig): string => {
  const customClaimsString = config.customClaims.length > 0
    ? config.customClaims.map(claim => `    "${claim.key}": "${claim.value}"`).join(',\n')
    : '';

  const payloadItems = [
    '    "sub": user_id',
    config.issuer ? `    "iss": "${config.issuer}"` : null,
    config.audience ? `    "aud": "${config.audience}"` : null,
    config.includeJti ? '    "jti": str(uuid.uuid4())' : null,
  ].filter(Boolean);

  if (customClaimsString) {
    payloadItems.push(customClaimsString);
  }

  const payloadString = payloadItems.join(',\n');
  
  const jtiImport = config.includeJti ? 'import uuid\n' : '';

  return `# Install dependencies:
# pip install python-jose python-dotenv

import os
${jtiImport}from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get secret key from environment variable
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "${config.algorithm}")
EXPIRES_IN = os.getenv("JWT_EXPIRES_IN", "${config.expiresIn}")

def parse_expiration(expires_in: str) -> timedelta:
    """Parse expiration string (like '1h', '30m', '7d') to timedelta"""
    unit = expires_in[-1]
    value = int(expires_in[:-1])
    if unit == 'm':
        return timedelta(minutes=value)
    elif unit == 'h':
        return timedelta(hours=value)
    elif unit == 'd':
        return timedelta(days=value)
    else:
        return timedelta(minutes=30)  # Default fallback

def create_token(user_id: str) -> str:
    """Generate a new JWT token"""
    expires_delta = parse_expiration(EXPIRES_IN)
    expire = datetime.utcnow() + expires_delta
    
    payload = {
${payloadString},
        "exp": expire
    }
    
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """Verify a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"valid": True, "payload": payload}
    except JWTError as e:
        return {"valid": False, "error": str(e)}

# Example usage
if __name__ == "__main__":
    token = create_token("user123")
    print(f"Generated token: {token}")
    
    result = verify_token(token)
    print(f"Verification result: {result}")`;
};

export const generateJavaCode = (config: JwtConfig): string => {
  // Java implementation - simplified for example purposes
  return `// Install dependencies:
// Add io.jsonwebtoken:jjwt-api, jjwt-impl, and jjwt-jackson to your pom.xml

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

public class JwtUtil {
    private static final String SECRET_KEY = System.getenv("JWT_SECRET_KEY");
    private static final String ALGORITHM = System.getenv("JWT_ALGORITHM") != null ? 
                                        System.getenv("JWT_ALGORITHM") : "${config.algorithm}";
    private static final String EXPIRES_IN = System.getenv("JWT_EXPIRES_IN") != null ?
                                        System.getenv("JWT_EXPIRES_IN") : "${config.expiresIn}";

    public static String generateToken(String userId) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.forName(ALGORITHM);
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        
        long expirationMillis = parseExpiration(EXPIRES_IN);
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationMillis);
        
        return Jwts.builder()
                .setSubject(userId)${config.issuer ? `\n                .setIssuer("${config.issuer}")` : ""}${config.audience ? `\n                .setAudience("${config.audience}")` : ""}${config.includeJti ? '\n                .setId(UUID.randomUUID().toString())' : ""}${config.customClaims.length > 0 ? config.customClaims.map(claim => `\n                .claim("${claim.key}", "${claim.value}")`).join('') : ""}
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(key, signatureAlgorithm)
                .compact();
    }
    
    public static Claims verifyToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return claimsJws.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }
    
    private static long parseExpiration(String expiresIn) {
        char unit = expiresIn.charAt(expiresIn.length() - 1);
        int value = Integer.parseInt(expiresIn.substring(0, expiresIn.length() - 1));
        
        switch (unit) {
            case 'm': return value * 60 * 1000L; // minutes
            case 'h': return value * 60 * 60 * 1000L; // hours
            case 'd': return value * 24 * 60 * 60 * 1000L; // days
            default: return 30 * 60 * 1000L; // default to 30 minutes
        }
    }
    
    public static void main(String[] args) {
        String token = generateToken("user123");
        System.out.println("Generated token: " + token);
        
        try {
            Claims claims = verifyToken(token);
            System.out.println("Verified claims: " + claims);
        } catch (Exception e) {
            System.out.println("Verification failed: " + e.getMessage());
        }
    }
}`;
};

export const generateEnvironmentVariables = (config: JwtConfig): string => {
  const isSymmetric = ['HS256', 'HS384', 'HS512'].includes(config.algorithm);
  
  if (isSymmetric) {
    return `# JWT Configuration
JWT_SECRET_KEY=your_secure_secret_key_at_least_32_characters_long
JWT_ALGORITHM=${config.algorithm}
JWT_EXPIRES_IN=${config.expiresIn}`;
  } else {
    return `# JWT Configuration
JWT_PUBLIC_KEY=path/to/public_key.pem
JWT_PRIVATE_KEY=path/to/private_key.pem
JWT_ALGORITHM=${config.algorithm}
JWT_EXPIRES_IN=${config.expiresIn}`;
  }
};

export const generateKeyPairInstructions = (algorithm: string): string => {
  if (algorithm.startsWith('RS')) {
    return `# Generate RSA key pair
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem`;
  } else if (algorithm.startsWith('ES')) {
    let curve = "prime256v1";
    if (algorithm === "ES384") curve = "secp384r1";
    if (algorithm === "ES512") curve = "secp521r1";
    
    return `# Generate EC key pair with ${curve} curve
openssl ecparam -genkey -name ${curve} -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pem`;
  }
  return "";
};

export const generateSecurityGuidelines = (): { title: string; items: string[] }[] => {
  return [
    {
      title: "JWT Secret Key Best Practices",
      items: [
        "Use a strong, random secret key (at least 256 bits / 32 characters) for symmetric algorithms (HS256, HS384, HS512)",
        "Store secret keys securely in environment variables or secret management systems, never in code",
        "Rotate keys periodically, especially after team member departures",
        "Use different keys for different environments (development, staging, production)",
        "For asymmetric algorithms, keep private keys secure and distribute only public keys"
      ]
    },
    {
      title: "JWT Payload Security",
      items: [
        "Never store sensitive user data (passwords, credit card details) in JWT payloads",
        "Set appropriate expiration times (shorter is better for security)",
        "Use 'jti' (JWT ID) claims for token tracking and revocation if needed",
        "Include 'iss' (issuer) and 'aud' (audience) claims to prevent token misuse across services",
        "Keep payloads small - large tokens impact performance"
      ]
    },
    {
      title: "JWT Algorithm Recommendations",
      items: [
        "Prefer asymmetric algorithms (RS256, ES256) for better security in distributed systems",
        "Explicitly specify the algorithm in verification to prevent algorithm substitution attacks",
        "Avoid 'none' algorithm which removes signature validation",
        "Consider HS256 for simple applications, RS256/ES256 for microservices/distributed systems",
        "Ensure your JWT library is up-to-date to prevent known vulnerabilities"
      ]
    },
    {
      title: "JWT Implementation Security",
      items: [
        "Always validate all claims during token verification (issuer, audience, expiration)",
        "Implement proper error handling that doesn't leak implementation details",
        "Consider using a token blacklist or short expiration for sensitive operations",
        "For web apps, store tokens in HttpOnly cookies with secure and SameSite flags",
        "Never store tokens in local storage due to XSS vulnerability risks"
      ]
    }
  ];
};
