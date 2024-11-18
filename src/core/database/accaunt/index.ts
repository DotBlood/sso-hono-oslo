import prisma from "@lib/prisma";

export async function createUserAccaunt(userId: string, username: string) {
  return await prisma.accaunt.create({
    data: {
      id: userId,
      dname: username,
    },
  });
}

export async function findUserAccauntById(userId: string) {
  return await prisma.accaunt.findUnique({
    where: {
      id: userId,
    },
  });
}
export async function findUserAccauntByName(dname: string) {
  return await prisma.accaunt.findMany({
    where: {
      dname: dname,
    },
  });
}
