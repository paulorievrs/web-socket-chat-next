import { NextApiRequest, NextApiResponse } from 'next';

export const users: string[] = [];

type ResponseData = {
  message: string;
  status: number;
}

const UsersHandler = (req:  NextApiRequest, res: NextApiResponse<ResponseData>) => {

  const { username } = req.body;
  if(!username) {
    res.status(400).json({ message: 'Username not sent.', status: 400 })
    return res.end();
  }

  if(users.includes(username)) {
    res.status(400).json({ message: 'Username already taken', status: 400 })
    return res.end();
  }

  users.push(username);
  res.status(201).json({ message: 'User created', status: 201 })

  res.end();

}

export default UsersHandler;