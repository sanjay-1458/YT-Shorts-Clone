"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const uploadShortsSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  video: z.string(),
});

type uploadShortsState = {
  error: {
    title?: string[];
    description?: string[];
    video?: string[];
    formError?: string[];
  };
};

export const uploadShortsAction = async (
  prevState: uploadShortsState,
  formData: FormData
): Promise<uploadShortsState> => {
  const result = uploadShortsSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    video: formData.get("video") as string,
  });
  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();
  if (!userId) {
    return {
      error: {
        formError: ["Please login first"],
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  try {
    if (!user?.id) {
      return {
        error: {
          formError: ["User not found"],
        },
      };
    }
    await prisma.shorts.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        url: result.data.video,
        userId: user.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: {
          formError: [error.message],
        },
      };
    } else {
      return {
        error: {
          formError: ["Internal Server Error"],
        },
      };
    }
  }
  revalidatePath("/");
  redirect("/");
};
