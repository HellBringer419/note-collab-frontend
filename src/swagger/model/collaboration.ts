/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Notes Collaboration API
 * API for managing notes, users, collaborations, and password reset with OTP verification.
 * OpenAPI spec version: 1.0.0
 */
import type { User } from "./user";

export interface Collaboration {
  id?: number;
  userId?: number;
  noteId?: number;
  /** @nullable */
  User?: User;
}
