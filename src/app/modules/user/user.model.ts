import { Role } from '../role/role.model';

export class User
{
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  language: string;
  admin_role_id: string;
  is_active: boolean;
  last_login_at: string;

  /**
   * Constructor
   *
   */
  constructor(user)
  {
    {
      this.id = user.id || '';
      this.username = user.username || '';
      this.email = user.email || '';
      this.phone = user.phone || '';
      this.password = user.password || '';
      this.password_confirmation = user.password_confirmation || '';
      this.language = user.language || '';
      this.admin_role_id = user.admin_role_id || '';
      this.is_active = user.is_active || true;
      this.last_login_at = user.last_login_at || '';
    }
  }
}
