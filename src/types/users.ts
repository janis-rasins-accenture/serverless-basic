export interface CreateUserInputIF {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
  userName?: string;
}

export interface DynamoUserIF {
  userId?: { S: string };
  firstName?: { S: string };
  lastName?: { S: string };
  email?: { S: string };
  avatarUrl?: { S: string };
  userName?: { S: string };
  isActive?: { N: number };
}
