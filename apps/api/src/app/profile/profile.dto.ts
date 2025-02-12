import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '../user/responses';

export class ProfileDto extends UserResponse {
    @ApiProperty({ required: false })
    id?: number;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    updatedAt?: string;

    @ApiProperty({ required: false })
    createdAt?: string;

    @ApiProperty({ required: false })
    email?: string;
}

/*
      id: number
      name: string | null
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
      isBlocked: boolean
      provider: $Enums.Provider | null
      role: $Enums.Role

*/
