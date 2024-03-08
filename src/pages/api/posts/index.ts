// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { POSTS } from '@/components/consts';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { page } = req.query;
    const pattern = /^[1-9]\d*$/;
    // クエリパラメータのpageがない、または自然数ではない場合
    if (typeof page !== 'string' || !pattern.test(page)) {
      res.status(400).json({});
    }
    const pageNum = Number(page);
    const posts = POSTS.slice((pageNum - 1) * 10, pageNum * 10);
    res.status(200).json({ total: POSTS.length, posts: posts });
  }
}
