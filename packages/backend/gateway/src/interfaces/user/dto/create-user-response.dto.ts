import { ApiProperty } from '@nestjs/swagger'

import { IUser } from '../user.interface'

export class CreateUserResponseDto {
  @ApiProperty({ example: 'user_create_success' })
  message: string

  @ApiProperty({
    example: {
      user: {
        name: 'Teste',
        email: 'test@ifba.edu.br',
        is_confirmed: false,
        role: 'USER',
        last_login: null,
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    user: IUser
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
