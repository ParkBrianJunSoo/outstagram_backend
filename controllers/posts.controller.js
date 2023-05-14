const PostService = require("../services/posts.service");

class PostController {
  postService = new PostService();

  //게시물 생성
  createPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { content } = req.body;
    const { postPhoto } = req;
    try {
      if (!content || !postPhoto) {
        throw new Error("412/모든 필드의 값은 필수 값 입니다.");
      }

      await this.postService.createPost(userId, content, postPhoto);
      return res.status(200).json({ message: "게시물을 생성하였습니다." });
    } catch (error) {
      throw new Error(error.message || "400/게시물 생성에 실패하였습니다.");
    }
  };

  //게시물 수정
  putPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { content } = req.body;
    try {
      const findOnePost = await this.postService.findOnePost(postId);
      if (!findOnePost) {
        throw new Error("412/게시글이 존재하지 않습니다.");
      }
      if (userId !== findOnePost.UserId) {
        throw new Error("414/게시글 수정의 권한이 존재하지 않습니다.");
      }
      await this.PostService.putPost(postId, content);
      return res.status(200).json({ message: "게시물을 수정하였습니다." });
    } catch (error) {
      throw new Error(error.message || "400/게시물 수정에 실패하였습니다.");
    }
  };

  //게시물 삭제
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    try {
      const findOnePost = await this.postService.findOnePost(postId);
      if (!findOnePost) {
        throw new Error("412/게시글이 존재하지 않습니다.");
      }
      if (userId !== findOnePost.UserId) {
        throw new Error("414/게시글 삭제 권한이 존재하지 않습니다");
      }
      await this.PostService.deletePost(postId);
      return res.status(200).json({ message: "게시물을 삭제하였습니다." });
    } catch (error) {
      throw new Error(error.message || "400/게시물 삭제에 실패하였습니다.");
    }
  };
}

module.exports = PostController;
