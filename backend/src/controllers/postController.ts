import { Request, Response } from "express";
import Post, { IPost } from "../models/Post";
import { AuthRequest } from "../middlewares/authMiddleware";

// 게시글 목록 조회 (인증 필요 없음)
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
    return;
  } catch (error: any) {
    res.status(500).json({ message: "서버 에러", error: error?.message });
    return;
  }
};

// 게시글 작성 (인증 필요)
export const createPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "제목과 내용을 입력해 주세요." });
      return;
    }
    if (!req.user) {
      res.status(401).json({ message: "인증 정보가 없습니다." });
      return;
    }

    const post = new Post({
      title,
      content,
      author: req.user.userId,
    });
    await post.save();

    res.status(201).json({
      message: "게시글 작성 성공",
      post: {
        _id: post._id,
        title: post.title,
        content: post.content,
        author: req.user.username,
        createdAt: post.createdAt,
      },
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: "서버 에러", error: error?.message });
    return;
  }
};
