import { User } from "../models/user";

export type UserResponseDto = Omit<User, 'password'>;
