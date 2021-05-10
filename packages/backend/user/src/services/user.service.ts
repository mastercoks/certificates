import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUserListParams } from 'src/interfaces/user-list-params.interface'
import { DataResponse } from 'src/interfaces/user-list-response.interface'

import { IUserLink } from '../interfaces/user-link.interface'
import { IUser } from '../interfaces/user.interface'
import { ConfigService } from './config/config.service'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<IUser>,
    @InjectModel('UserLink') private readonly UserLinkModel: Model<IUserLink>,
    private readonly configService: ConfigService
  ) {}

  public async searchUser(params: { email: string }): Promise<IUser[]> {
    return this.UserModel.find(params).exec()
  }

  public async searchUserById(id: string): Promise<IUser> {
    return this.UserModel.findById(id).exec()
  }

  public async listUsers({
    name,
    page,
    perPage,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: IUserListParams): Promise<DataResponse> {
    const pattern = name ? '.*' + name + '.*' : '.*'
    const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

    const users = await this.UserModel.find({
      name: new RegExp(pattern, 'i')
    })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sort)
      .exec()

    const count = await this.UserModel.countDocuments({
      name: new RegExp(pattern, 'i')
    })

    return {
      users,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  }

  public async updateUserById(
    id: string,
    userParams: { password: string; is_confirmed: boolean }
  ): Promise<IUser> {
    const UserModel = await this.UserModel.findById(id)
    UserModel.password = userParams.password
    UserModel.is_confirmed = userParams.is_confirmed
    return UserModel.save()
  }

  public async createUser(user: IUser): Promise<IUser> {
    const UserModel = new this.UserModel(user)
    return await UserModel.save()
  }

  public async removeUserById(id: string): Promise<IUser> {
    return await this.UserModel.findOneAndDelete({ _id: id })
  }

  public async createUserLink(id: string): Promise<IUserLink> {
    const UserLinkModel = new this.UserLinkModel({
      user_id: id
    })
    return await UserLinkModel.save()
  }

  public async getUserLink(link: string): Promise<IUserLink> {
    return this.UserLinkModel.findOne({ link, is_used: false }).exec()
  }

  public async updateUserLinkById(
    id: string,
    linkParams: { is_used: boolean }
  ): Promise<IUserLink> {
    return this.UserLinkModel.updateOne({ _id: id }, linkParams)
  }

  public getConfirmationLink(link: string): string {
    return `${this.configService.get('webUrl')}/confirm/${link}`
  }
}
