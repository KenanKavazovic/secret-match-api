import { InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

export const hash = async (data: string, salt = 10): Promise<string> => {
  try {
    const generatedSalt = await bcrypt.genSalt(salt)
    return bcrypt.hash(data, generatedSalt)
  } catch (error) {
    throw new InternalServerErrorException('Something went wrong while hashing the password.')
  }
}