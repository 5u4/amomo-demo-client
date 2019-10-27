export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Avatar = {
   __typename?: 'Avatar',
  layout: Scalars['String'],
  body: Scalars['String'],
  mouth: Scalars['String'],
  eyes: Scalars['String'],
};

export type AvatarInput = {
  layout?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  mouth?: Maybe<Scalars['String']>,
  eyes?: Maybe<Scalars['String']>,
};

export type CreatePostInput = {
  data: Scalars['String'],
};

export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  register?: Maybe<User>,
  login?: Maybe<User>,
  createPost: Post,
};


export type MutationRegisterArgs = {
  avatar?: Maybe<AvatarInput>,
  payload: RegisterInput
};


export type MutationLoginArgs = {
  payload: LoginInput
};


export type MutationCreatePostArgs = {
  input: CreatePostInput
};

export type PaginationInput = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  createdAt: Scalars['Int'],
  dataUrl: Scalars['String'],
  postedBy?: Maybe<User>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  posts: Array<Post>,
  ping: Scalars['String'],
};


export type QueryPostsArgs = {
  pagination?: Maybe<PaginationInput>
};

export type RegisterInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  avatar: Avatar,
  token?: Maybe<Scalars['String']>,
  createdAt: Scalars['Int'],
  updatedAt: Scalars['Int'],
};
