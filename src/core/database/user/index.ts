import prisma from "@lib/prisma";
import type { Users } from "@prisma/client";

// create
export async function createUser(
  data: Omit<Users, "id" | "createdAt" | "updatedAt" | "phone">
) {
  return await prisma.users.create({
    data: data
  });
}

// find
export async function findUserById(uuid: string) {
  return prisma.users.findUnique({
    where: { id: uuid },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: { username },
  });
}

export async function findAllUsers() {
  return prisma.users.findMany();
}

// update
export async function updateUserByUUID(
  uuid: string,
  data: Omit<Users, "id" | "createdAt" | "updatedAt">
) {
  return prisma.users.update({
    where: { id: uuid },
    data,
  });
}

export async function updateUserByUsername(
  username: string,
  data: Omit<Users, "id" | "createdAt" | "updatedAt">
) {
  return prisma.users.update({
    where: { username },
    data,
  });
}

export async function updateUserByEmail(
  email: string,
  data: Omit<Users, "id" | "createdAt" | "updatedAt">
) {
  return prisma.users.update({
    where: { email },
    data,
  });
}

// delete
export async function deleteUserByUUID(uuid: string) {
  return prisma.users.delete({
    where: { id: uuid },
  });
}

export async function deleteUserByUsername(username: string) {
  return prisma.users.delete({
    where: { username },
  });
}

export async function deleteUserByEmail(email: string) {
  return prisma.users.delete({
    where: { email },
  });
}
