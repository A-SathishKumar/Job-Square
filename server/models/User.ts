/**
 * User Model & Authentication Entity
 * Enforces bcrypt hashing (12 rounds), account lockout after failed attempts,
 * and strict role-based data projection.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jobsquare_executive_jwt_super_secret_key_2026_production';
const JWT_EXPIRES_IN = '8h';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes lockout

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hashed
  role: 'admin' | 'partner' | 'client';
  title?: string;
  refreshTokens: string[];
  loginAttempts: number;
  lockUntil?: number;
  createdAt: string;
}

export type SafeUser = Omit<UserDocument, 'password' | 'refreshTokens'>;

// In-memory persistent collection with index map
const usersStore = new Map<string, UserDocument>();
const usersByEmail = new Map<string, string>();

export function toSafeUser(user: UserDocument): SafeUser {
  const { password: _, refreshTokens: __, ...safe } = user;
  return safe;
}

export function hashPassword(plainText: string): string {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(plainText, salt);
}

export function verifyPassword(candidate: string, hashed: string): boolean {
  return bcrypt.compareSync(candidate, hashed);
}

export function generateToken(user: SafeUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function findUserByEmail(email: string): UserDocument | undefined {
  const normalized = email.toLowerCase().trim();
  const id = usersByEmail.get(normalized);
  if (!id) return undefined;
  return usersStore.get(id);
}

export function findUserById(id: string): SafeUser | undefined {
  const user = usersStore.get(id);
  if (!user) return undefined;
  return toSafeUser(user);
}

export function findUserDocumentById(id: string): UserDocument | undefined {
  return usersStore.get(id);
}

export function isAccountLocked(user: UserDocument): boolean {
  if (!user.lockUntil) return false;
  return user.lockUntil > Date.now();
}

export function recordFailedLogin(user: UserDocument): void {
  user.loginAttempts = (user.loginAttempts || 0) + 1;
  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    user.lockUntil = Date.now() + LOCK_TIME_MS;
  }
  usersStore.set(user.id, user);
}

export function recordSuccessfulLogin(user: UserDocument): void {
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  usersStore.set(user.id, user);
}

export function createUser(userData: {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'partner' | 'client';
  title?: string;
}): SafeUser {
  const normalizedEmail = userData.email.toLowerCase().trim();
  if (usersByEmail.has(normalizedEmail)) {
    throw new Error('An account with this corporate email already exists.');
  }

  const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const newUser: UserDocument = {
    id,
    name: userData.name.trim(),
    email: normalizedEmail,
    password: hashPassword(userData.password),
    role: userData.role || 'client',
    title: userData.title,
    refreshTokens: [],
    loginAttempts: 0,
    createdAt: new Date().toISOString()
  };

  usersStore.set(id, newUser);
  usersByEmail.set(normalizedEmail, id);
  return toSafeUser(newUser);
}

export function listUsersByRole(role: 'admin' | 'partner' | 'client'): SafeUser[] {
  const results: SafeUser[] = [];
  for (const user of usersStore.values()) {
    if (user.role === role) {
      results.push(toSafeUser(user));
    }
  }
  return results;
}

// Pre-seed default executive leadership accounts for testing and advisory portal
if (usersStore.size === 0) {
  createUser({
    name: 'Eleanor Vance',
    email: 'e.vance@jobsquare.advisory',
    password: 'ExecutivePartner2026!',
    role: 'partner',
    title: 'Senior Managing Partner - Executive Search & Governance'
  });

  createUser({
    name: 'Marcus Sterling',
    email: 'm.sterling@jobsquare.advisory',
    password: 'ExecutivePartner2026!',
    role: 'admin',
    title: 'Chief Advisory Architect & Head of Organizational Practice'
  });
}
