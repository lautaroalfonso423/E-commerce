import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/roles.enum";



export const Role = (...roles: Roles[]) => SetMetadata("roles", roles);