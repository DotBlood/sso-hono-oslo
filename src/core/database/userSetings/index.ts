import prisma from "@lib/prisma";

export async function createUserSetings(userId: string) {
  return await prisma.usersSetings.create({
    data: {
      id: userId,
    },
  });
}

export async function getUserSetings(userId: string) {
  return await prisma.usersSetings.findUnique({
    where: {
      id: userId,
    },
  });
}

// verify email
export async function verifyEmail(userId: string) {
  return await prisma.usersSetings.update({
    where: {
      id: userId,
    },
    data: {
      verifyEmail: true,
    },
  });
}
