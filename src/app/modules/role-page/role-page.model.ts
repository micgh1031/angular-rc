export class RolePage
{
  id: string;
  admin_role_id: string;
  admin_page_id: string;
  is_create: boolean;
  is_retrieve: boolean;
  is_update: boolean;
  is_delete: boolean;

  /**
   * Constructor
   *
   */
  constructor(rolePage)
  {
    {
      this.id = rolePage.id || '';
      this.admin_role_id = rolePage.admin_role_id || '';
      this.admin_page_id = rolePage.admin_page_id || '';
      this.is_create = rolePage.is_create || true;
      this.is_retrieve = rolePage.is_retrieve || true;
      this.is_update = rolePage.is_update || true;
      this.is_delete = rolePage.is_delete || true;
    }
  }
}
