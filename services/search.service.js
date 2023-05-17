const PostRepository = require("../repositories/posts.repository");
const AuthRepository = require("../repositories/auth.repository");
const { Posts, Users, Likes, Follows, Comments } = require("../models");

class SearchService {
  postRepository = new PostRepository(Posts, Users, Likes, Follows, Comments);
  authRepository = new AuthRepository(Users);

  searchUsersAndPosts = async (search) => {
    const detailedUsers = await this.authRepository.findNicknamesBySearch(
      search,
    );

    const users = detailedUsers.map((user) => {
      return {
        userId: user.userId,
        nickname: user.nickname,
        userPhoto: user.userPhoto,
      };
    });

    const detailedPosts = await this.postRepository.findPostsBySearch(search);

    const posts = detailedPosts.map((post) => {
      return {
        postId: post.postId,
        content: post.content,
        postPhoto: post.postPhoto,
      };
    });

    return { users, posts };
  };
}

module.exports = SearchService;
