postsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, content = "", tags } = req.body;

  const postData = {};

  try {
    postData.authorId = req.user.id;
    postData.title = title;
    postData.content = content;
    postData.tags = tags;

    const post = await createPost(postData);

    if (post) {
      res.send(post);
    } else {
      next({
        name: 'PostCreationError',
        message: 'There was an error creating your post. Please try again.'
      })
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags;
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await getPostById(postId);

    if (originalPost.author.id === req.user.id) {
      const updatedPost = await updatePost(postId, updateFields);
      res.send({ post: updatedPost })
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update a post that is not yours'
      })
    }
  } catch (error) {
    next(error);
  }
});
postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
  const { postId } = req.params;

  try {
    const postToDelete = await getPostById(postId);

    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (postToDelete.author.id !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this post." });
    }

    await deletePost(postId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
