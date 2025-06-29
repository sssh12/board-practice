import { Router } from "express";
import { getPosts, createPost } from "../controllers/postController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

// GET /api/posts  (전체 게시글 조회, 인증 불필요)
router.get("/", getPosts);

// POST /api/posts  (게시글 작성, 인증 필요)
router.post("/", authenticateJWT, createPost);

export default router;
