import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { IPermissionCheckResponse } from './interfaces/permission-check-response.interface'
import { IUser } from './interfaces/user.interface'
import { ConfirmedStrategyService } from './services/confirmed-strategy.service'
import { RoleStrategyService } from './services/role-strategy.service'

@Controller()
export class PermissionController {
  constructor(
    private roleStrategy: RoleStrategyService,
    private confirmedStrategy: ConfirmedStrategyService
  ) {}

  @MessagePattern('permission_check')
  public permissionCheck(permissionParams: {
    user: IUser
    permission: string
  }): IPermissionCheckResponse {
    let result: IPermissionCheckResponse

    if (!permissionParams || !permissionParams.user) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'permission_check_bad_request',
        errors: null
      }
    } else {
      const permissions = this.roleStrategy.getUserPermissions(
        permissionParams.user
      )

      const allowedPermissions = this.confirmedStrategy.getAllowedPermissions(
        permissionParams.user,
        permissions
      )
      const isAllowed = allowedPermissions.includes(permissionParams.permission)

      result = {
        status: isAllowed ? HttpStatus.OK : HttpStatus.FORBIDDEN,
        message: isAllowed
          ? 'permission_check_success'
          : 'permission_check_forbidden',
        errors: null
      }
    }

    return result
  }
}
