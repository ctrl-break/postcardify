import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';

export const GUARDS = [JwtGuard, RolesGuard];
