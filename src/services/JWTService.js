import jwt from 'jsonwebtoken';

/**
 * JWTService
 */
export default class JWTService {
  static SECRET = 'a09353a06dd0b7ea5832c9d57a1ff524b91b7f96048c75e58a5a8cda3aaf1f68';
  static EXPIRATION = '3600s';

  /**
   * Generate a JWTF
   * @param data
   * eyJhbGciOiJXVCJ9.eyJ1c2Vybmjk1MTIzfQ.f0CXG3XL7RmY
   */
  generateJWT(userInfo) {
    return jwt.sign(userInfo, JWTService.SECRET, {expiresIn: JWTService.EXPIRATION});
  }

  decodeJWT(token) {
    return jwt.verify(token, JWTService.SECRET);
  }
}