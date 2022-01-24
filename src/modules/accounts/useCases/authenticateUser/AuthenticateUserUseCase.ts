import { compare } from "bcrypt"
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";



interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  };

  token: string;

}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }


  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "e67f14ed4ffa7a678ce75cc4ec35b45c", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn

  }
}


export { AuthenticateUserUseCase }