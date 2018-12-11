import {RolePage} from '../role-page/role-page.model';

export class Role
{
  id: string;
  name: string;
  description: string;
  role_pages: [RolePage];

  /**
   * Constructor
   *
   */
  constructor(role)
  {
    {
      this.id = role.id || '';
      this.name = role.name || '';
      this.description = role.description || '';
      this.role_pages = role.role_pages || [];
    }
  }
}
