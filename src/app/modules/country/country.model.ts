import { FuseUtils } from '../../../@fuse/utils/index';

export class Country
{
  id: string;
  name: string;
  code2: string;
  code3: string;
  prefix: string;
  img_flag: string;
  img_flag_data: string;
  is_frequently_used: boolean;

  /**
   * Constructor
   *
   */
  constructor(country)
  {
    {
      this.id = country.id || '';
      this.name = country.name || '';
      this.code2 = country.code2 || '';
      this.code3 = country.code3 || '';
      this.prefix = country.prefix || '';
      this.img_flag = country.img_flag || '';
      this.img_flag_data = '';
      this.is_frequently_used = country.is_frequently_used || true;
    }
  }
}
