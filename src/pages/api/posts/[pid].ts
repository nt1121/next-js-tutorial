// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { POSTS } from '@/components/consts';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { pid } = req.query;
    const pattern = /^[1-9]\d*$/;
    if (typeof pid !== 'string' || !pattern.test(pid)) {
      // クエリパラメータのpidがない、または自然数ではない場合
      res.status(400).json({});
    }
    const postId = Number(pid);
    const post = POSTS.find((post) => post.id === postId);
    if (post) {
      // 指定idのpostが見つかった場合
      res.status(200).json(post);
    } else {
      // 指定idのpostが見つからなかった場合
      res.status(404).json({});
    }
  }
}
