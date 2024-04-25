export class CreateCommentDto {
  authorId: string;
  articleId: string;
  content: string;
  likesCount: number;
  specialLike: boolean;
  createdAt: Date;
  updatedAt: Date;
}
