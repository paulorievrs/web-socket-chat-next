import { NextApiRequest, NextApiResponse } from 'next';
import { users } from './create';

type ResponseData = {
  users: string[];
}

const UsersHandler = (_:  NextApiRequest, res: NextApiResponse<ResponseData>) => {
  return res.status(200).json({ users: users });
}

export default UsersHandler;