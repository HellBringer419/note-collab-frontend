/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * Notes Collaboration API
 * API for managing notes, users, collaborations, and password reset with OTP verification.
 * OpenAPI spec version: 1.0.0
 */
import * as axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  Collaboration,
  CreateNoteRequest,
  LoginRequest,
  LoginUser200,
  Note,
  PasswordResetRequest,
  RegisterRequest,
  RegisterUser200,
  UpdateNoteRequest,
  VerifyOtpRequest,
} from "../model";

export const getNotesCollaborationAPI = () => {
  /**
   * Create a new user with email, name, password, and avatar.
   * @summary Register a new user
   */
  const registerUser = <TData = AxiosResponse<RegisterUser200>>(
    registerRequest: RegisterRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/auth/register`, registerRequest, options);
  };

  /**
   * Authenticate a user with email and password, return a JWT token if credentials are valid.
   * @summary Login to an existing account
   */
  const loginUser = <TData = AxiosResponse<LoginUser200>>(
    loginRequest: LoginRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/auth/login`, loginRequest, options);
  };

  /**
   * @summary Request password reset
   */
  const requestPasswordReset = <TData = AxiosResponse<void>>(
    passwordResetRequest: PasswordResetRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(
      `/auth/password-reset`,
      passwordResetRequest,
      options,
    );
  };

  /**
   * @summary Verify OTP for password reset
   */
  const verifyOtp = <TData = AxiosResponse<void>>(
    verifyOtpRequest: VerifyOtpRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/auth/verify-otp`, verifyOtpRequest, options);
  };

  /**
   * @summary Create a new note
   */
  const createNote = <TData = AxiosResponse<Note>>(
    createNoteRequest: CreateNoteRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/notes`, createNoteRequest, options);
  };

  /**
   * @summary Get all notes
   */
  const getNotes = <TData = AxiosResponse<Note[]>>(
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.get(`/notes`, options);
  };

  /**
   * @summary Update an existing note
   */
  const updateNote = <TData = AxiosResponse<Note>>(
    id: number,
    updateNoteRequest: UpdateNoteRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.put(`/notes/${id}`, updateNoteRequest, options);
  };

  /**
   * @summary Delete a note
   */
  const deleteNote = <TData = AxiosResponse<void>>(
    id: number,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.delete(`/notes/${id}`, options);
  };

  /**
   * @summary Get collaborators for a note
   */
  const getCollaborators = <TData = AxiosResponse<Collaboration[]>>(
    id: number,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.get(`/notes/${id}/collaborators`, options);
  };

  return {
    registerUser,
    loginUser,
    requestPasswordReset,
    verifyOtp,
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    getCollaborators,
  };
};
export type RegisterUserResult = AxiosResponse<RegisterUser200>;
export type LoginUserResult = AxiosResponse<LoginUser200>;
export type RequestPasswordResetResult = AxiosResponse<void>;
export type VerifyOtpResult = AxiosResponse<void>;
export type CreateNoteResult = AxiosResponse<Note>;
export type GetNotesResult = AxiosResponse<Note[]>;
export type UpdateNoteResult = AxiosResponse<Note>;
export type DeleteNoteResult = AxiosResponse<void>;
export type GetCollaboratorsResult = AxiosResponse<Collaboration[]>;
