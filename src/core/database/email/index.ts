import prisma from "@lib/prisma";

// create
export async function createVerifyEmailUrl(userId: string, url: string, expiresAt: Date) {
  return prisma.eFA.create({
    data: {
      url,
      userId,
      expiresAt
    },
  });
}

export async function findVerifyEmailUrlByUserID(userId: string) {
  return await prisma.eFA.findMany({
    where: {
      userId
    }
  })
}

export async function findVerifyEmailUrlByUrl(url: string) {
  return await prisma.eFA.findFirst({
    where: {
      url
    }
  });
}

export async function findVerifyEmailUrlByUrlandUserId(url: string, userId: string) {
  return await prisma.eFA.findFirst({
    where: {
      url,
      userId
    }
  })
}

// delete
export async function deleteVerifyEmailUrl(url: string, userId: string) {
  return await prisma.eFA.delete({
    where: {
      url,
      userId
    }
  });
};
