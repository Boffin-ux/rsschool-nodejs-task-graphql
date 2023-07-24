interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

type CreatePostDTO = Omit<IPost, 'id'>;
type ChangePostDTO = Omit<CreatePostDTO, 'authorId'>;

interface ICreatePost {
  dto: CreatePostDTO;
};

interface IChangePost {
  id: string;
  dto: ChangePostDTO;
};

export { IPost, ICreatePost, IChangePost };
