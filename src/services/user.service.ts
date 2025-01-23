import * as userRepository from '../repositories/user.repository'

export const deleteUserService = async (id:string) => {
    return await userRepository.deleteUserRepository(id)
}