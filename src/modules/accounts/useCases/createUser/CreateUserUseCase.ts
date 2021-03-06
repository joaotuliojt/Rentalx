import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { hash } from "bcrypt"
import { AppError } from "../../../../errors/AppError";
@injectable()
class CreateUserUsecase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) { }

  async execute({ name, password, driver_license, email }: ICreateUsersDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      driver_license,
      email
    });


  }
}


export { CreateUserUsecase }