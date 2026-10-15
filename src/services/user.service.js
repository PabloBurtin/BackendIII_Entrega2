import { UserRepository } from "../repositories/user.repository.js";
import { USER_ROLES } from "../constants/index.js";
import { hashPassword } from "../utils/password.util.js";
import { HttpError } from "../utils/error.util.js";

const MIN_PASSWORD_LENGTH = 6;


const validateRole = (role) => {
    if (role !== undefined && !Object.values(USER_ROLES).includes(role)) {
        throw new HttpError(`Rol inválido. Valores permitidos: ${Object.values(USER_ROLES).join(",")}`, 400);
    }
};

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
        return user
    }

    static async create(data) {
        if (!data.email) throw new HttpError("El email es obligatorio", 400);
        validatePassword(data.password);
        validateRole(data.role);
    
        const existing = await UserRepository.getByEmail(data.email);
        if (existing) throw new HttpError("Ya existe un usuario con ese email", 409);

        const hashedPassword = await hashPassword(data.password);
        return UserRepository.create({ ...data, password: hashedPassword});
    }

    static async update(id, data) {
        const changes = { ...data };
        validateRole(changes.role);

        if (changes.password !== undefined) {
            validatePassword(changes.password);
            changes.password = await hashPassword(changes.password);
        }

        if (changes.email) {
            const existing = await UserRepository.getByEmail(changes.email);
            if (existing && String (existing._id) !== id) {
                throw new HttpError("Ya existe un usuario con ese email", 409);
            }
        }

        const user = await UserRepository.update(id, changes);
        if (!user) throw new HttpError("Usuario no encontrado", 404);
        return user
    }

    static async delete(id) {
        const user = await UserRepository.delete(id);
        if (!user) throw new HttpError("Usuario no encontrado", 404);
        return user
    }
}