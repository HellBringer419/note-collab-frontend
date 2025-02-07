/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Notes Collaboration API
 * API for managing notes, users, collaborations, and password reset with OTP verification.
 * OpenAPI spec version: 1.0.0
 */

export interface RegisterRequest {
  email: string;
  /** @minLength 3 */
  name: string;
  /**
   * @minLength 8
   * @maxLength 60
   */
  password: string;
  /** @nullable */
  avatar?: string | null;
}
