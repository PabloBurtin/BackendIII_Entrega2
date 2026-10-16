import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.util.js";
import { HttpError } from "../utils/error.util.js";
import { pick } from "../utils/object.util.js";

const MIN_PASSWORD_LENGTH = 6;

const ALLOWED_FIELDS = ["name", "email", "password"];


const validatePassword = (password) => {
    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
        throw new HttpError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`, 400);
    }
};

export class UserService {
    static async getAll() {
        return UserRepository.getAll();
    }

    static async getById(id) {
        const user = await UserRepository.getById(id);
        if (!user) throw new HttpError("Usuario no encontrado", 404);
        return user;
    }

    static async create(data) {
        const userData = pick(data, ALLOWED_FIELDS);

        if (!userData.email) throw new HttpError("El email es obligatorio", 400);
        validatePassword(userData.password);
    
        const existing = await UserRepository.getByEmail(userData.email);
        if (existing) throw new HttpError("Ya existe un usuario con ese email", 409);

        const hashedPassword = await hashPassword(userData.password);
        return UserRepository.create({ ...userData, password: hashedPassword});
    }

    static async update(id, data) {
        const changes = pick(data, ALLOWED_FIELDS);
        
        if (changes.password !== undefined) {
            validatePassword(changes.password);
            changes.password = await hashPassword(changes.password);
        }

        if (changes.email) {
            const existing = await UserRepository.getByEmail(changes.email);
            if (existing && String(existing._id) !== id) {
                throw new HttpError("Ya existe un usuario con ese email", 409);
            }
        }

        const user = await UserRepository.update(id, changes);
        if (!user) throw new HttpError("Usuario no encontrado", 404);
        return user;
    }

    static async delete(id) {
        const user = await UserRepository.delete(id);
        if (!user) throw new HttpError("Usuario no encontrado", 404);
        return user;
    }
}